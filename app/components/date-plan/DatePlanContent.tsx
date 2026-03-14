'use client';

import { useState } from 'react';
import { MapPin, Clock, Wallet, Brain, ChevronRight, Navigation, Search, Coffee, UtensilsCrossed, Footprints, Wine, ShoppingBag, Sparkles } from 'lucide-react';
import { MOCK_DATE_PLANS } from '@/app/lib/constants';
import type { DateSpot } from '@/app/lib/types';

// API返却またはモックのプラン型
interface PlanData {
  id: number;
  title: string;
  theme: string;
  totalBudget: string;
  totalTime: string;
  matchScore: number;
  spots: { id: number; name: string; category: string; time: string; duration: string; budget: string; description: string; tip: string; area: string }[];
  aiComment: string;
}

const AREA_OPTIONS = ["渋谷", "恵比寿", "表参道"];

const CATEGORY_ICONS: Record<DateSpot['category'], typeof Coffee> = {
  cafe: Coffee,
  restaurant: UtensilsCrossed,
  activity: Sparkles,
  walk: Footprints,
  bar: Wine,
  shop: ShoppingBag,
};

const CATEGORY_COLORS: Record<DateSpot['category'], string> = {
  cafe: 'text-amber-400 bg-amber-500/10',
  restaurant: 'text-rose-400 bg-rose-500/10',
  activity: 'text-blue-400 bg-blue-500/10',
  walk: 'text-emerald-400 bg-emerald-500/10',
  bar: 'text-purple-400 bg-purple-500/10',
  shop: 'text-pink-400 bg-pink-500/10',
};

export default function DatePlanContent() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [searching, setSearching] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!departure && !destination && !selectedArea) return;

    setSearching(true);
    setError(null);
    setPlans([]);

    try {
      // Google Maps API経由でリアルなスポットを取得
      const res = await fetch('/api/date-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departure: departure || '',
          destination: destination || selectedArea || '',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.plans && data.plans.length > 0) {
          setPlans(data.plans);
          setExpandedPlan(data.plans[0].id);
          setSearching(false);
          return;
        }
      }

      // APIが失敗した場合はモックデータにフォールバック
      fallbackToMock();
    } catch {
      fallbackToMock();
    }
  };

  const fallbackToMock = () => {
    const area = selectedArea || detectArea(departure, destination);
    const results = MOCK_DATE_PLANS[area] ?? MOCK_DATE_PLANS["渋谷"];
    setPlans(results);
    if (results.length > 0) setExpandedPlan(results[0].id);
    setSearching(false);
  };

  const detectArea = (dep: string, dest: string): string => {
    const text = `${dep}${dest}`.toLowerCase();
    if (text.includes('恵比寿') || text.includes('ebisu')) return '恵比寿';
    if (text.includes('表参道') || text.includes('青山') || text.includes('原宿')) return '表参道';
    return '渋谷';
  };

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Navigation size={20} className="text-rose-400" />
          <h2 className="text-xl font-bold text-white">デートコースMAP</h2>
        </div>
        <p className="text-xs text-slate-400">出発地と目的地からAIが最適コースを提案</p>
      </header>

      {/* Input Form */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 mb-6 space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 mb-2 block">出発地</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
            <input
              type="text"
              value={departure}
              onChange={e => setDeparture(e.target.value)}
              placeholder="例: 渋谷駅"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-px h-6 bg-slate-600 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center">
              <ChevronRight size={12} className="text-slate-400 rotate-90" />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 mb-2 block">目的地・エリア</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" />
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="例: 恵比寿、表参道"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Area Quick Select */}
        <div>
          <label className="text-xs font-bold text-slate-400 mb-2 block">エリアから選ぶ</label>
          <div className="flex gap-2">
            {AREA_OPTIONS.map(area => (
              <button
                key={area}
                onClick={() => {
                  setSelectedArea(selectedArea === area ? null : area);
                  setDestination(area);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors border ${
                  selectedArea === area
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-rose-500'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={searching}
          className="w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-600 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-2"
        >
          {searching ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              AI分析中...
            </>
          ) : (
            <>
              <Search size={16} />
              コースを検索
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      {/* Results */}
      {plans.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <Sparkles size={14} className="text-rose-400" />
            おすすめデートコース（{plans.length}件）
          </h3>

          {plans.map(plan => (
            <div key={plan.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
              {/* Plan Header */}
              <button
                onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">{plan.title}</h4>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded text-[10px] font-bold shrink-0 ml-2">
                    相性 {plan.matchScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3">{plan.theme}</p>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Wallet size={12} /> {plan.totalBudget}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock size={12} /> {plan.totalTime}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <MapPin size={12} /> {plan.spots.length}スポット
                  </span>
                </div>
              </button>

              {/* Expanded: Timeline */}
              {expandedPlan === plan.id && (
                <div className="px-5 pb-5 space-y-0">
                  {/* Timeline */}
                  <div className="relative">
                    {plan.spots.map((spot, i) => {
                      const cat = (spot.category as DateSpot['category']) || 'walk';
                      const Icon = CATEGORY_ICONS[cat] ?? Footprints;
                      const colorClass = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS['walk'];
                      const isLast = i === plan.spots.length - 1;

                      return (
                        <div key={spot.id} className="flex gap-4 relative">
                          {/* Timeline Line */}
                          <div className="flex flex-col items-center shrink-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${colorClass} border border-slate-700`}>
                              <Icon size={16} />
                            </div>
                            {!isLast && (
                              <div className="w-px flex-1 bg-slate-700 min-h-[24px]" />
                            )}
                          </div>

                          {/* Spot Card */}
                          <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
                            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="text-sm font-bold text-slate-200">{spot.name}</h5>
                                <span className="text-[10px] text-slate-500 font-mono">{spot.time}</span>
                              </div>
                              <div className="flex gap-3 mb-2">
                                <span className="text-[10px] text-slate-500">{spot.duration}</span>
                                <span className="text-[10px] text-rose-400 font-bold">{spot.budget}</span>
                                <span className="text-[10px] text-slate-500">{spot.area}</span>
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed mb-2">{spot.description}</p>
                              <p className="text-[11px] text-amber-400/90">💡 {spot.tip}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* AI Comment */}
                  <div className="mt-4 bg-slate-900/50 rounded-xl p-4 border border-rose-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain size={14} className="text-rose-400" />
                      <span className="text-xs font-bold text-rose-400">AIコメント</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{plan.aiComment}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
