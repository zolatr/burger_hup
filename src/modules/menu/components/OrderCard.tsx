import { Order } from "@menu/types/types"
import { Card, CardContent, CardHeader } from "@shared/components/ui/card"
import { Badge } from "@shared/components/ui/badge"
import { Progress } from "@shared/components/ui/progress"
import { Clock, Package, Truck, CheckCircle2 } from "lucide-react"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
      case "preparing":
        return "bg-orange-500"
      case "ready":
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProgressValue = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return 10
      case "preparing":
        return 33
      case "ready":
        return 66
      case "delivered":
        return 100
      default:
        return 0
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">Sipariş #{order.id}</h3>
            <p className="text-sm text-muted-foreground">
              {formatDate(new Date(order.createdAt))}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>Hazırlanıyor</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>Hazır</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              <span>Teslim Edildi</span>
            </div>
          </div>
          <Progress value={getProgressValue(order.status)} className="h-2" />
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Ürünler</h4>
          <div className="text-sm text-muted-foreground">
            {order.items.map((item, index) => (
              <div key={index}>
                {item.quantity}x {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>30-45 dk</span>
          </div>
          <div className="text-lg font-semibold">{order.total.toFixed(2)} ₺</div>
        </div>
      </CardContent>
    </Card>
  )
}
