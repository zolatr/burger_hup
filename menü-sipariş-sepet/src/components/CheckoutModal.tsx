import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, Banknote, DollarSign } from "lucide-react"

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (paymentMethod: string) => void
  total: number
}

export function CheckoutModal({
  open,
  onOpenChange,
  onConfirm,
  total,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const handleConfirm = () => {
    onConfirm(paymentMethod)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Siparişi Tamamla</DialogTitle>
          <DialogDescription>
            Ödeme yönteminizi seçin ve siparişinizi onaylayın
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Teslimat Adresi</h4>
            <div className="rounded-lg border bg-muted/50 p-3 text-sm">
              <p className="font-medium">Ev Adresim</p>
              <p className="text-muted-foreground">
                Atatürk Cad. No: 123, Kadıköy, İstanbul
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Ödeme Yöntemi</h4>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label
                  htmlFor="credit-card"
                  className="flex flex-1 cursor-pointer items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Kredi Kartı</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50">
                <RadioGroupItem value="debit-card" id="debit-card" />
                <Label
                  htmlFor="debit-card"
                  className="flex flex-1 cursor-pointer items-center gap-2"
                >
                  <Banknote className="h-4 w-4" />
                  <span>Banka Kartı</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label
                  htmlFor="wallet"
                  className="flex flex-1 cursor-pointer items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Online Cüzdan</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50">
                <RadioGroupItem value="cash" id="cash" />
                <Label
                  htmlFor="cash"
                  className="flex flex-1 cursor-pointer items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  <span>Kapıda Ödeme</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="rounded-lg border bg-primary/10 p-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Toplam Tutar</span>
              <span>{total.toFixed(2)} ₺</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            İptal
          </Button>
          <Button onClick={handleConfirm}>Siparişi Onayla</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
