import { Card, CardContent, CardFooter, CardHeader } from '@shared/components/ui/card';
import { Button } from '@shared/components/ui/button';
import { Badge } from '@shared/components/ui/badge';
import { MenuItem } from '../types/types';
import { formatCurrency } from '@shared/lib/utils';
import { Plus, Flame } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden card-hover border-0 shadow-md h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
        {item.isFeatured && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground border-0">
            <Flame className="w-3 h-3 mr-1" />
            Popüler
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(item.price)}
          </span>
          {item.calories && (
            <span className="text-xs text-muted-foreground">
              {item.calories} kcal
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => onAddToCart(item)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  );
}
