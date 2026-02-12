import { Order } from "@store/useStore";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@shared/components/ui/sheet";
import { Badge } from "@shared/components/ui/badge";
import { Button } from "@shared/components/ui/button";
import { Separator } from "@shared/components/ui/separator";
import { Clock, MapPin, Phone, User, Package, Truck, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

interface SideDrawerProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onCourierAssign: (orderId: string, courier: string) => void;
}

const statusMap: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "Bekliyor",
    color: "bg-red-500",
    icon: <Clock className="h-4 w-4" />,
  },
  preparing: {
    label: "Hazırlanıyor",
    color: "bg-yellow-500",
    icon: <Package className="h-4 w-4" />,
  },
  ready: {
    label: "Hazır",
    color: "bg-blue-500",
    icon: <Truck className="h-4 w-4" />,
  },
  delivered: {
    label: "Teslim Edildi",
    color: "bg-green-500",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  cancelled: {
    label: "İptal",
    color: "bg-gray-500",
    icon: <XCircle className="h-4 w-4" />,
  }
};

const kuryeList = ["Ali Y.", "Mehmet K.", "Ayşe S.", "Fatma D."];

export function SideDrawer({ order, open, onClose, onStatusChange, onCourierAssign }: SideDrawerProps) {
  if (!order) return null;

  const getNextStatus = (currentStatus: string): Order['status'] | null => {
    const flow: Order['status'][] = ["pending", "preparing", "ready", "delivered"];
    const currentIndex = flow.indexOf(currentStatus as Order['status']);
    if (currentIndex < flow.length - 1 && currentIndex !== -1) {
      return flow[currentIndex + 1];
    }
    return null;
  };

  const nextStatus = getNextStatus(order.status);
  const currentStatusInfo = statusMap[order.status] || statusMap.pending;

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-neutral-950 border-neutral-800 p-0 flex flex-col h-full">
        {/* Header Section - Sticky */}
        <div className="flex-none p-6 pb-2 border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-sm z-10">
          <SheetHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-2xl font-bold text-white tracking-tight">
                  Sipariş #{order.id}
                </SheetTitle>
                <SheetDescription className="text-neutral-400 mt-1 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTime(order.createdAt)} • {new Date(order.createdAt).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long' })}
                </SheetDescription>
              </div>
              <Badge className={`${currentStatusInfo.color} text-white px-4 py-1.5 text-sm font-semibold shadow-lg shadow-black/20 border-0`}>
                <span className="flex items-center gap-2">
                  {currentStatusInfo.icon}
                  {currentStatusInfo.label}
                </span>
              </Badge>
            </div>
          </SheetHeader>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Customer Card */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <User className="w-4 h-4" />
              <h4 className="text-sm font-semibold uppercase tracking-wider">Müşteri</h4>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex items-center justify-between group hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-800/80 group-hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{order.customerName || "Misafir Müşteri"}</p>
                  <p className="text-sm text-neutral-500">Masa No: {order.tableId || "-"}</p>
                </div>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-800/50" />

          {/* Order Details */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <Package className="w-4 h-4" />
              <h4 className="text-sm font-semibold uppercase tracking-wider">Sipariş Detayı</h4>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl divide-y divide-neutral-800 overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-neutral-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-neutral-800 text-white font-mono text-sm w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-700">
                      {item.quantity}x
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      {/* Assuming styling options exist in item, obscure if not */}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {(item.price * item.quantity).toFixed(2)}₺
                  </div>
                </div>
              ))}
              <div className="p-4 bg-neutral-900 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-400">Toplam Tutar</span>
                <span className="text-xl font-bold text-[#FFB703]">{order.total.toFixed(2)}₺</span>
              </div>
            </div>
          </section>

          <Separator className="bg-neutral-800/50" />

          {/* Courier Assignment */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <Truck className="w-4 h-4" />
              <h4 className="text-sm font-semibold uppercase tracking-wider">Kurye</h4>
            </div>

            {order.courier ? (
              <div className="bg-green-950/20 border border-green-900/50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-900/30 text-green-400 flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">Atanan Kurye</p>
                    <p className="text-base font-bold text-white">{order.courier}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-neutral-400 hover:text-white hover:bg-neutral-800"
                  onClick={() => onCourierAssign(order.id, "")} // Assuming empty string unassigns or we handle differently
                >
                  Değiştir
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {kuryeList.map((k) => (
                  <button
                    key={k}
                    onClick={() => onCourierAssign(order.id, k)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-800 hover:border-neutral-700 transition-all group text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center group-hover:bg-[#FFB703] group-hover:text-black transition-colors">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">{k}</span>
                  </button>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Footer Actions - Sticky */}
        <div className="flex-none p-6 border-t border-neutral-800 bg-neutral-950/50 backdrop-blur-sm z-10">
          <div className="flex flex-col gap-3">
            {nextStatus && (
              <Button
                size="lg"
                className="w-full bg-[#FFB703] text-black font-bold hover:bg-[#FB8500] h-12 text-base shadow-lg shadow-orange-500/10"
                onClick={() => {
                  onStatusChange(order.id, nextStatus);
                  onClose();
                }}
              >
                {statusMap[nextStatus].label} Olarak İşaretle
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:text-white h-12"
                onClick={onClose}
              >
                Kapat
              </Button>
              <Button
                variant="destructive"
                size="lg"
                className="bg-red-950/50 border border-red-900/50 text-red-400 hover:bg-red-900 hover:text-white h-12"
              >
                <XCircle className="mr-2 h-5 w-5" />
                İptal Et
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
