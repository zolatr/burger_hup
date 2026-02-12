import { useState, useEffect } from 'react';
import { Card, CardContent } from '@shared/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@shared/components/ui/avatar';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Binlerce mutlu müşterimizin yorumları
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 sm:p-12">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-6 ring-4 ring-primary/20">
                  <AvatarImage src={currentTestimonial.photo} alt={currentTestimonial.name} />
                  <AvatarFallback>{currentTestimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < currentTestimonial.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>

                <p className="text-lg sm:text-xl text-foreground mb-6 leading-relaxed">
                  "{currentTestimonial.text}"
                </p>

                <div>
                  <div className="font-bold text-lg">{currentTestimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentTestimonial.date.toLocaleDateString('tr-TR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === currentIndex
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted-foreground/30'
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
