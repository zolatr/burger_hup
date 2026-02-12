import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function PlaceholderPage({
  title,
  description,
  icon: Icon,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Icon className="size-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Bu sayfa henüz geliştirilme aşamasında.
            <br />
            Yakında burada içerik göreceksiniz.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
