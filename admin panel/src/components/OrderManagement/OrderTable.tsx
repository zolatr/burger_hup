import { useState } from "react";
import { Eye, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockOrders, Order } from "@/lib/mockData";

const statusColors = {
  Hazırlanıyor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Yolda: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Teslim Edildi": "bg-green-500/10 text-green-500 border-green-500/20",
  Bekliyor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

export function OrderTable() {
  const [orders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) =>
    filter === "all" ? true : order.durum === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
          <p className="text-muted-foreground">
            Tüm siparişlerinizi görüntüleyin ve yönetin
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <Filter className="size-4 mr-2" />
            <SelectValue placeholder="Durum filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="Bekliyor">Bekliyor</SelectItem>
            <SelectItem value="Hazırlanıyor">Hazırlanıyor</SelectItem>
            <SelectItem value="Yolda">Yolda</SelectItem>
            <SelectItem value="Teslim Edildi">Teslim Edildi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Siparişler ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sipariş No</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Ürünler</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.musteri}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="text-sm text-muted-foreground truncate">
                      {order.urunler.join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₺{order.toplam}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.durum]}>
                      {order.durum}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.tarih}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
