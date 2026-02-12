import { StatsCards } from "./StatsCards";
import { Charts } from "./Charts";
import { RecentOrders } from "./RecentOrders";

export function DashboardContent() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Hoş geldiniz! İşletmenizin genel durumunu buradan takip edebilirsiniz.
        </p>
      </div>

      <StatsCards />
      <Charts />
      <RecentOrders />
    </div>
  );
}
