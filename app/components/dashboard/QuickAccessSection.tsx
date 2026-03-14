import Link from 'next/link';
import { CalendarCheck, BarChart3, Shield } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/checkin', icon: CalendarCheck, label: 'チェックイン', color: 'text-emerald-400 bg-emerald-500/20' },
  { href: '/monthly-review', icon: BarChart3, label: '月次レビュー', color: 'text-blue-400 bg-blue-500/20' },
  { href: '/risk', icon: Shield, label: 'リスク検知', color: 'text-amber-400 bg-amber-500/20' },
];

export default function QuickAccessSection() {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-300 mb-3 px-1">クイックアクセス</h3>
      <div className="grid grid-cols-3 gap-3">
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
    </div>
  );
}
