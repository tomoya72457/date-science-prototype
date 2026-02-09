import { MOCK_USER } from '@/app/lib/constants';
import RadarChart from '../shared/RadarChart';
import CoachingCard from './CoachingCard';
import GrowthChart from './GrowthChart';

export default function AssetContent() {
  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">恋愛偏差値データ</h2>
        <p className="text-xs text-slate-400">蓄積されたあなたの「資産」</p>
      </header>

      {/* Radar Chart Section */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-200 text-sm">現在のパラメータ</h3>
          <span className="px-2 py-1 bg-slate-700 text-[10px] text-slate-300 rounded">最終更新: 今日</span>
        </div>
        <RadarChart stats={MOCK_USER.stats} />
      </div>

      <CoachingCard />
      <GrowthChart />
    </div>
  );
}
