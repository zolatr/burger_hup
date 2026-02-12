import { useState, useEffect } from "react";
import { useStore, Order } from "@store/useStore";
import { KanbanColumn } from "./KanbanColumn";
import { SideDrawer } from "./SideDrawer";
import { Clock, Package, Truck, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@shared/components/ui/button";
import { toast } from "sonner";

const columns = [
  {
    title: "Bekliyor",
    status: "pending" as const,
    color: "bg-red-500",
    icon: <Clock className="h-4 w-4 text-white" />,
  },
  {
    title: "Hazırlanıyor",
    status: "preparing" as const,
    color: "bg-yellow-500",
    icon: <Package className="h-4 w-4 text-white" />,
  },
  {
    title: "Hazır / Yolda",
    status: "ready" as const,
    color: "bg-blue-500",
    icon: <Truck className="h-4 w-4 text-white" />,
  },
  {
    title: "Teslim Edildi",
    status: "delivered" as const,
    color: "bg-green-500",
    icon: <CheckCircle2 className="h-4 w-4 text-white" />,
  },
];

export function KanbanBoard() {
  const { orders, updateOrderStatus, updateOrder } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sound Notification Logic
  const [prevOrderCount, setPrevOrderCount] = useState(orders.length);
  const [audio] = useState(new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3")); // Notification sound

  useEffect(() => {
    // Play sound if new order arrived (count increased)
    if (orders.length > prevOrderCount) {
      audio.play().catch(e => console.error("Audio play failed", e));
      toast.info("Yeni Sipariş Geldi!", {
        description: "Mutfakta yeni bir sipariş var.",
        duration: 5000,
      });
    }
    setPrevOrderCount(orders.length);
  }, [orders.length, prevOrderCount, audio]);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus);
    toast.success("Sipariş Durumu Güncellendi", {
      description: `Sipariş #${orderId} durumu değiştirildi.`,
    });
  };

  const handleCourierAssign = (orderId: string, courier: string) => {
    updateOrder(orderId, { courier });
    // Also update local selected order if open
    setSelectedOrder((prev) =>
      prev && prev.id === orderId ? { ...prev, courier } : prev
    );
    toast.success("Kurye Atandı", {
      description: `${courier} siparişe atandı.`,
    });
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <>
      <div className="flex-1 overflow-hidden p-6">
        <div className="grid h-full grid-cols-4 gap-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              orders={orders.filter((order) => order.status === column.status)}
              color={column.color}
              icon={column.icon}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button - Mock helper */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#FFB703] text-black shadow-2xl hover:bg-[#FB8500] hover:scale-110 transition-transform p-0"
        onClick={() => toast.info("Simülasyon şu an için mağaza tarafından otomatik yapılıyor.")}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Side Drawer */}
      <SideDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onStatusChange={handleStatusChange}
        onCourierAssign={handleCourierAssign}
      />
    </>
  );
}
