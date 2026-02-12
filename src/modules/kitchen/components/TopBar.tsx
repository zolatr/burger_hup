import { useState } from "react";
import { Badge } from "@shared/components/ui/badge";
import { Bell, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@home/contexts/AuthContext";
import { ProfileDialog } from "../../../components/profile/ProfileDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";

interface QuickStats {
  gunluk: number;
  aktif: number;
  bekleyen: number;
}

interface TopBarProps {
  stats: QuickStats;
}

export function TopBar({ stats }: TopBarProps) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="border-b border-neutral-800 bg-[#161616] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFB703] to-[#FB8500]">
              <span className="text-xl font-bold text-black">K</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Kanban Orders</h1>
              <p className="text-xs text-neutral-400">Sipariş Yönetim Paneli</p>
            </div>
          </div>
        </div>

        {/* Middle - Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2">
            <span className="text-xs text-neutral-400">Günlük:</span>
            <Badge variant="secondary" className="bg-[#FFB703] text-black font-semibold">
              {stats.gunluk}
            </Badge>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2">
            <span className="text-xs text-neutral-400">Aktif:</span>
            <Badge variant="secondary" className="bg-blue-500 text-white font-semibold">
              {stats.aktif}
            </Badge>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-2">
            <span className="text-xs text-neutral-400">Bekleyen:</span>
            <Badge variant="secondary" className="bg-red-500 text-white font-semibold">
              {stats.bekleyen}
            </Badge>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-[#161616] border-neutral-800 text-neutral-200">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium text-white">{user?.name || 'Personel'}</span>
                  <span className="text-xs text-neutral-400">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem
                onSelect={() => setProfileOpen(true)}
                className="focus:bg-neutral-800 focus:text-white cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem onClick={logout} className="text-red-500 focus:bg-neutral-800 focus:text-red-400 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
        </div>
      </div>
    </div>
  );
}
