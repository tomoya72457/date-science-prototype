import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

// ジオコーディング
async function geocode(address: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&language=ja&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    const name = data.results[0].formatted_address;
    return { lat: loc.lat, lng: loc.lng, name };
  }
  return null;
}

// 周辺検索
interface NearbyPlace {
  name: string;
  vicinity: string;
  rating: number;
  types: string[];
  priceLevel?: number;
  placeId: string;
  lat: number;
  lng: number;
}

async function searchNearby(lat: number, lng: number, type: string, radius = 800): Promise<NearbyPlace[]> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK') {
    return data.results.slice(0, 5).map((p: Record<string, unknown>) => ({
      name: p.name as string,
      vicinity: p.vicinity as string,
      rating: (p.rating as number) ?? 0,
      types: (p.types as string[]) ?? [],
      priceLevel: p.price_level as number | undefined,
      placeId: p.place_id as string,
      lat: (p.geometry as { location: { lat: number; lng: number } }).location.lat,
      lng: (p.geometry as { location: { lat: number; lng: number } }).location.lng,
    }));
  }
  return [];
}

// 価格レベルを予算テキストに変換
function priceLevelToBudget(level?: number): string {
  switch (level) {
    case 0: return '¥0';
    case 1: return '¥500〜1,000';
    case 2: return '¥1,000〜3,000';
    case 3: return '¥3,000〜6,000';
    case 4: return '¥6,000〜';
    default: return '¥1,000〜2,000';
  }
}

// カテゴリマッピング
function mapCategory(types: string[]): string {
  if (types.includes('cafe')) return 'cafe';
  if (types.includes('bar')) return 'bar';
  if (types.includes('restaurant') || types.includes('meal_delivery') || types.includes('meal_takeaway')) return 'restaurant';
  if (types.includes('park') || types.includes('tourist_attraction')) return 'walk';
  if (types.includes('shopping_mall') || types.includes('store') || types.includes('clothing_store')) return 'shop';
  if (types.includes('museum') || types.includes('art_gallery') || types.includes('movie_theater') || types.includes('amusement_park')) return 'activity';
  return 'walk';
}

