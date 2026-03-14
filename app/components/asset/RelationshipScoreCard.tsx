'use client';

import { MOCK_RELATIONSHIP_SCORES, RELATIONSHIP_LABELS } from '@/app/lib/constants';
import RadarChart from '../shared/RadarChart';

export default function RelationshipScoreCard() {
  const avg = Math.round(
    Object.values(MOCK_RELATIONSHIP_SCORES).reduce((a, b) => a + b, 0) /
    Object.values(MOCK_RELATIONSHIP_SCORES).length
  );

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-200 text-sm">6軸関係性スコア</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-emerald-400">{avg}</span>
          <span className="text-[10px] text-slate-400">総合</span>
        </div>
      </div>
      <RadarChart
        stats={MOCK_RELATIONSHIP_SCORES}
        labels={RELATIONSHIP_LABELS}
        colorFrom="from-emerald-600"
        colorTo="to-emerald-400"
      />
    </div>
  );
}
