import { Card, CardContent } from '@shared/components/ui/card';
import { Truck, Leaf, Tag, Star } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Hızlı Teslimat',
    description: '30-45 dakikada kapınızda, sıcacık ve taze',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'Taze Malzemeler',
    description: 'Günlük taze ürünler, katkısız ve doğal',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Tag,
    title: 'Kampanyalar',
    description: 'Özel indirimler ve avantajlı fırsatlar',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Star,
    title: 'Puanlama Sistemi',
    description: 'Deneyiminizi değerlendirin, kazanın',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Neden BurgerHub?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Müşterilerimize en iyi hizmeti sunmak için çalışıyoruz
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="card-hover border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
