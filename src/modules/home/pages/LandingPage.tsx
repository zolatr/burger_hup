import { useState } from 'react';
import { Hero } from '../components/Hero';
import { MenuPreview } from '../components/MenuPreview';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { CampaignBanner } from '../components/CampaignBanner';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';

import { HomeHeader } from '../components/HomeHeader';

interface LandingPageProps {
  onNavigateToPortal: (tab?: string) => void;
  onOpenProfile: () => void;
}

export function LandingPage({ onNavigateToPortal, onOpenProfile }: LandingPageProps) {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOrderClick = () => {
    if (isAuthenticated) {
      onNavigateToPortal('menu');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isAuthenticated) {
      onNavigateToPortal('menu');
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <HomeHeader
        onLoginClick={() => setAuthModalOpen(true)}
        onCartClick={() => {
          if (isAuthenticated) onNavigateToPortal('cart');
          else setAuthModalOpen(true);
        }}
        onProfileClick={onOpenProfile}
      />

      <Hero onOrderClick={handleOrderClick} onMenuClick={handleMenuClick} />
      <MenuPreview onViewAllClick={handleMenuClick} />
      <FeaturesGrid />
      <HowItWorks />
      <CampaignBanner onGetStarted={handleOrderClick} />
      <Testimonials />
      <Footer />

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={onNavigateToPortal}
      />
    </div>
  );
}
