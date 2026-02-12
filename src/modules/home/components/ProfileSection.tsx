import { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '@store/useStore';
import { User, MapPin, Phone, Mail, Package, Heart, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileSection() {
    const { user } = useAuth();
    const { setUser } = useStore();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            if (user) {
                setUser({ ...user, name, phone, address });
                toast.success('Bilgileriniz güncellendi');
            }
        } catch (error) {
            toast.error('Güncelleme başarısız');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
            {/* Sidebar / Quick Stats */}
            <div className="space-y-6">
                <Card>
                    <CardHeader className="text-center">
                        <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <User className="w-12 h-12 text-primary" />
                        </div>
                        <CardTitle>{user?.name}</CardTitle>
                        <CardDescription>{user?.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                            <Package className="w-4 h-4" />
                            <span>Sipariş Geçmişim</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                            <MapPin className="w-4 h-4" />
                            <span>Adreslerim</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                            <CreditCard className="w-4 h-4" />
                            <span>Ödeme Yöntemlerim</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                            <Heart className="w-4 h-4" />
                            <span>Favorilerim</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Form */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Genel Bilgiler</CardTitle>
                        <CardDescription>Kişisel bilgilerinizi buradan güncelleyebilirsiniz.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Ad Soyad</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={user?.email} disabled className="bg-muted" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefon</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="phone" className="pl-9" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Adres</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="address" className="pl-9" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Varsayılan teslimat adresi" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Güvenlik</CardTitle>
                        <CardDescription>Şifrenizi ve güvenlik ayarlarınızı yönetin.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline">Şifre Değiştir</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