// デートに適したTipを生成
function generateTip(category: string, name: string): string {
  const tips: Record<string, string[]> = {
    cafe: [
      '「何飲む？」から自然に好みの話題へ',
      'カウンター席があれば並列座りがおすすめ',
      'コーヒーの話題でアイスブレイク',
    ],
    restaurant: [
      '「シェアしよう」で自然な距離感に',
      'メニューを一緒に悩む時間が仲を深める',
      '相手の好みを覚えておくとポイント高い',
    ],
    walk: [
      '歩きながらだと深い話がしやすい',
      '景色を共有することで自然と距離が縮まる',
      '「あっち行ってみよう」で冒険感を演出',
    ],
    bar: [
      '落ち着いた雰囲気で深い話ができる',
      'バーテンダーにおすすめを聞くと会話のきっかけに',
      '2杯目までが心地よい滞在時間',
    ],
    shop: [
      '「これ似合いそう」で相手への関心を示す',
      'ウィンドウショッピングで趣味嗜好を探れる',
      '買い物しなくても歩くだけで会話が弾む',
    ],
    activity: [
      '共通体験が二人の距離を一気に縮める',
      '「どれが好き？」で価値観を自然に探れる',
      '感想を共有するとその後の会話が深まる',
    ],
  };
  const pool = tips[category] ?? tips['walk'];
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function POST(req: NextRequest) {
  try {
    const { departure, destination } = await req.json();

    if (!departure && !destination) {
      return NextResponse.json({ error: '出発地または目的地を入力してください' }, { status: 400 });
    }

    // 中間地点を計算するため両方ジオコーディング
    const depGeo = departure ? await geocode(departure) : null;
    const destGeo = destination ? await geocode(destination) : null;

    // 検索の中心を決定
    let centerLat: number, centerLng: number;
    let areaName: string;

    if (depGeo && destGeo) {
      centerLat = (depGeo.lat + destGeo.lat) / 2;
      centerLng = (depGeo.lng + destGeo.lng) / 2;
      areaName = `${departure} → ${destination}`;
    } else if (destGeo) {
      centerLat = destGeo.lat;
      centerLng = destGeo.lng;
      areaName = destination;
    } else if (depGeo) {
      centerLat = depGeo.lat;
      centerLng = depGeo.lng;
      areaName = departure;
    } else {
      return NextResponse.json({ error: '場所が見つかりませんでした' }, { status: 400 });
    }

    // 並列で3タイプのスポットを検索
    const [cafes, restaurants, attractions] = await Promise.all([
      searchNearby(centerLat, centerLng, 'cafe', 1000),
      searchNearby(centerLat, centerLng, 'restaurant', 1000),
      searchNearby(centerLat, centerLng, 'tourist_attraction', 1500),
    ]);

    // コース1: カフェ → 散策 → ディナー（定番コース）
    const course1Spots = [];
    let timeHour = 14;
    let timeMin = 0;

    const bestCafe = [...cafes].sort((a: NearbyPlace, b: NearbyPlace) => b.rating - a.rating)[0];
    if (bestCafe) {
      course1Spots.push({
        id: 1, name: bestCafe.name, category: mapCategory(bestCafe.types),
        time: `${timeHour}:${String(timeMin).padStart(2, '0')}`, duration: '45min',
        budget: priceLevelToBudget(bestCafe.priceLevel), description: `${bestCafe.vicinity}。評価${bestCafe.rating}の人気スポット。`,
        tip: generateTip('cafe', bestCafe.name), area: bestCafe.vicinity?.split(',')[0] ?? ''
      });
      timeHour = 14; timeMin = 50;
    }

    const bestAttraction = [...attractions].sort((a: NearbyPlace, b: NearbyPlace) => b.rating - a.rating)[0];
    if (bestAttraction) {
      course1Spots.push({
        id: 2, name: bestAttraction.name, category: mapCategory(bestAttraction.types),
        time: `${timeHour}:${String(timeMin).padStart(2, '0')}`, duration: '60min',
        budget: priceLevelToBudget(bestAttraction.priceLevel), description: `${bestAttraction.vicinity}。${bestAttraction.rating > 4 ? '高評価の' : ''}おすすめスポット。`,
        tip: generateTip(mapCategory(bestAttraction.types), bestAttraction.name), area: bestAttraction.vicinity?.split(',')[0] ?? ''
      });
      timeHour = 16; timeMin = 0;
    }

    const bestRestaurant = [...restaurants].sort((a: NearbyPlace, b: NearbyPlace) => b.rating - a.rating)[0];
    if (bestRestaurant) {
      course1Spots.push({
        id: 3, name: bestRestaurant.name, category: 'restaurant',
        time: `${timeHour}:${String(timeMin).padStart(2, '0')}`, duration: '90min',
        budget: priceLevelToBudget(bestRestaurant.priceLevel), description: `${bestRestaurant.vicinity}。評価${bestRestaurant.rating}のレストラン。`,
        tip: generateTip('restaurant', bestRestaurant.name), area: bestRestaurant.vicinity?.split(',')[0] ?? ''
      });
    }

    // コース2: アクティビティ重視
    const course2Spots = [];
    timeHour = 13; timeMin = 0;

    const secondAttraction = [...attractions].sort((a: NearbyPlace, b: NearbyPlace) => b.rating - a.rating)[1] ?? bestAttraction;
    if (secondAttraction) {
      course2Spots.push({
        id: 1, name: secondAttraction.name, category: mapCategory(secondAttraction.types),
        time: `${timeHour}:${String(timeMin).padStart(2, '0')}`, duration: '60min',
        budget: priceLevelToBudget(secondAttraction.priceLevel), description: `${secondAttraction.vicinity}。まずは体験を共有してアイスブレイク。`,
        tip: generateTip('activity', secondAttraction.name), area: secondAttraction.vicinity?.split(',')[0] ?? ''
      });
      timeHour = 14; timeMin = 15;
    }

    const secondCafe = [...cafes].sort((a: NearbyPlace, b: NearbyPlace) => b.rating - a.rating)[1] ?? bestCafe;
    if (secondCafe) {
      course2Spots.push({
        id: 2, name: secondCafe.name, category: mapCategory(secondCafe.types),
        time: `${timeHour}:${String(timeMin).padStart(2, '0')}`, duration: '45min',
        budget: priceLevelToBudget(secondCafe.priceLevel), description: `${secondCafe.vicinity}。体験の感想を語り合うのに最適。`,
        tip: generateTip('cafe', secondCafe.name), area: secondCafe.vicinity?.split(',')[0] ?? ''
      });
      timeHour = 15; timeMin = 15;
    }

    const secondRestaurant = [...restaurants].sort((a: NearbyPlace, b: NearbyPlace) => b.rating - a.rating)[1] ?? bestRestaurant;
    if (secondRestaurant) {
      course2Spots.push({
        id: 3, name: secondRestaurant.name, category: 'restaurant',
        time: `${timeHour}:${String(timeMin).padStart(2, '0')}`, duration: '90min',
        budget: priceLevelToBudget(secondRestaurant.priceLevel), description: `${secondRestaurant.vicinity}。少し早めのディナーでゆっくり会話を楽しむ。`,
        tip: generateTip('restaurant', secondRestaurant.name), area: secondRestaurant.vicinity?.split(',')[0] ?? ''
      });
    }

    const plans = [
      {
        id: 1,
        title: `${areaName}エリア 王道デートコース`,
        theme: 'カフェ × 散策 × ディナー',
        totalBudget: '¥5,000〜9,000',
        totalTime: '約4時間',
        matchScore: 90 + Math.floor(Math.random() * 8),
        spots: course1Spots,
        aiComment: `${areaName}エリアの高評価スポットを中心に、カフェでリラックス→散策で距離を縮める→ディナーで深い会話の王道コースです。`,
      },
      {
        id: 2,
        title: `${areaName}エリア 体験重視コース`,
        theme: 'アクティビティ × カフェ × 早めディナー',
        totalBudget: '¥4,000〜8,000',
        totalTime: '約3.5時間',
        matchScore: 82 + Math.floor(Math.random() * 10),
        spots: course2Spots,
        aiComment: `共通体験からスタートすることで自然に打ち解けやすいコース。初対面で会話が不安な方におすすめです。`,
      },
    ].filter(p => p.spots.length >= 2);

    return NextResponse.json({ plans, area: areaName });
  } catch (error) {
    console.error('Date plan API error:', error);
    return NextResponse.json({ error: 'コース生成に失敗しました' }, { status: 500 });
  }
}
