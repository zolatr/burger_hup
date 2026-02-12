import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';
import { Minus, Plus, Trash2, Tag, ShoppingBag } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export function CartSection() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const deliveryFee = total > 100 ? 0 : 15;
  const finalTotal = total + deliveryFee - discount;

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toUpperCase() === 'YENIUYE25') {
      setDiscount(total * 0.25);
    } else if (promoCode.toUpperCase() === 'HAFTAICI15') {
      setDiscount(total * 0.15);
    } else {
      setDiscount(0);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Sepetiniz Boş</h3>
            <p className="text-muted-foreground text-center">
              Menüden lezzetli burgerler ekleyerek başlayın!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6">Sepetim</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {formatCurrency(item.price)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="border-0 shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>Sipariş Özeti</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ara Toplam</span>
                  <span className="font-medium">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Teslimat Ücreti</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Ücretsiz' : formatCurrency(deliveryFee)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>İndirim</span>
                    <span className="font-medium">-{formatCurrency(discount)}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Toplam</span>
                <span className="text-primary">{formatCurrency(finalTotal)}</span>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Promosyon Kodu"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" onClick={applyPromoCode}>
                    Uygula
                  </Button>
                </div>
                {total < 100 && (
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(100 - total)} daha ekleyin, ücretsiz teslimat kazanın!
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full" size="lg" onClick={() => setCheckoutOpen(true)}>
                Siparişi Tamamla
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        total={finalTotal}
      />
    </div>
  );
}
