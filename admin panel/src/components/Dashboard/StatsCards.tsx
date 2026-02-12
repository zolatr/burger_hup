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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDashboardStats } from "@/lib/mockData";

const statCards = [
  {
    title: "Günlük Sipariş",
    value: mockDashboardStats.gunlukSiparis.value,
    trend: mockDashboardStats.gunlukSiparis.trend,
    icon: ShoppingCart,
    color: "text-blue-500",
  },
  {
    title: "Günlük Ciro",
    value: `₺${mockDashboardStats.gunlukCiro.value.toLocaleString()}`,
    trend: mockDashboardStats.gunlukCiro.trend,
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Ortalama Sepet",
    value: `₺${mockDashboardStats.ortalamaSepet.value.toFixed(2)}`,
    trend: mockDashboardStats.ortalamaSepet.trend,
    icon: TrendingUp,
    color: "text-purple-500",
  },
  {
    title: "Aktif Siparişler",
    value: mockDashboardStats.aktifSiparisler.value,
    trend: mockDashboardStats.aktifSiparisler.trend,
    icon: Package,
    color: "text-orange-500",
  },
  {
    title: "En Çok Satan",
    value: mockDashboardStats.enCokSatan.value,
    subtitle: `${mockDashboardStats.enCokSatan.count} adet`,
    icon: Star,
    color: "text-yellow-500",
  },
  {
    title: "Bekleyen Siparişler",
    value: mockDashboardStats.bekleyenSiparisler.value,
    trend: mockDashboardStats.bekleyenSiparisler.trend,
    icon: Clock,
    color: "text-red-500",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend !== undefined && stat.trend > 0;
        const TrendIcon = isPositive ? ArrowUp : ArrowDown;

        return (
          <Card key={index} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              )}
              {stat.trend !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  <TrendIcon
                    className={`size-3 ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isPositive ? "text-green-500" : "text-red-500"
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
