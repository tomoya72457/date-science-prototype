'use client';

import { useState } from 'react';
import { BarChart3, Brain, TrendingUp, AlertCircle, Rocket, CalendarClock } from 'lucide-react';
import { MOCK_MONTHLY_REVIEWS, RELATIONSHIP_LABELS } from '@/app/lib/constants';
import RadarChart from '../shared/RadarChart';
import MonthSelector from './MonthSelector';

export default function MonthlyReviewContent() {
  const months = MOCK_MONTHLY_REVIEWS.map(r => r.month);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const review = MOCK_MONTHLY_REVIEWS.find(r => r.month === selectedMonth);

  if (!review) return null;

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={20} className="text-blue-400" />
          <h2 className="text-xl font-bold text-white">月次レビュー</h2>
        </div>
        <p className="text-xs text-slate-400">毎月の関係性を総合的に振り返る</p>
      </header>

      <MonthSelector months={months} selected={selectedMonth} onSelect={setSelectedMonth} />

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 mb-6 text-center">
        <p className="text-xs text-slate-400 mb-2">総合スコア</p>
        <div className="text-5xl font-bold text-white mb-2">{review.overallScore}</div>
        <div className="text-xs text-slate-500">/ 100</div>
      </div>

      {/* 6-Axis Radar */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <h3 className="font-bold text-slate-200 text-sm mb-4">6軸関係性スコア</h3>
        <RadarChart
          stats={review.relationshipScores}
          labels={RELATIONSHIP_LABELS}
          colorFrom="from-blue-600"
          colorTo="to-blue-400"
        />
      </div>

      {/* Highlights */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-emerald-400" />
          <h3 className="font-bold text-emerald-400 text-sm">ハイライト</h3>
        </div>
        <ul className="space-y-2">
          {review.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Challenges */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={16} className="text-amber-400" />
          <h3 className="font-bold text-amber-400 text-sm">課題</h3>
        </div>
        <ul className="space-y-2">
          {review.challenges.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="text-amber-400 mt-0.5">!</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* AI Summary */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} className="text-rose-400" />
          <h3 className="font-bold text-rose-400 text-sm">AI要約</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{review.aiSummary}</p>
      </div>

      {/* Next Actions */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Rocket size={16} className="text-rose-400" />
          <h3 className="font-bold text-rose-400 text-sm">ネクストアクション</h3>
        </div>
        <div className="space-y-3">
          {review.nextActions.map((action) => {
            const priorityStyles = {
              high: 'border-l-rose-500 bg-rose-500/5',
              medium: 'border-l-amber-500 bg-amber-500/5',
              low: 'border-l-blue-500 bg-blue-500/5',
            };
            const priorityLabels = { high: '最優先', medium: '推奨', low: '余裕があれば' };
            const priorityColors = { high: 'text-rose-400 bg-rose-500/10', medium: 'text-amber-400 bg-amber-500/10', low: 'text-blue-400 bg-blue-500/10' };

            return (
              <div key={action.id} className={`rounded-xl p-4 border-l-4 border border-slate-700/50 ${priorityStyles[action.priority]}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-bold text-white leading-snug">{action.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shrink-0 ${priorityColors[action.priority]}`}>
                    {priorityLabels[action.priority]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{action.description}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <CalendarClock size={12} />
                    {action.deadline}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-400">
                    {action.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
