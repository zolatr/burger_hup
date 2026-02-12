import { useState } from "react";
import { BadgePercent, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCampaigns, Campaign } from "@/lib/mockData";

export function CampaignGrid() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kampanyalar</h1>
          <p className="text-muted-foreground">
            Aktif ve geçmiş kampanyalarınızı yönetin
          </p>
        </div>
        <Button>
          <Plus className="size-4 mr-2" />
          Yeni Kampanya
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="bg-card border-border hover:border-primary/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BadgePercent className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {campaign.baslik}
                    </CardTitle>
                    <Badge
                      variant={campaign.aktif ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {campaign.aktif ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-center py-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    %{campaign.indirim}
                  </div>
                  <div className="text-sm text-muted-foreground">İndirim</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>
                    {campaign.baslangic} - {campaign.bitis}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <Pencil className="size-3 mr-1" />
                  Düzenle
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
