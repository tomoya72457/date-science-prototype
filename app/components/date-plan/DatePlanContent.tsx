'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, Wallet, Brain, ChevronRight, Navigation, Search, Coffee, UtensilsCrossed, Footprints, Wine, ShoppingBag, Sparkles } from 'lucide-react';
import { MOCK_DATE_PLANS } from '@/app/lib/constants';
import { loadGoogleMaps, geocode, searchNearby, textSearch } from '@/app/lib/google-maps';
import type { PlaceResult } from '@/app/lib/google-maps';
import type { DateSpot } from '@/app/lib/types';

const AREA_OPTIONS = ["渋谷", "恵比寿", "表参道", "新宿", "池袋", "銀座"];

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

// --- ヘルパー関数 ---

function mapCategory(types: string[]): DateSpot['category'] {
  if (types.includes('cafe')) return 'cafe';
  if (types.includes('bar')) return 'bar';
  if (types.includes('restaurant') || types.includes('meal_delivery')) return 'restaurant';
  if (types.includes('park') || types.includes('tourist_attraction')) return 'walk';
  if (types.includes('shopping_mall') || types.includes('store') || types.includes('clothing_store')) return 'shop';
  if (types.includes('museum') || types.includes('art_gallery') || types.includes('movie_theater') || types.includes('amusement_park')) return 'activity';
  return 'walk';
}

function priceToBudget(level?: number): string {
  switch (level) {
    case 0: return '¥0';
    case 1: return '¥500〜1,000';
    case 2: return '¥1,000〜3,000';
    case 3: return '¥3,000〜6,000';
    case 4: return '¥6,000〜';
    default: return '¥1,000〜2,000';
  }
}

function generateTip(category: string): string {
  const tips: Record<string, string[]> = {
    cafe: ['「何飲む？」から自然に好みの話題へ', 'カウンター席があれば並列座りがおすすめ', 'コーヒーの話題でアイスブレイク'],
    restaurant: ['「シェアしよう」で自然な距離感に', 'メニューを一緒に悩む時間が仲を深める', '相手の好みを覚えておくとポイント高い'],
    walk: ['歩きながらだと深い話がしやすい', '景色を共有して自然と距離が縮まる', '「あっち行ってみよう」で冒険感を演出'],
    bar: ['落ち着いた雰囲気で深い話ができる', 'バーテンダーにおすすめを聞くと会話のきっかけに', '2杯目までが心地よい滞在時間'],
    shop: ['「これ似合いそう」で相手への関心を示す', 'ウィンドウショッピングで趣味を探れる', '買い物しなくても歩くだけで会話が弾む'],
    activity: ['共通体験が距離を一気に縮める', '「どれが好き？」で価値観を自然に探れる', '感想を共有するとその後の会話が深まる'],
  };
  const pool = tips[category] ?? tips['walk'];
  return pool[Math.floor(Math.random() * pool.length)];
}

function extractArea(vicinity: string): string {
  const match = vicinity.match(/(東京都)?(.{2,4}[区市町村])/);
  return match ? match[2] : vicinity.split(',')[0]?.trim().slice(0, 10) ?? '';
}

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

