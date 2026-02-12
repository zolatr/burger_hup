import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const REPORT_FILE = path.join(PROJECT_ROOT, 'analysis_report.json');

// Configuration
const IGNORE_DIRS = ['node_modules', 'dist', 'build', '.git', '.gemini', 'coverage'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'];

interface Issue {
    id: string;
    type: 'duplicate_code' | 'security' | 'code_quality' | 'dead_code';
    severity: 'critical' | 'high' | 'medium' | 'low';
    category: string;
    file_path: string;
    line_number?: number;
    description: string;
    recommendation?: string;
    code_snippet?: string;
}

interface Report {
    timestamp: string;
    summary: {
        total_files: number;
        total_issues: number;
        issues_by_severity: Record<string, number>;
    };
    issues: Issue[];
}

const report: Report = {
    timestamp: new Date().toISOString(),
    summary: { total_files: 0, total_issues: 0, issues_by_severity: { critical: 0, high: 0, medium: 0, low: 0 } },
    issues: []
};

// Patterns
const SECURITY_PATTERNS = [
    { regex: /password\s*=\s*['"][^'"]+['"]/i, type: 'hardcoded_credentials', severity: 'critical', desc: 'Hardcoded password detected' },
    { regex: /api_?key\s*=\s*['"][^'"]+['"]/i, type: 'hardcoded_credentials', severity: 'critical', desc: 'Hardcoded API key detected' },
    { regex: /secret\s*=\s*['"][^'"]+['"]/i, type: 'hardcoded_credentials', severity: 'critical', desc: 'Hardcoded secret detected' },
    { regex: /eval\(/, type: 'injection_attack', severity: 'high', desc: 'Use of eval() detected' },
    { regex: /innerHTML/, type: 'xss', severity: 'medium', desc: 'Use of innerHTML detected' },
    { regex: /dangerouslySetInnerHTML/, type: 'xss', severity: 'medium', desc: 'Use of dangerouslySetInnerHTML detected' },
];

const TODO_PATTERN = /\/\/\s*(TODO|FIXME|HACK):?(.*)/i;

// Duplicate Detection
const fileHashes: Map<string, string[]> = new Map(); // hash -> file_paths[]

function scanDirectory(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (IGNORE_DIRS.includes(file)) continue;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (EXTENSIONS.includes(path.extname(file))) {
            report.summary.total_files++;
            analyzeFile(fullPath);
        }
    }
}

function analyzeFile(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(PROJECT_ROOT, filePath);
    const lines = content.split('\n');

    // 1. Security & Quality Patterns
    lines.forEach((line, index) => {
        // Security
        for (const pattern of SECURITY_PATTERNS) {
            if (pattern.regex.test(line)) {
                addIssue({
                    id: crypto.randomUUID(),
                    type: 'security',
                    severity: pattern.severity as any,
                    category: pattern.type,
                    file_path: relativePath,
                    line_number: index + 1,
                    description: pattern.desc,
                    code_snippet: line.trim().substring(0, 100)
                });
            }
        }

        // TODOs
        const todoMatch = line.match(TODO_PATTERN);
        if (todoMatch) {
            addIssue({
                id: crypto.randomUUID(),
                type: 'code_quality',
                severity: 'low',
                category: 'comment',
                file_path: relativePath,
                line_number: index + 1,
                description: `${todoMatch[1]} found: ${todoMatch[2].trim()}`,
                code_snippet: line.trim()
            });
        }
    });

    // 2. Complexity (Simple Line Count)
    if (lines.length > 300) {
        addIssue({
            id: crypto.randomUUID(),
            type: 'code_quality',
            severity: 'medium',
            category: 'complexity',
            file_path: relativePath,
            description: `File is too long (${lines.length} lines). Consider refactoring.`,
        });
    }

    // 3. Duplicate Detection (Whole File Hash)
    // improved: ignore whitespace for better matching
    const cleanContent = content.replace(/\s+/g, '');
    const hash = crypto.createHash('md5').update(cleanContent).digest('hex');
    if (fileHashes.has(hash)) {
        fileHashes.get(hash)?.push(relativePath);
    } else {
        fileHashes.set(hash, [relativePath]);
    }
}

function processDuplicates() {
    fileHashes.forEach((files, hash) => {
        if (files.length > 1) {
            files.forEach(file => {
                addIssue({
                    id: crypto.randomUUID(),
                    type: 'duplicate_code',
                    severity: 'medium',
                    category: 'exact_duplicate',
                    file_path: file,
                    description: `Exact duplicate of ${files.find(f => f !== file) || 'another file'}`,
                    recommendation: 'Extract common logic or delete duplicate file.'
                });
            });
        }
    });
}

function addIssue(issue: Issue) {
    report.issues.push(issue);
    report.summary.total_issues++;
    report.summary.issues_by_severity[issue.severity]++;
}

function main() {
    console.log('Starting static code analysis...');
    try {
        scanDirectory(path.join(PROJECT_ROOT, 'src'));
        processDuplicates();

        fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
        console.log(`Analysis complete. Report saved to ${REPORT_FILE}`);
        console.log(`Summary: ${JSON.stringify(report.summary, null, 2)}`);
    } catch (e) {
        console.error('Analysis failed:', e);
    }
}

main();
