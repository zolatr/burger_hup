import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/components/ui/dialog';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { useAuth } from '@home/contexts/AuthContext';
import { useStore } from '@store/useStore';
import { Loader2, User as UserIcon, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
    const { user } = useAuth();
    const { setUser } = useStore();
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');

    // Update effect when user changes (e.g. on open)
    // In a real app we might use useEffect, but simple init is fine for now

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
                    address
                });
                toast.success('Profil bilgileri güncellendi');
                onOpenChange(false);
            }
        } catch (error) {
            toast.error('Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Profil Bilgileri</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSave} className="space-y-6 pt-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center border-2 border-border overflow-hidden">
                                <UserIcon className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium">{roleLabel(user?.role)}</p>
                            <p className="text-xs text-muted-foreground">ID: {user?.id}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Ad Soyad</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Adınız Soyadınız"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                disabled
                                className="bg-muted"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+90 ___ ___ ____"
                            />
                        </div>

                        {user?.role === 'customer' && (
                            <div className="space-y-2">
                                <Label htmlFor="address">Adres</Label>
                                <Input
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Adresiniz"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Kaydet
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function roleLabel(role?: string) {
    switch (role) {
        case 'admin': return 'Yönetici';
        case 'chef': return 'Mutfak Şefi';
        case 'waiter': return 'Garson';
        case 'courier': return 'Kurye';
        default: return 'Müşteri';
    }
}
