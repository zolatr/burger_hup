import { menuItems } from '../data/menu';
import { Button } from '@shared/components/ui/button';
import { Card, CardContent, CardFooter } from '@shared/components/ui/card';
import { Badge } from '@shared/components/ui/badge';
import { formatCurrency } from '@shared/lib/utils';
import { Flame } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { toast } from 'sonner';

interface MenuPreviewProps {
  onViewAllClick: () => void;
}

export function MenuPreview({ onViewAllClick }: MenuPreviewProps) {
  const featuredItems = menuItems.filter((item) => item.isFeatured).slice(0, 3);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({ ...item, available: true });
    toast.success(`${item.name} sepete eklendi`);
  };

  return (
    <section id="menu-preview" className="py-20 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            En Popüler Ürünler
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Menümüzü Keşfedin
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En çok sevilen burgerlerimizi keşfedin. Her biri özenle hazırlanmış, taze malzemelerle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden card-hover border-0 shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground border-0">
                  <Flame className="w-3 h-3 mr-1" />
                  Popüler
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(item.price)}
                  </span>
                  {item.calories && (
                    <span className="text-sm text-muted-foreground">
                      {item.calories} kcal
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full" onClick={() => handleAddToCart(item)}>
                  Sepete Ekle
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" onClick={onViewAllClick}>
            Tüm Menüyü Gör
          </Button>
        </div>
      </div>
    </section>
  );
}
