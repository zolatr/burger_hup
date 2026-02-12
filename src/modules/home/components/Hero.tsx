import { Button } from '@shared/components/ui/button';
import { Badge } from '@shared/components/ui/badge';
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
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#F5A623]/90 md:bg-gradient-to-r md:from-[#FF9F0A] md:to-[#FF9F0A]/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-0 px-4 py-1.5 text-sm font-normal rounded-full">
              🔥 Yeni Menü Ürünlerimizi Keşfedin
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#1a1a1a] mb-6 leading-tight tracking-tight">
              BurgerHub,
              <br />
              <span className="text-white drop-shadow-md">En Taze Burgerler</span>
              <br />
              Kapınızda
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
              30-45 dakikada lezzetli, taze malzemelerle hazırlanmış burgerler. Her ısırıkta kalite ve lezzet garantisi.
            </p>

            <div className="flex flex-row gap-4 justify-center lg:justify-start mb-12 w-full sm:w-auto">
              <Button
                size="lg"
                className="flex-1 sm:flex-none h-14 px-8 bg-[#1a1a1a] hover:bg-black text-white border-0 text-base font-semibold"
                onClick={onOrderClick}
              >
                Sipariş Ver
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 sm:flex-none h-14 px-8 bg-white/20 border-white/40 text-white hover:bg-white/30 text-base font-semibold backdrop-blur-sm"
                onClick={scrollToMenu}
              >
                Menüyü İncele
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start items-center">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#FF9F0A]" />
                </div>
                <span className="text-sm font-semibold text-white">
                  1000+ Mutlu Müşteri
                </span>
              </div>

              <div className="flex items-center gap-2 text-white">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-300 text-yellow-300 drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-sm font-semibold">4.9/5 Puan</span>
              </div>

              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">30-45 dk Teslimat</span>
              </div>
            </div>
          </div>

          {/* Right Image (Hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop"
                alt="Delicious Burger"
                className="w-full h-auto rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
              />

              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="text-4xl font-black text-[#FF9F0A] text-center">%25</div>
                <div className="text-sm font-bold text-gray-600 text-center uppercase tracking-wider">İndirim</div>
              </div>
            </div>

            {/* Decorative blurry blobs behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
