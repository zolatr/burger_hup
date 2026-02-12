import { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu';
import { Badge } from '@shared/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '@store/useStore';
import { User, ShoppingBag, LogOut, LogIn } from 'lucide-react';
import { AuthModal } from './AuthModal';

interface HomeHeaderProps {
    onLoginClick?: () => void;
    onCartClick?: () => void;
    onProfileClick?: () => void;
}

export function HomeHeader({ onLoginClick, onCartClick, onProfileClick }: HomeHeaderProps) {
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useStore();
    const [authModalOpen, setAuthModalOpen] = useState(false);

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleLoginClick = () => {
        if (onLoginClick) {
            onLoginClick();
        } else {
            setAuthModalOpen(true);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                                BurgerHub
                            </span>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            {/* Cart */}
                            <button
                                className="relative p-2 hover:bg-accent rounded-full transition-colors"
                                onClick={onCartClick}
                            >
                                <ShoppingBag className="w-6 h-6 text-foreground" />
                                {itemCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-in zoom-in">
                                        {itemCount}
                                    </Badge>
                                )}
                            </button>

                            {/* User Profile / Login */}
                            {isAuthenticated ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-full">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{user?.name}</span>
                                                <span className="text-xs text-muted-foreground">{user?.email}</span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onSelect={(e: Event) => {
                                                e.preventDefault();
                                                onProfileClick?.();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            Profilim
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <ShoppingBag className="mr-2 h-4 w-4" />
                                            Siparişlerim
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Çıkış Yap
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button onClick={handleLoginClick} size="sm" className="gap-2">
                                    <LogIn className="w-4 h-4" />
                                    Giriş Yap
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                open={authModalOpen}
                onOpenChange={setAuthModalOpen}
                onSuccess={() => { }}
            />
        </>
    );
}
