export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  calories: number
  image: string
  category: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export type OrderStatus = "Hazırlanıyor" | "Yolda" | "Teslim Edildi"

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: OrderStatus
  createdAt: Date
  estimatedTime: string
}
