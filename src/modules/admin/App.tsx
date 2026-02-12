import { useState } from "react";
import { AppSidebar } from "@admin/components/AppSidebar";
import { Header } from "@admin/components/Header";
import { DashboardContent } from "@admin/components/Dashboard/DashboardContent";
import { ProductTable } from "@admin/components/MenuManagement/ProductTable";
import { CategoryManager } from "@admin/components/MenuManagement/CategoryManager";
import { OrderTable } from "@admin/components/OrderManagement/OrderTable";
import { CampaignGrid } from "@admin/components/Campaigns/CampaignGrid";
import { UserTable } from "@admin/components/UserManagement/UserTable";
import { PlaceholderPage } from "@admin/components/PlaceholderPage";
import { ReportsPage } from "@admin/pages/ReportsPage";
import { AdminProfilePage } from "@admin/pages/AdminProfilePage";
import { SidebarProvider, SidebarInset } from "@shared/components/ui/sidebar";
import { BarChart3, Settings, UtensilsCrossed, Clock } from "lucide-react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function AdminApp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Map location path to activePage for sidebar highlighting
  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes("/products")) return "products";
    if (path.includes("/categories")) return "categories";
    if (path.includes("/orders")) return "orders";
    if (path.includes("/campaigns")) return "campaigns";
    if (path.includes("/users")) return "users";
    if (path.includes("/reports")) return "reports";
    if (path.includes("/settings")) return "settings";
    return "dashboard";
  };

  return (
    <div className="dark min-h-screen">
      <SidebarProvider>
        <AppSidebar
          activePage={getActivePage()}
          onNavigate={(page) => {
            if (page === "dashboard") navigate("/admin");
            else navigate(`/admin/${page}`);
          }}
        />
        <SidebarInset>
          <Header />
          <main className="p-6">
            <Routes>
              <Route index element={<DashboardContent />} />
              <Route path="products" element={<ProductTable />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="orders" element={<OrderTable />} />
              <Route path="pending-orders" element={<OrderTable defaultStatus="pending" />} />
              <Route path="campaigns" element={<CampaignGrid />} />
              <Route path="users" element={<UserTable />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="settings" element={
                <PlaceholderPage
                  title="Ayarlar"
                  description="Sistem ayarlarını yönetin"
                  icon={Settings}
                />
              } />
              <Route path="*" element={<DashboardContent />} />
            </Routes>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

// ... imports
// No Toaster to remove based on previous read. 
// Just ensuring it's compliant.
export default AdminApp;
