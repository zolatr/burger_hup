import { useState, useEffect } from "react";
import { Eye, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/components/ui/select";
import { useStore, Order } from "@store/useStore";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

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

import { useSearchParams } from "react-router-dom";

interface OrderTableProps {
  defaultStatus?: string;
}

export function OrderTable({ defaultStatus }: OrderTableProps) {
  const [searchParams] = useSearchParams();
  const urlStatus = searchParams.get("status");

  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState<string>(urlStatus || defaultStatus || "all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (urlStatus) setFilter(urlStatus);
    else if (defaultStatus) setFilter(defaultStatus);
  }, [urlStatus, defaultStatus]);

  const filteredOrders = orders.filter((order) =>
    filter === "all" ? true : order.status === filter
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("tr-TR");
  };

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
            <SelectItem value="pending">Bekliyor</SelectItem>
            <SelectItem value="preparing">Hazırlanıyor</SelectItem>
            <SelectItem value="ready">Hazır</SelectItem>
            <SelectItem value="delivered">Teslim Edildi</SelectItem>
            <SelectItem value="cancelled">İptal Edildi</SelectItem>
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
                  <TableCell>{order.customerName || "Misafir"}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="text-sm text-muted-foreground truncate">
                      {order.items.map((i) => i.name).join(", ")}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₺{order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) =>
                        updateOrderStatus(order.id, value as Order["status"])
                      }
                    >
                      <SelectTrigger
                        className={`h-8 w-[140px] border-0 text-xs font-medium focus:ring-0 ${statusColors[order.status] || "bg-gray-500/10 text-gray-500"
                          }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Bekliyor</SelectItem>
                        <SelectItem value="preparing">Hazırlanıyor</SelectItem>
                        <SelectItem value="ready">Hazır</SelectItem>
                        <SelectItem value="delivered">Teslim Edildi</SelectItem>
                        <SelectItem value="cancelled">İptal</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
