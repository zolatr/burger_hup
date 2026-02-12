import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
    stock?: number;
    calories?: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    role: 'admin' | 'customer' | 'chef' | 'waiter' | 'courier';
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    createdAt: string;
    customerName?: string;
    customerPhone?: string;
    customerAddress?: string;
    userId?: string;
    tableId?: string;
    courier?: string;
}

export interface Campaign {
    id: string;
    baslik: string;
    aciklama: string;
    indirim: number;
    baslangic: string;
    bitis: string;
    aktif: boolean;
}

interface AppState {
    products: Product[];
    orders: Order[];
    categories: string[];
    cart: CartItem[];
    user: User | null;

    // Actions
    addProduct: (product: Product) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    addOrder: (order: Order) => void;
    updateOrder: (id: string, updates: Partial<Order>) => void;
    updateOrderStatus: (id: string, status: Order['status']) => void;

    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;

    // Categories
    addCategory: (category: string) => void;
    deleteCategory: (category: string) => void;

    // Campaigns
    campaigns: Campaign[];
    addCampaign: (campaign: Campaign) => void;
    updateCampaign: (id: string, updates: Partial<Campaign>) => void;
    deleteCampaign: (id: string) => void;

    // User
    setUser: (user: User | null) => void;

    // Initial Data Loader
    initializeStore: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            products: [],
            orders: [],
            categories: ["Hamburgerler", "Yan Ürünler", "İçecekler", "Tatlılar"],
            campaigns: [],
            cart: [],

            user: null,

            addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
            updateProduct: (id, updates) => set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
            })),
            deleteProduct: (id) => set((state) => ({
                products: state.products.filter(p => p.id !== id)
            })),

            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
            updateOrder: (id, updates) => set((state) => ({
                orders: state.orders.map(o => o.id === id ? { ...o, ...updates } : o)
            })),
            updateOrderStatus: (id, status) => set((state) => ({
                orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
            })),

            addToCart: (product) => set((state) => {
                const existing = state.cart.find(item => item.id === product.id);
                if (existing) {
                    return {
                        cart: state.cart.map(item =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        )
                    };
                }
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }),
            removeFromCart: (id) => set((state) => ({
                cart: state.cart.filter(item => item.id !== id)
            })),
            updateCartQuantity: (id, quantity) => set((state) => ({
                cart: state.cart.map(item => item.id === id ? { ...item, quantity } : item)
            })),
            clearCart: () => set({ cart: [] }),
            setUser: (user) => set({ user }),

            addCategory: (category) => set((state) => ({
                categories: [...state.categories, category]
            })),
            deleteCategory: (category) => set((state) => ({
                categories: state.categories.filter((c) => c !== category)
            })),

            addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
            updateCampaign: (id, updates) => set((state) => ({
                campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
            })),
            deleteCampaign: (id) => set((state) => ({
                campaigns: state.campaigns.filter(c => c.id !== id)
            })),

            initializeStore: () => {
                const state = get();
                if (state.products.length === 0) {
                    set({
                        products: [
                            {
                                id: "1",
                                name: "Klasik Burger",
                                description: "Sığır köfte, marul, domates, soğan, turşu, özel sos",
                                price: 85,
                                category: "Hamburgerler",
                                image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
                                available: true,
                                stock: 50
                            },
                            {
                                id: "2",
                                name: "Çift Burger",
                                description: "İki kat sığır köfte, cheddar peyniri, barbekü sos",
                                price: 120,
                                category: "Hamburgerler",
                                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
                                available: true,
                                stock: 30
                            },
                            {
                                id: "7",
                                name: "Patates Kızartması",
                                description: "Çıtır patates kızartması, özel baharatlar",
                                price: 35,
                                category: "Yan Ürünler",
                                image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
                                available: true,
                                stock: 100
                            },
                            {
                                id: "11",
                                name: "Kola",
                                description: "500ml soğuk kola",
                                price: 20,
                                category: "İçecekler",
                                image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop",
                                available: true,
                                stock: 200
                            }
                        ]
                    })
                }
            }
        }),
        {
            name: 'burger-hub-storage',
        }
    )
);
