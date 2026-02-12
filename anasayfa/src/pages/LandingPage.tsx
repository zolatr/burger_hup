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

interface LandingPageProps {
  onNavigateToPortal: () => void;
}

export function LandingPage({ onNavigateToPortal }: LandingPageProps) {
  const { isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleOrderClick = () => {
    if (isAuthenticated) {
      onNavigateToPortal();
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleMenuClick = () => {
    if (isAuthenticated) {
      onNavigateToPortal();
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
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
