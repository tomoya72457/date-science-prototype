'use client';

import Link from 'next/link';
import { Activity } from 'lucide-react';
import type { User } from '@/app/lib/types';

interface StatsCardProps {
  user: User;
}

export default function StatsCard({ user }: StatsCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl mb-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-rose-500/20 transition-all duration-500"></div>
      <div className="flex justify-between items-end mb-4 relative z-10">
        <div>
          <p className="text-slate-400 text-xs mb-1 font-bold">現在の会員ランク</p>
          <div className="text-5xl font-bold text-white tracking-tighter drop-shadow-lg">{user.grade}</div>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs mb-1 font-bold">マッチング率</p>
          <div className="text-xl font-bold text-rose-400">12% <span className="text-xs text-slate-500 ml-1">↗ +2.4%</span></div>
        </div>
      </div>
      
      <div className="bg-slate-950/40 rounded-lg p-3 border border-slate-700/50 mb-4 backdrop-blur-sm">
        <p className="text-xs text-slate-300 mb-2 font-bold flex items-center gap-2">
          <Activity size={14} className="text-rose-500" />
          AI分析レポート
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          先週のデータから、論理的会話の比率が最適化されています。次は「感情への共感」を意識するとAランクへ昇格可能です。
        </p>
      </div>

      <Link 
        href="/asset"
        className="block w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-white transition-colors border border-slate-600 text-center"
      >
        自分の恋愛偏差値を見る
      </Link>
    </div>
  );
}
