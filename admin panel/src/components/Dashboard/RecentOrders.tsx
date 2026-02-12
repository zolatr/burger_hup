import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/lib/mockData";
import { Clock } from "lucide-react";

const statusColors = {
  Hazırlanıyor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Yolda: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Teslim Edildi": "bg-green-500/10 text-green-500 border-green-500/20",
  Bekliyor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

export function RecentOrders() {
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="size-5" />
          Son Siparişler
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">#{order.id}</span>
                  <Badge className={statusColors[order.durum]}>
                    {order.durum}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.musteri}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {order.urunler.join(", ")}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary">
                  ₺{order.toplam}
                </div>
                <div className="text-xs text-muted-foreground">
                  {order.tarih.split(" ")[1]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
