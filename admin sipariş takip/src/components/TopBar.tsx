import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User } from "lucide-react";

interface QuickStats {
  gunluk: number;
  aktif: number;
  bekleyen: number;
}

interface TopBarProps {
  stats: QuickStats;
}

export function TopBar({ stats }: TopBarProps) {
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
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
            <Settings className="h-5 w-5" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
