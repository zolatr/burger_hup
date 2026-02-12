import { Campaign } from '../types/types';

export const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Yeni Üye İndirimi',
    description: 'İlk siparişinize özel %25 indirim!',
    discount: 25,
    code: 'YENIUYE25',
    validUntil: new Date('2024-12-31'),
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&h=400&fit=crop',
    minOrderAmount: 50,
  },
  {
    id: '2',
    title: '2 Al 1 Öde',
    description: 'Burgerlerde 2 al 1 öde kampanyası!',
    discount: 50,
    code: '2AL1ODE',
    validUntil: new Date('2024-06-30'),
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&h=400&fit=crop',
    minOrderAmount: 100,
  },
  {
    id: '3',
    title: 'Hafta İçi Özel',
    description: 'Pazartesi-Cuma arası %15 indirim',
    discount: 15,
    code: 'HAFTAICI15',
    validUntil: new Date('2024-12-31'),
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=400&fit=crop',
  },
];
