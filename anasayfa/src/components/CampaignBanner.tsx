import { campaigns } from '../data/campaigns';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tag, Clock } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface CampaignBannerProps {
  onGetStarted: () => void;
}

export function CampaignBanner({ onGetStarted }: CampaignBannerProps) {
  return (
    <section className="py-20 bg-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground border-0">
            <Tag className="w-3 h-3 mr-1" />
            Aktif Kampanyalar
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Fırsatları Kaçırma!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Özel indirimler ve kampanyalardan yararlanın
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden card-hover border-0 shadow-lg">
              {campaign.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground border-0 text-lg font-bold">
                    %{campaign.discount}
                  </Badge>
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {campaign.description}
                </p>
                
                {campaign.code && (
                  <div className="bg-muted px-3 py-2 rounded-lg mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Promosyon Kodu</div>
                    <div className="font-mono font-bold text-primary">{campaign.code}</div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Geçerlilik: {formatDate(campaign.validUntil)}</span>
                </div>
                
                <Button className="w-full" onClick={onGetStarted}>
                  Hemen Kullan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
