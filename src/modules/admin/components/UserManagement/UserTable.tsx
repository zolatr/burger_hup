import { useState } from "react";
import { Pencil, Trash2, Plus, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/ui/card";
import { mockUsers, User } from "@shared/lib/mockData";

const roleColors = {
  Admin: "bg-red-500/10 text-red-500 border-red-500/20",
  Personel: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Kurye: "bg-green-500/10 text-green-500 border-green-500/20",
};

export function UserTable() {
  const [users] = useState<User[]>(mockUsers);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
          <p className="text-muted-foreground">
            Sistem kullanıcılarını görüntüleyin ve yönetin
          </p>
        </div>
        <Button>
          <UserPlus className="size-4 mr-2" />
          Yeni Kullanıcı Ekle
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Kullanıcılar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Soyad</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.ad}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.rol]}>{user.rol}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.kayitTarihi}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