function buildCourse(
  id: number,
  title: string,
  theme: string,
  cafe: PlaceResult | undefined,
  attraction: PlaceResult | undefined,
  restaurant: PlaceResult | undefined,
  startHour: number,
  aiComment: string
): PlanData | null {
  const spots: PlanData['spots'] = [];
  let h = startHour;
  let m = 0;

  if (cafe) {
    spots.push({
      id: 1, name: cafe.name, category: mapCategory(cafe.types),
      time: `${h}:${String(m).padStart(2, '0')}`, duration: '45min',
      budget: priceToBudget(cafe.priceLevel),
      description: `評価 ${cafe.rating}/5。${extractArea(cafe.vicinity)}の人気スポット。`,
      tip: generateTip('cafe'), area: extractArea(cafe.vicinity),
    });
    m = 50;
  }

  if (attraction) {
    spots.push({
      id: 2, name: attraction.name, category: mapCategory(attraction.types),
      time: `${h + (m >= 50 ? 1 : 0)}:${String(m >= 50 ? m - 50 : m).padStart(2, '0')}`,
      duration: '60min', budget: priceToBudget(attraction.priceLevel),
      description: `${attraction.rating > 4 ? '高評価！' : ''}${extractArea(attraction.vicinity)}のおすすめスポット。`,
      tip: generateTip(mapCategory(attraction.types)), area: extractArea(attraction.vicinity),
    });
    h += 2; m = 0;
  }

  if (restaurant) {
    spots.push({
      id: 3, name: restaurant.name, category: 'restaurant',
      time: `${h}:${String(m).padStart(2, '0')}`, duration: '90min',
      budget: priceToBudget(restaurant.priceLevel),
      description: `評価 ${restaurant.rating}/5。${extractArea(restaurant.vicinity)}のレストラン。`,
      tip: generateTip('restaurant'), area: extractArea(restaurant.vicinity),
    });
  }

  if (spots.length < 2) return null;

  return {
    id, title, theme,
    totalBudget: spots.length >= 3 ? '¥4,000〜9,000' : '¥2,000〜5,000',
    totalTime: `約${spots.length >= 3 ? 4 : 2.5}時間`,
    matchScore: 85 + Math.floor(Math.random() * 12),
    spots, aiComment,
  };
}

// --- メインコンポーネント ---

