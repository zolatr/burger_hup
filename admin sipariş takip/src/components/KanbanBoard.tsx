import { useState, useEffect } from "react";
import { Order, OrderStatus, mockOrders } from "@/lib/mockOrders";
import { KanbanColumn } from "./KanbanColumn";
import { SideDrawer } from "./SideDrawer";
import { Clock, Package, Truck, CheckCircle2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const columns = [
  {
    title: "Bekliyor",
    status: "bekliyor" as OrderStatus,
    color: "bg-red-500",
    icon: <Clock className="h-4 w-4 text-white" />,
  },
  {
    title: "Hazırlanıyor",
    status: "hazirlaniyor" as OrderStatus,
    color: "bg-yellow-500",
    icon: <Package className="h-4 w-4 text-white" />,
  },
  {
    title: "Yolda",
    status: "yolda" as OrderStatus,
    color: "bg-blue-500",
    icon: <Truck className="h-4 w-4 text-white" />,
  },
  {
    title: "Teslim Edildi",
    status: "teslim" as OrderStatus,
    color: "bg-green-500",
    icon: <CheckCircle2 className="h-4 w-4 text-white" />,
  },
];

export function KanbanBoard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Simulate real-time new orders
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrderId = Math.max(...orders.map(o => o.id)) + 1;
      const customers = ["Ayşe Y.", "Mehmet K.", "Fatma S.", "Ali V.", "Zeynep D."];
      const products = [
        ["Pizza Pepperoni", "Ayran"],
        ["Tavuk Döner", "Patates"],
        ["Hamburger Menü"],
        ["Lahmacun", "Çay"],
        ["Köfte Ekmek", "Turşu"],
      ];
      
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
      const randomProducts = products[Math.floor(Math.random() * products.length)];
      const randomPrice = Math.floor(Math.random() * 100) + 50;
      const currentTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

      const newOrder: Order = {
        id: newOrderId,
        musteri: randomCustomer,
        urunler: randomProducts,
        tutar: randomPrice,
        durum: "bekliyor",
        saat: currentTime,
        kurye: null,
        telefon: "0532 XXX XXXX",
        adres: "Yeni Adres",
      };

      setOrders(prev => [newOrder, ...prev]);
      toast.success("Yeni Sipariş!", {
        description: `${randomCustomer} - ${randomPrice}₺`,
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [orders]);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, durum: newStatus } : order
      )
    );
    toast.success("Sipariş Durumu Güncellendi", {
      description: `Sipariş #${orderId.toString().padStart(4, '0')} durumu değiştirildi.`,
    });
  };

  const handleCourierAssign = (orderId: number, courier: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, kurye: courier } : order
      )
    );
    setSelectedOrder((prev) =>
      prev && prev.id === orderId ? { ...prev, kurye: courier } : prev
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
              orders={orders.filter((order) => order.durum === column.status)}
              color={column.color}
              icon={column.icon}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-[#FFB703] text-black shadow-2xl hover:bg-[#FB8500] hover:scale-110 transition-transform p-0"
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
