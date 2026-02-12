import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Order } from '../types/types';
import { formatCurrency, formatDateTime } from '../lib/utils';
import { Package, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  pending: {
    label: 'Beklemede',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800',
  },
  preparing: {
    label: 'Hazırlanıyor',
    icon: Package,
    color: 'bg-blue-100 text-blue-800',
  },
  'on-the-way': {
    label: 'Yolda',
    icon: Truck,
    color: 'bg-purple-100 text-purple-800',
  },
  delivered: {
    label: 'Teslim Edildi',
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-800',
  },
  cancelled: {
    label: 'İptal Edildi',
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
  },
};

export function OrderCard({ order }: OrderCardProps) {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold">Sipariş #{order.id}</span>
              <Badge className={`${status.color} border-0`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-primary">
              {formatCurrency(order.total)}
            </div>
            <p className="text-xs text-muted-foreground">
              {order.items.length} ürün
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
          {order.items.length > 3 && (
            <p className="text-sm text-muted-foreground">
              +{order.items.length - 3} ürün daha
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Package className="w-4 h-4" />
          <span>{order.address.district}, {order.address.city}</span>
        </div>

        {order.status === 'delivered' && !order.rating && (
          <Button variant="outline" size="sm" className="w-full">
            Değerlendir
          </Button>
        )}
        
        {order.status === 'delivered' && (
          <Button variant="outline" size="sm" className="w-full mt-2">
            Tekrar Sipariş Ver
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
