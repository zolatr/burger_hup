import { useState } from 'react';
import { OrderCard } from './OrderCard';
import { Badge } from '@shared/components/ui/badge';
import { Package } from 'lucide-react';
import { useStore } from '@store/useStore';

export function OrdersSection() {
  const { orders, user } = useStore();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Filter orders for the current user (if logged in)
  const userOrders = user ? orders.filter(o => o.userId === user.id) : [];

  const filteredOrders = userOrders.filter((order) => {
    if (filter === 'active') {
      return ['pending', 'preparing', 'ready'].includes(order.status);
    }
    if (filter === 'completed') {
      return ['delivered', 'cancelled'].includes(order.status);
    }
    return true;
  });

  const activeCount = userOrders.filter((o) =>
    ['pending', 'preparing', 'ready'].includes(o.status)
  ).length;
  const completedCount = userOrders.filter((o) =>
    ['delivered', 'cancelled'].includes(o.status)
  ).length;

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Siparişlerim</h2>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        <Badge
          variant={filter === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setFilter('all')}
        >
          Hepsi ({userOrders.length})
        </Badge>
        <Badge
          variant={filter === 'active' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setFilter('active')}
        >
          Aktif ({activeCount})
        </Badge>
        <Badge
          variant={filter === 'completed' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setFilter('completed')}
        >
          Tamamlanan ({completedCount})
        </Badge>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="grid gap-4">
          {filteredOrders.map((order) => (
            // Need to map Global Order to OrderCard props if there's type mismatch
            // Assuming OrderCard in this module expects a specific type
            // I'll check OrderCard.tsx if it fails.
            // For now passing order.
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Sipariş Bulunamadı</h3>
          <p className="text-muted-foreground">
            {filter === 'active'
              ? 'Henüz aktif siparişiniz bulunmuyor.'
              : 'Henüz tamamlanan siparişiniz bulunmuyor.'}
          </p>
        </div>
      )}
    </div>
  );
}
