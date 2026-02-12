import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shared/components/ui/dialog';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@shared/components/ui/radio-group';
import { Card, CardContent } from '@shared/components/ui/card';
import { Separator } from '@shared/components/ui/separator';
import { useStore, Order } from '@store/useStore';
import { formatCurrency } from '@shared/lib/utils';
import { MapPin, CreditCard, Wallet, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
}

export function CheckoutModal({ open, onOpenChange, total }: CheckoutModalProps) {
  const { clearCart, cart, addOrder, user } = useStore();
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [isProcessing, setIsProcessing] = useState(false);

  // Address form
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [lastOrderId, setLastOrderId] = useState('');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && district) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      items: [...cart], // Copy items
      total: total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      customerName: user?.name,
      userId: user?.id,
      // address: `${address}, ${district}, ${city}` // Store doesn't have address field yet, but we can add later.
    };

    addOrder(newOrder);
    setLastOrderId(newOrder.id);

    setStep('success');
    setIsProcessing(false);

    // Clear cart after 3 seconds
    setTimeout(() => {
      clearCart();
      onOpenChange(false);
      setStep('address');
      toast.success('Siparişiniz alındı!');
    }, 5000);
  };

  const resetAndClose = () => {
    setStep('address');
    setAddress('');
    setDistrict('');
    setPaymentMethod('card');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 'address' && 'Teslimat Adresi'}
            {step === 'payment' && 'Ödeme Yöntemi'}
            {step === 'success' && 'Sipariş Alındı!'}
          </DialogTitle>
        </DialogHeader>

        {/* Address Step */}
        {step === 'address' && (
          <form onSubmit={handleAddressSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="district">İlçe</Label>
              <Input
                id="district"
                placeholder="Kadıköy"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                placeholder="Mahalle, Sokak, No: ..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Şehir</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Toplam Tutar</span>
              <span className="font-bold text-lg">{formatCurrency(total)}</span>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Ödeme Adımına Geç
            </Button>
          </form>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <Card className="border-0 bg-muted">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div className="text-sm">
                    <div className="font-medium">{district}, {city}</div>
                    <div className="text-muted-foreground">{address}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Label>Ödeme Yöntemi</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5" />
                        <span>Kredi/Banka Kartı</span>
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Wallet className="w-5 h-5" />
                        <span>Kapıda Nakit Ödeme</span>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 border rounded-lg">
                <Input placeholder="Kart Üzerindeki İsim" />
                <Input placeholder="Kart Numarası" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="AA/YY" />
                  <Input placeholder="CVV" />
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ürünler</span>
                <span>{cart.length} ürün</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Toplam</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep('address')}
                disabled={isProcessing}
              >
                Geri
              </Button>
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    İşleniyor...
                  </>
                ) : (
                  'Siparişi Onayla'
                )}
              </Button>
            </div>
          </form>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Siparişiniz Alındı!</h3>
              <p className="text-muted-foreground">
                Siparişiniz hazırlanıyor. Tahmini teslimat süresi 30-45 dakika.
              </p>
            </div>

            <Card className="border-0 bg-muted">
              <CardContent className="p-4 space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sipariş Numarası</span>
                  <span className="font-medium">#{lastOrderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Teslimat Adresi</span>
                  <span className="font-medium text-right">{district}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Toplam</span>
                  <span className="font-bold text-primary">{formatCurrency(total)}</span>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Bu pencere otomatik olarak kapanacak...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
