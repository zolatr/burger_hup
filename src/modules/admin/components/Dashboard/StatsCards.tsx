import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Package,
  Star,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { useStore } from "@store/useStore";
import { useNavigate } from "react-router-dom";

export function StatsCards() {
  const { orders } = useStore();
  const navigate = useNavigate();

  // Calculate Stats
  const today = new Date().toISOString().split('T')[0];
  const todaysOrders = orders.filter(o => o.createdAt.startsWith(today));

  const dailyOrderCount = todaysOrders.length;
  const dailyRevenue = todaysOrders.reduce((sum, o) => sum + o.total, 0);

  const activeOrdersCount = orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status)).length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const averageCartTimeout = orders.length > 0 ? totalRevenue / orders.length : 0;

  // Mock trends for now since we don't have historical data structure easily accessible
  const statCards = [
    {
      title: "Günlük Sipariş",
      value: dailyOrderCount,
      trend: 12, // mock
      icon: ShoppingCart,
      color: "text-blue-500",
      path: "/admin/orders",
    },
    {
      title: "Günlük Ciro",
      value: `₺${dailyRevenue.toLocaleString()}`,
      trend: 8, // mock
      icon: DollarSign,
      color: "text-green-500",
      path: "/admin/reports",
    },
    {
      title: "Ortalama Sepet",
      value: `₺${averageCartTimeout.toFixed(2)}`,
      trend: -2, // mock
      icon: TrendingUp,
      color: "text-purple-500",
      path: "/admin/reports",
    },
    {
      title: "Aktif Siparişler",
      value: activeOrdersCount,
      trend: 5, // mock
      icon: Package,
      color: "text-orange-500",
      path: "/admin/orders",
    },
    {
      title: "Bekleyen Siparişler",
      value: pendingOrdersCount,
      trend: 0,
      icon: Clock,
      color: "text-red-500",
      path: "/admin/pending-orders",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend !== undefined && stat.trend > 0;
        const TrendIcon = isPositive ? ArrowUp : ArrowDown;

        return (
          <Card
            key={index}
            className="bg-card border-border hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.trend !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  <TrendIcon
                    className={`size-3 ${isPositive ? "text-green-500" : "text-red-500"
                      }`}
                  />
                  <span
                    className={`text-xs font-medium ${isPositive ? "text-green-500" : "text-red-500"
                      }`}
                  >
                    {Math.abs(stat.trend)}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    geçen haftaya göre
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
