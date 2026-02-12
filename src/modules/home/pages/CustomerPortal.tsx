import { useState } from 'react';
import { CustomerHeader } from '../components/CustomerHeader';
import { MenuSection } from '../components/MenuSection';
import { CartSection } from '../components/CartSection';
import { OrdersSection } from '../components/OrdersSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/components/ui/tabs';
import { Menu, ShoppingCart, Package, User } from 'lucide-react';
import { ProfileSection } from '../components/ProfileSection';

interface CustomerPortalProps {
  onBackToLanding: () => void;
  initialTab?: string;
}

export function CustomerPortal({ onBackToLanding, initialTab = 'menu' }: CustomerPortalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader
        onBackToLanding={onBackToLanding}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Menü</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Sepetim</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Siparişlerim</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profilim</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <MenuSection />
          </TabsContent>

          <TabsContent value="cart">
            <CartSection />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersSection />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
