import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { Badge } from "@shared/components/ui/badge";
import { useStore } from "@store/useStore";
import { Clock } from "lucide-react";

const statusLabelMap: Record<string, string> = {
  pending: "Bekliyor",
  preparing: "Hazırlanıyor",
  ready: "Hazır",
  delivered: "Teslim Edildi",
  cancelled: "İptal",
};

const statusColors: Record<string, string> = {
  preparing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  ready: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-500 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function RecentOrders() {
  const { orders } = useStore();
  const recentOrders = orders.slice(0, 5);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }

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
          {recentOrders.length === 0 && <p className="text-muted-foreground text-sm">Henüz sipariş yok.</p>}
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">#{order.id}</span>
                  <Badge className={statusColors[order.status] || "bg-gray-500"}>
                    {statusLabelMap[order.status] || order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {order.customerName || "Misafir"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {order.items.map(i => i.name).join(", ")}
                </p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary">
                  ₺{order.total.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(order.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
