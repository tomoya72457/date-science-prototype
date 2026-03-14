'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, BarChart3 } from 'lucide-react';
import { MOCK_USER } from '@/app/lib/constants';
import RadarChart from '../shared/RadarChart';
import CoachingCard from './CoachingCard';
import GrowthChart from './GrowthChart';
import RelationshipScoreCard from './RelationshipScoreCard';

export default function AssetContent() {
  const [activeTab, setActiveTab] = useState<'stats' | 'relationship'>('stats');

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">恋愛偏差値データ</h2>
        <p className="text-xs text-slate-400">蓄積されたあなたの「資産」</p>
      </header>

      {/* Tab Switcher */}
      <div className="flex bg-slate-800 rounded-lg p-1 mb-6 border border-slate-700">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'stats' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          5パラメータ
        </button>
        <button
          onClick={() => setActiveTab('relationship')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${
            activeTab === 'relationship' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          6軸関係性
        </button>
      </div>

      {activeTab === 'stats' ? (
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-200 text-sm">現在のパラメータ</h3>
            <span className="px-2 py-1 bg-slate-700 text-[10px] text-slate-300 rounded">最終更新: 今日</span>
          </div>
          <RadarChart stats={MOCK_USER.stats} />
        </div>
      ) : (
        <RelationshipScoreCard />
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link href="/checkin" className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3 hover:bg-slate-750 transition-colors">
          <CalendarCheck size={18} className="text-emerald-400" />
          <span className="text-xs font-bold text-slate-300">チェックイン</span>
        </Link>
        <Link href="/monthly-review" className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3 hover:bg-slate-750 transition-colors">
          <BarChart3 size={18} className="text-blue-400" />
          <span className="text-xs font-bold text-slate-300">月次レビュー</span>
        </Link>
      </div>

      <CoachingCard />
      <GrowthChart />
    </div>
  );
}
