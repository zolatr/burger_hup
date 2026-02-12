import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LandingPage } from './pages/LandingPage';
import { CustomerPortal } from './pages/CustomerPortal';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showPortal, setShowPortal] = useState(false);

  // Show portal if authenticated and user wants to see it
  const shouldShowPortal = isAuthenticated && showPortal;

  return (
    <>
      {shouldShowPortal ? (
        <CustomerPortal onBackToLanding={() => setShowPortal(false)} />
      ) : (
        <LandingPage onNavigateToPortal={() => setShowPortal(true)} />
      )}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
