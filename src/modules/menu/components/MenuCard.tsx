import { MenuItem } from "@menu/types/types"
import { Card, CardContent, CardFooter, CardHeader } from "@shared/components/ui/card"
import { Button } from "@shared/components/ui/button"
import { Badge } from "@shared/components/ui/badge"
import { Plus } from "lucide-react"

interface MenuCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{item.name}</h3>
          <Badge variant="secondary" className="shrink-0">
            {item.calories} kcal
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardHeader>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="text-2xl font-bold">{item.price} ₺</div>
        <Button onClick={() => onAddToCart(item)} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  )
}
