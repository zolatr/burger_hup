import { Button } from "../components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
            <h1 className="mb-2 text-9xl font-extrabold tracking-tight text-primary">
                404
            </h1>
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Sayfa Bulunamadı
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <Button onClick={() => navigate("/")} size="lg" className="gap-2">
                <Home className="h-4 w-4" />
                Anasayfaya Dön
            </Button>
        </div>
    );
}
