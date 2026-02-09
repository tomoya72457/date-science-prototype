'use client';

import Link from 'next/link';
import { User, Activity, ClipboardCheck, Search } from 'lucide-react';
import { MOCK_USER } from '@/app/lib/constants';
import StatsCard from './StatsCard';
import ActionCard from './ActionCard';

export default function DashboardContent() {
  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono tracking-tight">DateScience</h1>
          <p className="text-xs text-rose-400 font-bold tracking-wide">恋愛のパーソナルジム</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center overflow-hidden">
          <User size={20} className="text-slate-300" />
        </div>
      </header>

      <StatsCard user={MOCK_USER} />

      <h3 className="text-sm font-bold text-slate-300 mb-3 px-1">次のアクション</h3>
      <div className="space-y-3">
        <ActionCard
          href="/review"
          title="デートの振り返り評価"
          description="ユキさんとのデート評価を入力してください"
          icon={ClipboardCheck}
          iconBgColor="bg-rose-500/20"
          iconColor="text-rose-400"
          borderColor="border-l-4 border-rose-500"
        />

        <ActionCard
          href="/matching"
          title="相性の良い相手が見つかりました"
          description="相性94%のユーザーが新たに登録されました"
          icon={Search}
          iconBgColor="bg-emerald-500/20"
          iconColor="text-emerald-400"
          borderColor="border border-slate-700"
        />
      </div>
    </div>
  );
}
