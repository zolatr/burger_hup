export type OrderStatus = "bekliyor" | "hazirlaniyor" | "yolda" | "teslim";

export interface Order {
  id: number;
  musteri: string;
  urunler: string[];
  tutar: number;
  durum: OrderStatus;
  saat: string;
  kurye: string | null;
  telefon?: string;
  adres?: string;
}

export const mockOrders: Order[] = [
  {
    id: 1,
    musteri: "Ahmet Yılmaz",
    urunler: ["Klasik Burger", "Patates Kızartması", "Coca Cola"],
    tutar: 125,
    durum: "hazirlaniyor",
    saat: "14:30",
    kurye: "Mehmet K.",
    telefon: "0532 123 4567",
    adres: "Atatürk Cad. No:45/3 Kadıköy"
  },
  {
    id: 2,
    musteri: "Zeynep Demir",
    urunler: ["Pizza Margherita", "Ayran"],
    tutar: 89,
    durum: "bekliyor",
    saat: "14:45",
    kurye: null,
    telefon: "0541 987 6543",
    adres: "İstiklal Cad. No:12 Beyoğlu"
  },
  {
    id: 3,
    musteri: "Can Öztürk",
    urunler: ["Tavuk Döner", "Patates", "Fanta"],
    tutar: 95,
    durum: "yolda",
    saat: "13:50",
    kurye: "Ali V.",
    telefon: "0533 456 7890",
    adres: "Bağdat Cad. No:89 Maltepe"
  },
  {
    id: 4,
    musteri: "Ayşe Kaya",
    urunler: ["Lahmacun (3 Adet)", "Ayran (2 Adet)"],
    tutar: 75,
    durum: "teslim",
    saat: "13:15",
    kurye: "Mehmet K.",
    telefon: "0505 234 5678",
    adres: "Cumhuriyet Mah. Sokak No:5"
  },
  {
    id: 5,
    musteri: "Emre Şahin",
    urunler: ["Köfte Ekmek", "Turşu", "Ayran"],
    tutar: 68,
    durum: "bekliyor",
    saat: "14:50",
    kurye: null,
    telefon: "0544 345 6789",
    adres: "Moda Cad. No:67 Kadıköy"
  },
  {
    id: 6,
    musteri: "Fatma Çelik",
    urunler: ["Menemen", "Ekmek", "Çay"],
    tutar: 45,
    durum: "hazirlaniyor",
    saat: "14:35",
    kurye: "Ali V.",
    telefon: "0535 567 8901",
    adres: "Bahariye Cad. No:23 Kadıköy"
  },
  {
    id: 7,
    musteri: "Mehmet Arslan",
    urunler: ["Hamburger Menü", "Extra Sos"],
    tutar: 110,
    durum: "yolda",
    saat: "14:00",
    kurye: "Hasan Y.",
    telefon: "0542 678 9012",
    adres: "Fenerbahçe Mah. No:34"
  },
  {
    id: 8,
    musteri: "Selin Yıldız",
    urunler: ["Caesar Salad", "Su"],
    tutar: 65,
    durum: "bekliyor",
    saat: "14:55",
    kurye: null,
    telefon: "0536 789 0123",
    adres: "Suadiye Mah. No:12"
  }
];

export const kurye = ["Mehmet K.", "Ali V.", "Hasan Y.", "Kemal B."];
