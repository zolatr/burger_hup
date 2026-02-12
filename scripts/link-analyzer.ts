
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

// Configuration
const BASE_URL = 'http://localhost:5175'; // Adjust if running on a different port
const MAX_DEPTH = 3;
const MAX_PAGES = 100;
const OUTPUT_FILE = 'link_audit_report.json';
const SITEMAP_FILE = 'public/sitemap.xml';

interface LinkStatus {
    url: string;
    status: number;
    redirectChain?: string[];
    finalUrl?: string;
    error?: string;
    source: string;
    anchorText: string;
    type: 'internal' | 'external';
}

interface PageData {
    url: string;
    links: LinkStatus[];
    title: string;
}

interface AuditReport {
    totalPages: number;
    totalLinks: number;
    brokenLinks: LinkStatus[];
    redirectChains: LinkStatus[];
    orphanPages: string[];
    mixedContent: string[];
    pages: PageData[];
}

const visitedUrls = new Set<string>();
const queue: { url: string; depth: number }[] = [{ url: BASE_URL, depth: 0 }];
const pagesData: PageData[] = [];
const allLinks: LinkStatus[] = [];

async function crawl() {
    console.log('Starting crawler...');

    // Cleanup previous report
    try {
        if (fs.existsSync(OUTPUT_FILE)) fs.unlinkSync(OUTPUT_FILE);
    } catch (e) { }

    const browser = await puppeteer.launch({
        headless: true, // Use new headless mode if possible, or true for legacy. 'new' often better for recent versions.
        // But 'new' sometimes hangs in some envs. sticking to true + args.
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
        dumpio: true
    });
    const page = await browser.newPage();

    while (queue.length > 0 && visitedUrls.size < MAX_PAGES) {
        const { url, depth } = queue.shift()!;

        if (visitedUrls.has(url)) continue;
        visitedUrls.add(url);

        console.log(`Crawling: ${url} (Depth: ${depth})`);

        try {
            const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            const status = response?.status() || 0;
            const title = await page.title();

            // Debug application error state
            if (title === 'Error' || title === 'Not Found' || title.includes('404')) {
                console.log(`Detected error page title: ${title}`);
                await page.screenshot({ path: 'app_error_screenshot.png' });
                const content = await page.content();
                fs.writeFileSync('app_error.html', content);
            }

            // Check for mixed content
            const securityDetails = response?.securityDetails();

            // Extract links
            const links = await page.$$eval('a', (anchors) => {
                return anchors.map(anchor => ({
                    href: anchor.href,
                    text: anchor.textContent?.trim() || '',
                }));
            });

            const pageLinks: LinkStatus[] = [];

            for (const link of links) {
                let type: 'internal' | 'external' = 'external';
                let linkUrl;
                try {
                    linkUrl = new URL(link.href);
                } catch (e) {
                    continue; // Skip invalid URLs
                }

                const baseUrlObj = new URL(BASE_URL);

                if (linkUrl.origin === baseUrlObj.origin) {
                    type = 'internal';
                }

                pageLinks.push({
                    url: link.href,
                    status: 0,
                    source: url,
                    anchorText: link.text,
                    type: type
                });

                if (type === 'internal' && !visitedUrls.has(link.href) && depth < MAX_DEPTH) {
                    const cleanUrl = link.href.split('#')[0];
                    if (!visitedUrls.has(cleanUrl) && !queue.find(q => q.url === cleanUrl)) {
                        queue.push({ url: cleanUrl, depth: depth + 1 });
                    }
                }
            }

            pagesData.push({
                url,
                links: pageLinks,
                title
            });

            allLinks.push(...pageLinks);

        } catch (error: any) {
            console.log(`CATCH BLOCK ENTERED for ${url}`);
            console.log(`Error message: ${error.message}`);
            try {
                fs.writeFileSync('debug_catch.txt', `Error crawling ${url}: ${error.message}\nStack: ${error.stack}`);
            } catch (fsErr) {
                console.log('Failed to write debug_catch.txt');
            }

            try {
                if (!page.isClosed()) {
                    await page.screenshot({ path: 'error_screenshot.png' });
                    const content = await page.content();
                    fs.writeFileSync('error_page.html', content);
                }
            } catch (e) {
                console.log('Failed to save error debug info');
            }
            pagesData.push({
                url,
                links: [],
                title: 'Error'
            });
        }
    }

    await browser.close();
    console.log('Crawling finished. Checking link statuses...');

    // Check statuses of unique links
    const uniqueLinks = Array.from(new Set(allLinks.map(l => l.url)));
    const linkStatuses = new Map<string, { status: number, redirectChain: string[], finalUrl: string }>();

    for (const link of uniqueLinks) {
        try {
            const res = await fetch(link, { method: 'HEAD' });
            linkStatuses.set(link, {
                status: res.status,
                redirectChain: [],
                finalUrl: res.url
            });
        } catch (err) {
            try {
                const res = await fetch(link);
                linkStatuses.set(link, {
                    status: res.status,
                    redirectChain: [],
                    finalUrl: res.url
                });
            } catch (e) {
                linkStatuses.set(link, {
                    status: 0,
                    redirectChain: [],
                    finalUrl: link
                });
            }
        }
    }

    // Generate Report
    const brokenLinks = allLinks.filter(l => {
        const status = linkStatuses.get(l.url)?.status || 0;
        return status >= 400 || status === 0;
    }).map(l => ({ ...l, ...linkStatuses.get(l.url) }));

    const validPages = pagesData.filter(p => !brokenLinks.find(bl => bl.url === p.url));

    const report: AuditReport = {
        totalPages: visitedUrls.size,
        totalLinks: allLinks.length,
        brokenLinks,
        redirectChains: [],
        orphanPages: [],
        mixedContent: [],
        pages: pagesData
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
    console.log(`Report saved to ${OUTPUT_FILE}`);

    // Generate Sitemap
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(visitedUrls).map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(SITEMAP_FILE, sitemapContent);
    console.log(`Sitemap saved to ${SITEMAP_FILE}`);
}

crawl().catch(console.error);
