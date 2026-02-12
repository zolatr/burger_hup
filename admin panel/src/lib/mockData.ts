// Mock data for Hamburger Delivery Admin Panel

export interface DashboardStats {
  gunlukSiparis: { value: number; trend: number };
  gunlukCiro: { value: number; trend: number };
  ortalamaSepet: { value: number; trend: number };
  aktifSiparisler: { value: number; trend: number };
  enCokSatan: { value: string; count: number };
  bekleyenSiparisler: { value: number; trend: number };
}

export const mockDashboardStats: DashboardStats = {
  gunlukSiparis: { value: 145, trend: 12 },
  gunlukCiro: { value: 12450, trend: 8 },
  ortalamaSepet: { value: 85.5, trend: -2 },
  aktifSiparisler: { value: 23, trend: 5 },
  enCokSatan: { value: "Klasik Burger", count: 34 },
  bekleyenSiparisler: { value: 7, trend: -15 },
};

export interface Product {
  id: number;
  ad: string;
  fiyat: number;
  kategori: string;
  stok: boolean;
  aciklama: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    ad: "Klasik Burger",
    fiyat: 45,
    kategori: "Burger",
    stok: true,
    aciklama: "Sade ve lezzetli",
  },
  {
    id: 2,
    ad: "Çift Katlı Burger",
    fiyat: 65,
    kategori: "Burger",
    stok: true,
    aciklama: "İki kat et",
  },
  {
    id: 3,
    ad: "BBQ Burger",
    fiyat: 55,
    kategori: "Burger",
    stok: true,
    aciklama: "BBQ soslu",
  },
  {
    id: 4,
    ad: "Patates Kızartması",
    fiyat: 25,
    kategori: "Yan Ürün",
    stok: true,
    aciklama: "Çıtır patates",
  },
  {
    id: 5,
    ad: "Soğan Halkası",
    fiyat: 28,
    kategori: "Yan Ürün",
    stok: false,
    aciklama: "Stokta yok",
  },
  {
    id: 6,
    ad: "Coca Cola",
    fiyat: 15,
    kategori: "İçecek",
    stok: true,
    aciklama: "330ml",
  },
];

export interface Order {
  id: number;
  musteri: string;
  toplam: number;
  durum: "Hazırlanıyor" | "Yolda" | "Teslim Edildi" | "Bekliyor";
  tarih: string;
  urunler: string[];
}

export const mockOrders: Order[] = [
  {
    id: 1001,
    musteri: "Ahmet Yılmaz",
    toplam: 120,
    durum: "Hazırlanıyor",
    tarih: "2024-01-15 14:30",
    urunler: ["Klasik Burger", "Patates", "Cola"],
  },
  {
    id: 1002,
    musteri: "Ayşe Demir",
    toplam: 95,
    durum: "Yolda",
    tarih: "2024-01-15 14:15",
    urunler: ["BBQ Burger", "Cola"],
  },
  {
    id: 1003,
    musteri: "Mehmet Kaya",
    toplam: 175,
    durum: "Bekliyor",
    tarih: "2024-01-15 14:45",
    urunler: ["Çift Katlı Burger x2", "Soğan Halkası", "Cola x2"],
  },
  {
    id: 1004,
    musteri: "Zeynep Aydın",
    toplam: 85,
    durum: "Teslim Edildi",
    tarih: "2024-01-15 13:20",
    urunler: ["Klasik Burger", "Patates"],
  },
  {
    id: 1005,
    musteri: "Can Özdemir",
    toplam: 145,
    durum: "Hazırlanıyor",
    tarih: "2024-01-15 14:50",
    urunler: ["BBQ Burger", "Çift Katlı Burger", "Cola"],
  },
];

export interface Campaign {
  id: number;
  baslik: string;
  indirim: number;
  baslangic: string;
  bitis: string;
  aktif: boolean;
}

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    baslik: "Hafta Sonu İndirimi",
    indirim: 20,
    baslangic: "2024-01-13",
    bitis: "2024-01-15",
    aktif: true,
  },
  {
    id: 2,
    baslik: "İkinci Ürüne %50",
    indirim: 50,
    baslangic: "2024-01-10",
    bitis: "2024-01-20",
    aktif: true,
  },
  {
    id: 3,
    baslik: "Yılbaşı Kampanyası",
    indirim: 25,
    baslangic: "2024-01-01",
    bitis: "2024-01-07",
    aktif: false,
  },
];

export interface User {
  id: number;
  ad: string;
  email: string;
  rol: "Admin" | "Personel" | "Kurye";
  kayitTarihi: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    ad: "Emre Yılmaz",
    email: "emre@burger.com",
    rol: "Admin",
    kayitTarihi: "2023-01-15",
  },
  {
    id: 2,
    ad: "Selin Kaya",
    email: "selin@burger.com",
    rol: "Personel",
    kayitTarihi: "2023-03-20",
  },
  {
    id: 3,
    ad: "Burak Demir",
    email: "burak@burger.com",
    rol: "Kurye",
    kayitTarihi: "2023-06-10",
  },
  {
    id: 4,
    ad: "Deniz Aydın",
    email: "deniz@burger.com",
    rol: "Kurye",
    kayitTarihi: "2023-08-05",
  },
];

// Chart data
export const gunlukSatisData = [
  { gun: "Pzt", satis: 8500 },
  { gun: "Sal", satis: 9200 },
  { gun: "Çar", satis: 11300 },
  { gun: "Per", satis: 10800 },
  { gun: "Cum", satis: 14500 },
  { gun: "Cmt", satis: 16200 },
  { gun: "Paz", satis: 15800 },
];

export const urunBazliSatisData = [
  { urun: "Klasik", miktar: 145 },
  { urun: "BBQ", miktar: 98 },
  { urun: "Çift Katlı", miktar: 76 },
  { urun: "Patates", miktar: 203 },
  { urun: "İçecek", miktar: 267 },
];

export const saatlikYogunlukData = [
  { saat: "11:00", siparis: 12 },
  { saat: "12:00", siparis: 28 },
  { saat: "13:00", siparis: 45 },
  { saat: "14:00", siparis: 38 },
  { saat: "15:00", siparis: 22 },
  { saat: "18:00", siparis: 35 },
  { saat: "19:00", siparis: 52 },
  { saat: "20:00", siparis: 48 },
  { saat: "21:00", siparis: 31 },
];
