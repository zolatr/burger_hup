import { useState } from "react";
import { Plus, Trash2, Tag } from "lucide-react";
import { useStore } from "@store/useStore";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@shared/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shared/components/ui/table";
import { Badge } from "@shared/components/ui/badge";

export function CategoryManager() {
    const { categories, addCategory, deleteCategory } = useStore();
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory(newCategory.trim());
            setNewCategory("");
        }
    };

    const handleDeleteCategory = (category: string) => {
        if (confirm(`"${category}" kategorisini silmek istediğinize emin misiniz?`)) {
            deleteCategory(category);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Kategori Yönetimi</h1>
                <p className="text-muted-foreground">
                    Menü kategorilerini buradan ekleyip çıkarabilirsiniz.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-fit">
                    <CardHeader>
                        <CardTitle>Yeni Kategori Ekle</CardTitle>
                        <CardDescription>
                            Menüye eklemek istediğiniz yeni kategori ismini giriniz.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Örn: Salatalar"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAddCategory();
                                }}
                            />
                            <Button onClick={handleAddCategory}>
                                <Plus className="mr-2 size-4" />
                                Ekle
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Mevcut Kategoriler</CardTitle>
                        <CardDescription>
                            Toplam {categories.length} kategori bulunuyor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Kategori Adı</TableHead>
                                        <TableHead className="text-right">İşlemler</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-center h-24 text-muted-foreground">
                                                Henüz hiç kategori eklenmemiş.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        categories.map((category) => (
                                            <TableRow key={category}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Tag className="size-4 text-muted-foreground" />
                                                        {category}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDeleteCategory(category)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
