import { useState } from 'react';
import { MenuItemCard } from './MenuItemCard';
import { Badge } from '@shared/components/ui/badge';
import { Input } from '@shared/components/ui/input';
import { useStore } from '@store/useStore';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

export function MenuSection() {
  const { products, categories, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = products.filter((item) => {
    const matchesCategory = selectedCategory === 'Hepsi' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast.success(`${item.name} sepete eklendi!`);
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Menü</h2>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Burger ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Badge
            variant={selectedCategory === 'Hepsi' ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setSelectedCategory('Hepsi')}
          >
            Hepsi
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aradığınız kriterlere uygun ürün bulunamadı.</p>
        </div>
      )}
    </div>
  );
}
