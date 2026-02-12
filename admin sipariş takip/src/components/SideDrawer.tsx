import { Order, OrderStatus, kurye } from "@/lib/mockOrders";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Phone, User, Package, Truck, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface SideDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (orderId: number, newStatus: OrderStatus) => void;
  onCourierAssign: (orderId: number, courier: string) => void;
}

const statusMap: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  bekliyor: {
    label: "Bekliyor",
    color: "bg-red-500",
    icon: <Clock className="h-4 w-4" />,
  },
  hazirlaniyor: {
    label: "Hazırlanıyor",
    color: "bg-yellow-500",
    icon: <Package className="h-4 w-4" />,
  },
  yolda: {
    label: "Yolda",
    color: "bg-blue-500",
    icon: <Truck className="h-4 w-4" />,
  },
  teslim: {
    label: "Teslim Edildi",
    color: "bg-green-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
};

export function SideDrawer({ order, open, onClose, onStatusChange, onCourierAssign }: SideDrawerProps) {
  if (!order) return null;

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const flow: OrderStatus[] = ["bekliyor", "hazirlaniyor", "yolda", "teslim"];
    const currentIndex = flow.indexOf(currentStatus);
    if (currentIndex < flow.length - 1) {
      return flow[currentIndex + 1];
    }
    return null;
  };

  const nextStatus = getNextStatus(order.durum);
  const currentStatusInfo = statusMap[order.durum];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-neutral-950 border-neutral-800 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-white">
            Sipariş Detayları
          </SheetTitle>
          <SheetDescription className="text-neutral-400">
            Sipariş #{order.id.toString().padStart(4, '0')}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge className={`${currentStatusInfo.color} text-white font-semibold border-none px-3 py-1.5`}>
              {currentStatusInfo.icon}
              {currentStatusInfo.label}
            </Badge>
            <span className="text-xs text-neutral-500">
              {order.saat}
            </span>
          </div>

          <Separator className="bg-neutral-800" />

          {/* Customer Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-400">Müşteri Bilgileri</h4>
            <div className="space-y-2 rounded-lg border border-neutral-800 bg-neutral-900/30 p-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-neutral-500" />
                <span className="text-sm font-medium text-white">{order.musteri}</span>
              </div>
              {order.telefon && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-neutral-500" />
                  <span className="text-sm text-neutral-300">{order.telefon}</span>
                </div>
              )}
              {order.adres && (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-neutral-500" />
                  <span className="text-sm text-neutral-300">{order.adres}</span>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-400">Sipariş Detayları</h4>
            <div className="space-y-2">
              {order.urunler.map((urun, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/30 p-3"
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-neutral-500" />
                    <span className="text-sm text-white">{urun}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#FFB703] bg-[#FFB703]/10 p-4">
              <span className="text-sm font-semibold text-white">Toplam Tutar</span>
              <span className="text-xl font-bold text-[#FFB703]">{order.tutar}₺</span>
            </div>
          </div>

          {/* Courier Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-400">Kurye Bilgisi</h4>
            <div className="space-y-2">
              {order.kurye ? (
                <div className="flex items-center justify-between rounded-lg border border-green-900 bg-green-950/20 p-3">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">{order.kurye}</span>
                  </div>
                  <Badge variant="outline" className="border-green-900 bg-green-950/30 text-green-400">
                    Atandı
                  </Badge>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/30 p-3">
                    <span className="text-sm text-neutral-400">Kurye henüz atanmadı</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {kurye.map((k) => (
                      <Button
                        key={k}
                        variant="outline"
                        size="sm"
                        className="border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:text-white"
                        onClick={() => onCourierAssign(order.id, k)}
                      >
                        <Truck className="mr-2 h-3 w-3" />
                        {k}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 flex-col gap-2 sm:flex-col">
          {nextStatus && (
            <Button
              className="w-full bg-[#FFB703] text-black font-semibold hover:bg-[#FB8500]"
              onClick={() => {
                onStatusChange(order.id, nextStatus);
                onClose();
              }}
            >
              {statusMap[nextStatus].label} Olarak İşaretle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800"
              onClick={onClose}
            >
              Kapat
            </Button>
            <Button
              variant="destructive"
              className="bg-red-950 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white"
            >
              <XCircle className="mr-2 h-4 w-4" />
              İptal Et
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
