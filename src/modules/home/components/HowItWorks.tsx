import { Card, CardContent } from '@shared/components/ui/card';
import { Menu, ShoppingCart, CreditCard, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: Menu,
    title: 'Menüden Seç',
    description: 'Geniş menümüzden istediğiniz burgerleri seçin',
    number: '01',
  },
  {
    icon: ShoppingCart,
    title: 'Sepete Ekle',
    description: 'Ürünleri sepetinize ekleyin ve özelleştirin',
    number: '02',
  },
  {
    icon: CreditCard,
    title: 'Adres ve Ödeme',
    description: 'Teslimat adresinizi ve ödeme yöntemini seçin',
    number: '03',
  },
  {
    icon: PackageCheck,
    title: 'Kapınızda',
    description: 'Siparişiniz 30-45 dakikada kapınızda',
    number: '04',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            4 basit adımda lezzetli burgerler kapınızda
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary opacity-20" />

          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <Card className="border-0 shadow-lg card-hover">
                <CardContent className="p-6 text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  <div className="mt-6 mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <div className="w-px h-8 bg-primary/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
