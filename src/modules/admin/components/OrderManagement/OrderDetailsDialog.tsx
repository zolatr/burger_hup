import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@shared/components/ui/dialog";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { Separator } from "@shared/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shared/components/ui/select";
import { ScrollArea } from "@shared/components/ui/scroll-area";
import { Order, useStore } from "@store/useStore";
import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface OrderDetailsDialogProps {
    order: Order;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const statusLabelMap: Record<string, string> = {
    pending: "Bekliyor",
    preparing: "Hazırlanıyor",
    ready: "Hazır",
    delivered: "Teslim Edildi",
    cancelled: "İptal",
};

const statusColors: Record<string, string> = {
    preparing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ready: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function OrderDetailsDialog({
    order,
    open,
    onOpenChange,
}: OrderDetailsDialogProps) {
    const updateOrderStatus = useStore((state) => state.updateOrderStatus);
    const [status, setStatus] = useState<Order["status"]>(order.status);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus as Order["status"]);
        updateOrderStatus(order.id, newStatus as Order["status"]);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md sm:max-w-xl">
                <DialogHeader>
                    <div className="flex items-center justify-between pr-8">
                        <DialogTitle className="text-xl">Sipariş Detayı #{order.id}</DialogTitle>
                        <Badge
                            className={statusColors[status] || "bg-gray-500/10 text-gray-500"}
                        >
                            {statusLabelMap[status] || status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {format(new Date(order.createdAt), "d MMMM yyyy HH:mm", {
                            locale: tr,
                        })}
                    </p>
                </DialogHeader>

                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <h3 className="font-semibold">Müşteri Bilgileri</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground">Ad Soyad:</span>
                                <p className="font-medium">{order.customerName || "Misafir"}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Telefon:</span>
                                <p className="font-medium">{order.customerPhone || "-"}</p>
                            </div>
                            <div className="col-span-2">
                                <span className="text-muted-foreground">Adres:</span>
                                <p className="font-medium">{order.customerAddress || "Teslimat adresi belirtilmemiş"}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-2">
                        <h3 className="font-semibold">Sipariş İçeriği</h3>
                        <ScrollArea className="h-[200px] rounded-md border p-4">
                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium">
                                                {item.quantity}x {item.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            ₺{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="flex items-center justify-between font-semibold">
                        <span>Toplam Tutar</span>
                        <span className="text-lg">₺{order.total.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="grid gap-2">
                        <h3 className="font-semibold">Sipariş Durumu</h3>
                        <Select value={status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Durum seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Bekliyor</SelectItem>
                                <SelectItem value="preparing">Hazırlanıyor</SelectItem>
                                <SelectItem value="ready">Hazır</SelectItem>
                                <SelectItem value="delivered">Teslim Edildi</SelectItem>
                                <SelectItem value="cancelled">İptal Edildi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Kapat
                    </Button>
                    <Button onClick={() => onOpenChange(false)}>Kaydet</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
