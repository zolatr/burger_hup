import { Testimonial } from '../types/types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    rating: 5,
    text: 'En taze burgerleri buradan yiyorum. Teslimat da çok hızlı, her zaman zamanında gelir. Cheddar Deluxe favorim!',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    date: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Zeynep Kaya',
    rating: 5,
    text: 'Veggie burger çok lezzetli, vegetaryan seçenekleri harika. Ailece sipariş veriyoruz, herkese tavsiye ederim.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Mehmet Demir',
    rating: 4,
    text: 'Fiyat-performans oranı çok iyi. Kampanyaları takip ediyorum, sürekli indirimler var. Öğrenci bütçesine uygun!',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    date: new Date('2024-01-08'),
  },
  {
    id: '4',
    name: 'Ayşe Öztürk',
    rating: 5,
    text: 'Müşteri hizmeti mükemmel, her zaman yardımcı oluyorlar. Burgerler her seferinde aynı kalitede geliyor.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    date: new Date('2024-01-05'),
  },
];
