import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs"
import { Button } from "@shared/components/ui/button"
import { Card, CardContent, CardHeader } from "@shared/components/ui/card"
import { Separator } from "@shared/components/ui/separator"
import { Badge } from "@shared/components/ui/badge"
import { MenuCard } from "@menu/components/MenuCard"
import { CartItem as CartItemComponent } from "@menu/components/CartItem"
import { CheckoutModal } from "@menu/components/CheckoutModal"
import { OrderCard } from "@menu/components/OrderCard"
import { MenuItem, Order } from "@menu/types/types"
import { useStore } from "@store/useStore"
import { ShoppingCart, Package } from "lucide-react"
import { Toaster } from "sonner"
import { toast } from "sonner"

function App() {
  const {
    cart,
    orders,
    products,
    categories,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    addOrder
  } = useStore()

  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMenu = useMemo(() => {
    let items = products;

    // Category filter
    if (selectedCategory !== "Tümü") {
      items = items.filter((item) => item.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    }

    return items;
  }, [selectedCategory, products, searchQuery])

  const cartTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [cart])

  const deliveryCost = cartTotal > 150 ? 0 : cartTotal > 0 ? 20 : 0
  const total = cartTotal + deliveryCost

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
    toast.success(`${item.name} sepete eklendi`)
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return
    updateCartQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    const item = cart.find((item) => item.id === id)
    removeFromCart(id)
    if (item) {
      toast.success(`${item.name} sepetten çıkarıldı`)
    }
  }

  const handlePlaceOrder = (paymentMethod: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      items: [...cart],
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
      // estimatedTime: "30-45 dakika", // Store types don't have this yet, maybe add to store or ignore
    }
    // Type assertion for now to match StoreOrder if strictly needed, or update StoreOrder type
    // StoreOrder has optional fields, let's assume compat or update StoreOrder
    addOrder({
      ...newOrder,
      customerName: "Misafir", // Default
      tableId: "1", // Default
    })
    clearCart()
    toast.success("Siparişiniz alındı! Hazırlanıyor...")
  }

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-2xl">
              🍔
            </div>
            <div>
              <h1 className="text-xl font-bold">BurgerHub</h1>
              <p className="text-xs text-muted-foreground">Lezzet Durağınız</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            <ShoppingCart className="mr-1 h-4 w-4" />
            {cartItemCount} Ürün
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menü</TabsTrigger>
            <TabsTrigger value="cart">
              Sepet
              {cartItemCount > 0 && (
                <Badge className="ml-2 h-5 min-w-[20px] rounded-full px-1 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders">Siparişlerim</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">

            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <Button
                  key="Tümü"
                  variant={selectedCategory === "Tümü" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("Tümü")}
                  className="shrink-0"
                >
                  Tümü
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMenu.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </TabsContent>

          {/* Cart Tab */}
          <TabsContent value="cart" className="space-y-4">
            {cart.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">Sepetiniz boş</h3>
                  <p className="text-sm text-muted-foreground">
                    Menüden ürün ekleyerek başlayın
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Sipariş Özeti</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>{cartTotal.toFixed(2)} ₺</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Teslimat</span>
                        <span className={deliveryCost === 0 && cartTotal > 0 ? "text-green-600" : ""}>
                          {deliveryCost === 0 && cartTotal > 0 ? "Ücretsiz" : `${deliveryCost.toFixed(2)} ₺`}
                        </span>
                      </div>
                      {cartTotal > 0 && cartTotal < 150 && (
                        <p className="text-xs text-muted-foreground">
                          150 ₺ ve üzeri siparişlerde teslimat ücretsiz
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Toplam</span>
                      <span>{total.toFixed(2)} ₺</span>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setCheckoutOpen(true)}
                    >
                      Sipariş Ver
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Package className="mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">
                    Henüz siparişiniz yok
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    İlk siparişinizi vererek başlayın
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        onConfirm={handlePlaceOrder}
        total={total}
      />
    </div>
  )
}

export default App
