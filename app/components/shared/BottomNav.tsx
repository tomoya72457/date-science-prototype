'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Search, BookOpen, ClipboardCheck, User, LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', icon: Activity, label: 'ホーム' },
  { href: '/matching', icon: Search, label: 'さがす' },
  { href: '/knowledge', icon: BookOpen, label: 'ナレッジ' },
  { href: '/review', icon: ClipboardCheck, label: '振り返り' },
  { href: '/asset', icon: User, label: 'データ' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-900 border-t border-slate-800 flex justify-between items-center px-4 pb-safe absolute bottom-0 w-full z-50 h-[72px]">
      {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${isActive ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'
              }`}
          >
            <Icon size={22} className="mb-1" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-tight">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
