import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { CustomerPortal } from './pages/CustomerPortal';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showPortal, setShowPortal] = useState(false);
  const [initialTab, setInitialTab] = useState('menu');

  // Show portal if authenticated and user wants to see it
  const shouldShowPortal = isAuthenticated && showPortal;

  const openPortal = (tab: string = 'menu') => {
    setInitialTab(tab);
    setShowPortal(true);
  };

  return (
    <>
      {shouldShowPortal ? (
        <CustomerPortal
          onBackToLanding={() => setShowPortal(false)}
          initialTab={initialTab}
        />
      ) : (
        <LandingPage
          onNavigateToPortal={(tab) => openPortal(tab)}
          onOpenProfile={() => openPortal('profile')}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
