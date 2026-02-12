import { useState } from 'react';
import { useAuth } from '@home/contexts/AuthContext';
import { useStore } from '@store/useStore';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Separator } from '@shared/components/ui/separator';
import { toast } from 'sonner';
import { Loader2, User as UserIcon, Camera, LogOut } from 'lucide-react';

export function AdminProfilePage() {
    const { user, logout } = useAuth();
    const { setUser } = useStore();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    // Email is usually read-only in profile edits unless there's a specific flow
    const email = user?.email || '';

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 800));

            if (user) {
                setUser({
                    ...user,
                    name,
                    phone,
                });
                toast.success('Profil bilgileri güncellendi');
            }
        } catch (error) {
            toast.error('Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">Profil Yönetimi</h1>
                <p className="text-muted-foreground">
                    Hesap bilgilerinizi ve tercihlerinizi yönetin.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Kişisel Bilgiler</CardTitle>
                    <CardDescription>
                        Admin paneli için kullandığınız kimlik bilgileri.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative group cursor-pointer">
                                <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center border-4 border-background shadow-sm overflow-hidden">
                                    <UserIcon className="w-16 h-16 text-muted-foreground" />
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                                    {user?.role === 'admin' ? 'Yönetici' : user?.role}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="flex-1 space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Adresi</Label>
                                <Input id="email" value={email} disabled className="bg-muted" />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Email adresi güvenlik nedeniyle değiştirilemez.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Ad Soyad</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Adınız Soyadınız"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Telefon</Label>
                                <Input
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+90 ___ ___ ____"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Değişiklikleri Kaydet
                                </Button>
                            </div>
                        </form>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-destructive">Tehlikeli Bölge</h3>
                        <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                            <div>
                                <div className="font-medium text-destructive">Oturumu Kapat</div>
                                <div className="text-sm text-muted-foreground">
                                    Admin panelinden güvenli bir şekilde çıkış yapın.
                                </div>
                            </div>
                            <Button variant="destructive" size="sm" onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Çıkış Yap
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
