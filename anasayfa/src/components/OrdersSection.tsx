import { useState } from 'react';
import { OrderCard } from './OrderCard';
import { Badge } from './ui/badge';
import { Order } from '../types/types';
import { Package } from 'lucide-react';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'BH123456',
    userId: '1',
    items: [
      {
        id: '1',
        name: 'Klasik Burger',
        description: 'Sığır eti, marul, domates',
        price: 89.90,
        image: '',
        category: 'Burgerler',
        quantity: 2,
      },
      {
        id: '7',
        name: 'Patates Kızartması',
        description: 'Çıtır patatesler',
        price: 24.90,
        image: '',
        category: 'Yan Ürünler',
        quantity: 1,
      },
    ],
    total: 204.70,
    status: 'on-the-way',
    address: {
      id: '1',
      title: 'Ev',
      fullAddress: 'Atatürk Cad. No:123',
      city: 'İstanbul',
      district: 'Kadıköy',
      zipCode: '34000',
    },
    paymentMethod: 'card',
    createdAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    estimatedDelivery: new Date(Date.now() + 15 * 60000), // 15 minutes from now
  },
  {
    id: 'BH123455',
    userId: '1',
    items: [
      {
        id: '2',
        name: 'Cheddar Deluxe',
        description: 'Çift et, cheddar',
        price: 109.90,
        image: '',
        category: 'Burgerler',
        quantity: 1,
      },
    ],
    total: 124.90,
    status: 'delivered',
    address: {
      id: '1',
      title: 'Ev',
      fullAddress: 'Atatürk Cad. No:123',
      city: 'İstanbul',
      district: 'Kadıköy',
      zipCode: '34000',
    },
    paymentMethod: 'cash',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 days ago
    rating: 5,
  },
];

export function OrdersSection() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (filter === 'active') {
      return ['pending', 'preparing', 'on-the-way'].includes(order.status);
    }
    if (filter === 'completed') {
      return ['delivered', 'cancelled'].includes(order.status);
    }
    return true;
  });

  const activeCount = mockOrders.filter((o) =>
    ['pending', 'preparing', 'on-the-way'].includes(o.status)
  ).length;
  const completedCount = mockOrders.filter((o) =>
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
          Hepsi ({mockOrders.length})
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
