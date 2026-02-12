import { Order } from "@store/useStore";
import { OrderCard } from "./OrderCard";
import { Badge } from "@shared/components/ui/badge";

interface KanbanColumnProps {
  title: string;
  status: Order['status'];
  orders: Order[];
  color: string;
  icon: React.ReactNode;
  onOrderClick: (order: Order) => void;
}

export function KanbanColumn({
  title,
  orders,
  color,
  icon,
  onOrderClick,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-950/30 p-4">
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
            {icon}
          </div>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">
          {orders.length}
        </Badge>
      </div>

      {/* Orders List */}
      <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-2 text-neutral-600">{icon}</div>
            <p className="text-sm text-neutral-500">Sipariş yok</p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} onClick={() => onOrderClick(order)} />
          ))
        )}
      </div>
    </div>
  );
}
