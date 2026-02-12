import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/lib/mockOrders";
import { Clock, Package, User } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  return (
    <Card
      className="cursor-pointer border-neutral-800 bg-neutral-900/50 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-900 hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="space-y-3">
          {/* Header - Customer & Time */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800">
                <User className="h-4 w-4 text-neutral-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{order.musteri}</p>
                <p className="text-xs text-neutral-500">#{order.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-neutral-400">
              <Clock className="h-3 w-3" />
              {order.saat}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <Package className="h-3 w-3" />
              <span>Ürünler:</span>
            </div>
            <div className="space-y-1">
              {order.urunler.slice(0, 2).map((urun, idx) => (
                <div
                  key={idx}
                  className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs text-neutral-300"
                >
                  {urun}
                </div>
              ))}
              {order.urunler.length > 2 && (
                <div className="text-xs text-neutral-500">
                  +{order.urunler.length - 2} daha...
                </div>
              )}
            </div>
          </div>

          {/* Footer - Courier & Price */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div>
              {order.kurye ? (
                <Badge variant="outline" className="border-green-900 bg-green-950/30 text-green-400">
                  {order.kurye}
                </Badge>
              ) : (
                <Badge variant="outline" className="border-neutral-800 text-neutral-500">
                  Kurye Atanmadı
                </Badge>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#FFB703]">{order.tutar}₺</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
