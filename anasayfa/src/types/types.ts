export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  calories?: number;
  isFeatured?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Address {
  id: string;
  title: string;
  fullAddress: string;
  city: string;
  district: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery?: Date;
  rating?: number;
  review?: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validUntil: Date;
  image?: string;
  minOrderAmount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  photo?: string;
  date: Date;
}
