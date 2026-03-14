import Link from 'next/link';
import { CalendarCheck, BarChart3, Shield, MapPinned, ChevronRight } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/checkin', icon: CalendarCheck, label: 'チェックイン', color: 'text-emerald-400 bg-emerald-500/20' },
  { href: '/monthly-review', icon: BarChart3, label: '月次レビュー', color: 'text-blue-400 bg-blue-500/20' },
  { href: '/risk', icon: Shield, label: 'リスク検知', color: 'text-amber-400 bg-amber-500/20' },
];

export default function QuickAccessSection() {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-300 mb-3 px-1">クイックアクセス</h3>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {QUICK_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex flex-col items-center gap-2 hover:bg-slate-750 transition-colors"
          >
            <div className={`p-2 rounded-lg ${link.color}`}>
              <link.icon size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-300">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* コースMAP - 横長バナー型 */}
      <Link
        href="/date-plan"
        className="block bg-slate-800 rounded-xl p-4 border border-slate-700 hover:bg-slate-750 transition-colors overflow-hidden relative"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-700/80 flex items-center justify-center shrink-0">
            <MapPinned size={24} className="text-rose-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-white text-sm">コースMAP</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">エリア別デートコースを探す</p>
          </div>
          <ChevronRight size={20} className="text-slate-500 shrink-0" />
        </div>
        {/* 地図風の装飾ライン */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
      </Link>
    </div>
  );
}