export default function DatePlanContent() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [searching, setSearching] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapsReady, setMapsReady] = useState(false);

  useEffect(() => {
    loadGoogleMaps()
      .then(() => {
        console.log('[Maps] Google Maps loaded successfully');
        setMapsReady(true);
      })
      .catch((err) => console.warn('[Maps] Load failed:', err));
  }, []);

  const handleSearch = async () => {
    const dest = destination || selectedArea || '';
    if (!departure && !dest) return;

    setSearching(true);
    setError(null);
    setPlans([]);

    try {
      // Google Maps API の読み込み
      if (!mapsReady) {
        try {
          await loadGoogleMaps();
          setMapsReady(true);
        } catch {
          fallbackToMock(dest || departure);
          return;
        }
      }

      // ジオコーディング
      let destGeo: { lat: number; lng: number; name: string } | null = null;
      let depGeo: { lat: number; lng: number; name: string } | null = null;

      try {
        if (dest) destGeo = await geocode(dest);
        if (departure) depGeo = await geocode(departure);
      } catch (geoErr) {
        console.warn('[Search] Geocode error:', geoErr);
      }

      let centerLat: number, centerLng: number;
      let areaLabel: string;

      if (depGeo && destGeo) {
        centerLat = destGeo.lat;
        centerLng = destGeo.lng;
        areaLabel = `${departure} → ${dest}`;
      } else if (destGeo) {
        centerLat = destGeo.lat;
        centerLng = destGeo.lng;
        areaLabel = dest;
      } else if (depGeo) {
        centerLat = depGeo.lat;
        centerLng = depGeo.lng;
        areaLabel = departure;
      } else {
        fallbackToMock(dest || departure);
        return;
      }

      // 3種類のスポットを並列検索
      const [cafes, restaurants, attractions] = await Promise.all([
        textSearch(`${dest || departure} カフェ`, centerLat, centerLng, 1500),
        textSearch(`${dest || departure} レストラン`, centerLat, centerLng, 1500),
        searchNearby(centerLat, centerLng, 'tourist_attraction', 2000),
      ]);

      console.log(`[Search] Results - cafes: ${cafes.length}, restaurants: ${restaurants.length}, attractions: ${attractions.length}`);

      // 検索結果が0件ならフォールバック
      if (cafes.length === 0 && restaurants.length === 0 && attractions.length === 0) {
        fallbackToMock(dest || departure);
        return;
      }

      const sortedCafes = [...cafes].sort((a, b) => b.rating - a.rating);
      const sortedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating);
      const sortedAttractions = [...attractions].sort((a, b) => b.rating - a.rating);

      const results: PlanData[] = [];

      const plan1 = buildCourse(
        1, `${areaLabel} 王道デートコース`, 'カフェ × 散策 × ディナー',
        sortedCafes[0], sortedAttractions[0], sortedRestaurants[0], 14,
        `${areaLabel}エリアの高評価スポットで構成。カフェでリラックス→散策で距離を縮める→ディナーで深い会話の王道コースです。`
      );
      if (plan1) results.push(plan1);

      const plan2 = buildCourse(
        2, `${areaLabel} 体験重視コース`, 'アクティビティ × カフェ × 早めディナー',
        sortedCafes[1] ?? sortedCafes[0], sortedAttractions[1] ?? sortedAttractions[0], sortedRestaurants[1] ?? sortedRestaurants[0], 13,
        `別のスポットの組み合わせで、共通体験からスタート。初対面で会話が不安な方におすすめです。`
      );
      if (plan2) results.push(plan2);

      if (results.length > 0) {
        setPlans(results);
        setExpandedPlan(results[0].id);
      } else {
        fallbackToMock(dest || departure);
      }
    } catch (err) {
      console.error('[Search] Error:', err);
      fallbackToMock(dest || departure);
    } finally {
      setSearching(false);
    }
  };

  const fallbackToMock = (searchTerm: string) => {
    const area = selectedArea || detectArea(searchTerm);
    const areaLabel = departure && (destination || selectedArea)
      ? `${departure} → ${destination || selectedArea}`
      : searchTerm;
    const mockResults = MOCK_DATE_PLANS[area] ?? MOCK_DATE_PLANS["渋谷"];
    const results: PlanData[] = mockResults.map(p => ({
      ...p,
      title: p.title.replace(/^.+?(エリア|コース)/, `${areaLabel}エリア`),
      spots: p.spots.map(s => ({ ...s, category: s.category as string })),
    }));
    setPlans(results);
    if (results.length > 0) setExpandedPlan(results[0].id);
    setSearching(false);
    setError('サンプルデータで表示しています');
  };

  const detectArea = (text: string): string => {
    if (text.includes('恵比寿')) return '恵比寿';
    if (text.includes('表参道') || text.includes('青山') || text.includes('原宿')) return '表参道';
    if (text.includes('新宿')) return '新宿';
    if (text.includes('池袋')) return '池袋';
    if (text.includes('銀座') || text.includes('有楽町')) return '銀座';
    return '渋谷';
  };

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Navigation size={20} className="text-rose-400" />
          <h2 className="text-xl font-bold text-white">デートコースMAP</h2>
        </div>
        <p className="text-xs text-slate-400">出発地と目的地から実在スポットでコースを自動生成</p>
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
              placeholder="例: 渋谷駅、自由が丘"
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
              onChange={e => { setDestination(e.target.value); setSelectedArea(null); }}
              placeholder="例: 恵比寿、横浜みなとみらい"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Area Quick Select */}
        <div>
          <label className="text-xs font-bold text-slate-400 mb-2 block">エリアから選ぶ</label>
          <div className="flex flex-wrap gap-2">
            {AREA_OPTIONS.map(area => (
              <button
                key={area}
                onClick={() => {
                  const next = selectedArea === area ? null : area;
                  setSelectedArea(next);
                  if (next) setDestination(next);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
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
          disabled={searching || (!departure && !destination && !selectedArea)}
          className="w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-600 disabled:text-slate-400 rounded-xl text-white font-bold transition-colors flex items-center justify-center gap-2"
        >
          {searching ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              周辺スポットを検索中...
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
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4">
          <p className="text-xs text-amber-400">{error}</p>
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
                  <div className="relative">
                    {plan.spots.map((spot, i) => {
                      const cat = (spot.category as DateSpot['category']) || 'walk';
                      const Icon = CATEGORY_ICONS[cat] ?? Footprints;
                      const colorClass = CATEGORY_COLORS[cat] ?? CATEGORY_COLORS['walk'];
                      const isLast = i === plan.spots.length - 1;

                      return (
                        <div key={spot.id} className="flex gap-4 relative">
                          <div className="flex flex-col items-center shrink-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${colorClass} border border-slate-700`}>
                              <Icon size={16} />
                            </div>
                            {!isLast && <div className="w-px flex-1 bg-slate-700 min-h-[24px]" />}
                          </div>
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
