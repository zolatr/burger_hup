import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import { useStore } from '@store/useStore';
import { AuthProvider, useAuth } from '@home/contexts/AuthContext';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { NotFound } from '@shared/pages/NotFound';
import { FullScreenLoading } from '@shared/components/Loading';

// Lazy Load Modules
const HomeApp = lazy(() => import('@home/App'));
const MenuApp = lazy(() => import('@menu/App'));
const AdminApp = lazy(() => import('@admin/App'));
const KitchenApp = lazy(() => import('@kitchen/App'));
const AdminLogin = lazy(() => import('@admin/pages/Login').then(module => ({ default: module.AdminLogin })));

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
            if (location.pathname.startsWith('/admin')) {
                return <Navigate to="/admin/login" state={{ from: location }} replace />;
            }
            if (user.role === 'admin') return <Navigate to="/admin" replace />;
            if (['chef', 'waiter'].includes(user.role)) return <Navigate to="/kitchen" replace />;
            return <Navigate to="/" replace />;
        }
    }

    return <>{children}</>;
}

function App() {
    const initializeStore = useStore(state => state.initializeStore);

    useEffect(() => {
        initializeStore();
    }, [initializeStore]);

    return (
        <ErrorBoundary>
            <AuthProvider>
                <Suspense fallback={<FullScreenLoading />}>
                    <Routes>
                        <Route path="/" element={<HomeApp />} />
                        <Route path="/menu/*" element={<MenuApp />} />
                        <Route path="/admin/login" element={<AdminLogin />} />

                        <Route path="/admin/*" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminApp />
                            </ProtectedRoute>
                        } />

                        <Route path="/kitchen/*" element={
                            <ProtectedRoute allowedRoles={['admin', 'chef', 'waiter']}>
                                <KitchenApp />
                            </ProtectedRoute>
                        } />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
                <Toaster position="top-right" richColors />
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
