import { useState } from 'react';
import { useAuth } from '@home/contexts/AuthContext';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@shared/components/ui/card';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function AdminLogin() {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            toast.success('Giriş başarılı');

            // Redirect based on role
            // We need to get the user from context, but context updates might be async or require effect
            // However, since login is async and sets state, we might need to wait or rely on a separate effect
            // unique to this component. 
            // Better: login returns the user or we check user state in useEffect.
            // For now, let's force a reload or check local state if possible.
            // Actually, best pattern is: login() -> succeed -> navigate.
            // But we need to know WHERE to navigate.

            if (email.includes('admin')) {
                navigate('/admin');
            } else if (email.includes('kitchen') || email.includes('chef') || email.includes('waiter')) {
                navigate('/kitchen');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Hoş Geldiniz</h1>
                        <p className="text-muted-foreground">
                            BurgerHub Yönetim Paneli'ne erişmek için giriş yapın.
                        </p>
                        {user && (
                            <div className="bg-yellow-500/10 text-yellow-600 p-3 rounded-md text-sm mt-4 border border-yellow-200">
                                Şu an <span className="font-semibold">{user.email}</span> olarak giriş yapmış durumdasınız.
                                <br />
                                Yönetici değilseniz lütfen tekrar giriş yapın.
                            </div>
                        )}
                    </div>

                    <Card className="border-0 shadow-none sm:border sm:shadow-sm">
                        <CardHeader>
                            <CardTitle>Giriş Yap</CardTitle>
                            <CardDescription>Email ve şifrenizi giriniz</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="admin@burgerhub.com"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Şifre</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            className="pl-9"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Giriş Yap'}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 border-t p-4">
                            <p className="text-xs text-muted-foreground text-center">
                                Erişim sorunu yaşıyorsanız sistem yöneticisi ile iletişime geçin.
                            </p>
                            <div className="bg-muted/50 p-2 rounded text-xs text-center w-full">
                                <p className="font-semibold">Demo Giriş Bilgileri:</p>
                                <p>Email: admin@burgerhub.com</p>
                                <p>Şifre: (Herhangi bir şifre)</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Right Side - Image/Brand */}
            <div className="hidden lg:block relative bg-[#1a1a1a]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="relative h-full flex flex-col items-center justify-center text-white p-12 text-center">
                    <div className="space-y-4 max-w-lg">
                        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
                            <span className="text-4xl">🍔</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight">BurgerHub Yönetim</h2>
                        <p className="text-lg text-white/80">
                            Siparişleri yönetin, menüyü güncelleyin ve işletmenizi büyütün.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
