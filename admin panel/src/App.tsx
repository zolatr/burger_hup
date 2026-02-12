import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import { ProductTable } from "@/components/MenuManagement/ProductTable";
import { OrderTable } from "@/components/OrderManagement/OrderTable";
import { CampaignGrid } from "@/components/Campaigns/CampaignGrid";
import { UserTable } from "@/components/UserManagement/UserTable";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BarChart3, Settings, UtensilsCrossed, Clock } from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardContent />;
      case "products":
        return <ProductTable />;
      case "categories":
        return (
          <PlaceholderPage
            title="Kategori Yönetimi"
            description="Ürün kategorilerinizi yönetin"
            icon={UtensilsCrossed}
          />
        );
      case "orders":
        return <OrderTable />;
      case "pending-orders":
        return <OrderTable />;
      case "campaigns":
        return <CampaignGrid />;
      case "users":
        return <UserTable />;
      case "reports":
        return (
          <PlaceholderPage
            title="Raporlar"
            description="Detaylı satış ve performans raporları"
            icon={BarChart3}
          />
        );
      case "settings":
        return (
          <PlaceholderPage
            title="Ayarlar"
            description="Sistem ayarlarını yönetin"
            icon={Settings}
          />
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="dark min-h-screen">
      <SidebarProvider>
        <AppSidebar activePage={activePage} onNavigate={setActivePage} />
        <SidebarInset>
          <Header />
          <main className="p-6">{renderPage()}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default App;
