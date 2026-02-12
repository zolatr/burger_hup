import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Clock, Users } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onMenuClick: () => void;
}

const scrollToMenu = () => {
  const menuSection = document.querySelector('#menu-preview');
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export function Hero({ onOrderClick, onMenuClick }: HeroProps) {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-secondary-foreground border-0">
              🔥 Yeni Menü Ürünlerimizi Keşfedin
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              BurgerHub,
              <br />
              <span className="text-white">En Taze Burgerler</span>
              <br />
              Kapınızda
            </h1>
            
            <p className="text-lg sm:text-xl text-secondary-foreground/90 mb-8 max-w-xl mx-auto lg:mx-0">
              30-45 dakikada lezzetli, taze malzemelerle hazırlanmış burgerler. Her ısırıkta kalite ve lezzet garantisi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8 bg-secondary hover:bg-secondary/90 text-white"
                onClick={onOrderClick}
              >
                Sipariş Ver
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8 bg-white/10 backdrop-blur-sm border-white/20 text-secondary-foreground hover:bg-white/20"
                onClick={scrollToMenu}
              >
                Menüyü İncele
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <span className="text-sm font-medium text-secondary-foreground">
                  1000+ Mutlu Müşteri
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-secondary-foreground">
                  4.9/5 Puan
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary-foreground" />
                <span className="text-sm font-medium text-secondary-foreground">
                  30-45 dk Teslimat
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop"
                alt="Delicious Burger"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-bold">%25</div>
                <div className="text-sm">İndirim</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
