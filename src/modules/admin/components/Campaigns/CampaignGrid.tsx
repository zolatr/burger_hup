import { useState } from "react";
import { BadgePercent, Calendar, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { useStore, Campaign } from "@store/useStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/components/ui/dialog";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Switch } from "@shared/components/ui/switch";
import { toast } from "sonner";

export function CampaignGrid() {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState<Partial<Campaign>>({});

  const handleAddNew = () => {
    setEditingCampaign(null);
    setFormData({
      baslik: "",
      aciklama: "",
      indirim: 0,
      baslangic: "",
      bitis: "",
      aktif: true,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData(campaign);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu kampanyayı silmek istediğinize emin misiniz?")) {
      deleteCampaign(id);
      toast.success("Kampanya silindi.");
    }
  };

  const handleSave = () => {
    if (!formData.baslik || !formData.indirim || !formData.baslangic || !formData.bitis) {
      toast.error("Lütfen zorunlu alanları doldurun.");
      return;
    }

    if (editingCampaign) {
      updateCampaign(editingCampaign.id, formData);
      toast.success("Kampanya güncellendi.");
    } else {
      const newCampaign: Campaign = {
        id: Math.random().toString(36).substr(2, 9),
        baslik: formData.baslik || "",
        aciklama: formData.aciklama || "",
        indirim: Number(formData.indirim),
        baslangic: formData.baslangic || "",
        bitis: formData.bitis || "",
        aktif: formData.aktif ?? true,
      };
      addCampaign(newCampaign);
      toast.success("Yeni kampanya oluşturuldu.");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kampanyalar</h1>
          <p className="text-muted-foreground">
            Aktif ve geçmiş kampanyalarınızı yönetin
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="size-4 mr-2" />
              Yeni Kampanya
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>
                {editingCampaign ? "Kampanya Düzenle" : "Yeni Kampanya Oluştur"}
              </DialogTitle>
              <DialogDescription>
                Kampanya detaylarını girin ve kaydedin.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="baslik">Başlık</Label>
                <Input
                  id="baslik"
                  value={formData.baslik || ""}
                  onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
                  placeholder="Örn: Hafta Sonu İndirimi"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="indirim">İndirim Oranı (%)</Label>
                <Input
                  id="indirim"
                  type="number"
                  value={formData.indirim || ""}
                  onChange={(e) => setFormData({ ...formData, indirim: Number(e.target.value) })}
                  placeholder="20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="baslangic">Başlangıç Tarihi</Label>
                  <Input
                    id="baslangic"
                    type="date"
                    value={formData.baslangic || ""}
                    onChange={(e) => setFormData({ ...formData, baslangic: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bitis">Bitiş Tarihi</Label>
                  <Input
                    id="bitis"
                    type="date"
                    value={formData.bitis || ""}
                    onChange={(e) => setFormData({ ...formData, bitis: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aciklama">Açıklama</Label>
                <Input
                  id="aciklama"
                  value={formData.aciklama || ""}
                  onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                  placeholder="Kampanya detayları..."
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="aktif"
                  checked={formData.aktif}
                  onCheckedChange={(checked) => setFormData({ ...formData, aktif: checked })}
                />
                <Label htmlFor="aktif">Kampanya Aktif</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleSave}>Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground border border-dashed rounded-lg">
            Henüz kampanya bulunmuyor. Yeni bir kampanya oluşturun.
          </div>
        ) : (
          campaigns.map((campaign) => (
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(campaign)}
                  >
                    <Pencil className="size-3 mr-1" />
                    Düzenle
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(campaign.id)}
                  >
                    <Trash2 className="size-3 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
