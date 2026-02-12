import { MenuItem } from "@menu/types/types"

export const menuItems: MenuItem[] = [
  // Hamburgerler
  {
    id: "1",
    name: "Klasik Burger",
    description: "Sığır köfte, marul, domates, soğan, turşu, özel sos",
    price: 85,
    calories: 650,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "Hamburgerler",
    available: true
  },
  {
    id: "2",
    name: "Çift Burger",
    description: "İki kat sığır köfte, cheddar peyniri, barbekü sos",
    price: 120,
    calories: 900,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    category: "Hamburgerler",
    available: true
  },
  {
    id: "3",
    name: "Tavuk Burger",
    description: "Izgara tavuk göğsü, marul, domates, ranch sos",
    price: 75,
    calories: 550,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    category: "Hamburgerler",
    available: true
  },
  {
    id: "4",
    name: "Vejetaryen Burger",
    description: "Sebze köfte, karamelize soğan, avokado, özel sos",
    price: 70,
    calories: 480,
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop",
    category: "Hamburgerler",
    available: true
  },
  {
    id: "5",
    name: "Mantarlı Burger",
    description: "Sığır köfte, portobello mantarı, İsviçre peyniri",
    price: 95,
    calories: 720,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "Hamburgerler",
    available: true
  },
  {
    id: "6",
    name: "Acılı Burger",
    description: "Baharatlı köfte, jalapeno, acı sos, cheddar",
    price: 90,
    calories: 680,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    category: "Hamburgerler",
    available: true
  },

  // Yan Ürünler
  {
    id: "7",
    name: "Patates Kızartması",
    description: "Çıtır patates kızartması, özel baharatlar",
    price: 35,
    calories: 380,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    category: "Yan Ürünler",
    available: true
  },
  {
    id: "8",
    name: "Soğan Halkası",
    description: "Çıtır soğan halkaları, ranch sos",
    price: 40,
    calories: 420,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop",
    category: "Yan Ürünler",
    available: true
  },
  {
    id: "9",
    name: "Nugget",
    description: "6 adet çıtır tavuk nugget",
    price: 45,
    calories: 350,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop",
    category: "Yan Ürünler",
    available: true
  },
  {
    id: "10",
    name: "Mozzarella Stick",
    description: "5 adet mozzarella çubukları, marinara sos",
    price: 50,
    calories: 450,
    image: "https://images.unsplash.com/photo-1548340177-8e2d13b1e9d3?w=400&h=300&fit=crop",
    category: "Yan Ürünler",
    available: true
  },

  // İçecekler
  {
    id: "11",
    name: "Kola",
    description: "500ml soğuk kola",
    price: 20,
    calories: 210,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop",
    category: "İçecekler",
    available: true
  },
  {
    id: "12",
    name: "Ayran",
    description: "250ml ev yapımı ayran",
    price: 15,
    calories: 80,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
    category: "İçecekler",
    available: true
  },
  {
    id: "13",
    name: "Limonata",
    description: "Taze sıkılmış limon, 400ml",
    price: 25,
    calories: 120,
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f?w=400&h=300&fit=crop",
    category: "İçecekler",
    available: true
  },
  {
    id: "14",
    name: "Milkshake",
    description: "Çikolata, vanilya veya çilek, 400ml",
    price: 40,
    calories: 380,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
    category: "İçecekler",
    available: true
  }
]

export const categories = ["Tümü", "Hamburgerler", "Yan Ürünler", "İçecekler"]
