// Google Maps API ユーティリティ

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

// 場所をジオコーディング（住所/駅名 → 緯度経度）
export async function geocode(address: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&language=ja&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    return data.results[0].geometry.location;
  }
  return null;
}

// 周辺スポット検索（Nearby Search）
export interface PlaceResult {
  name: string;
  vicinity: string;
  rating: number;
  types: string[];
  lat: number;
  lng: number;
  priceLevel?: number;
  placeId: string;
}

export async function searchNearby(
  lat: number,
  lng: number,
  type: string,
  radius: number = 1000
): Promise<PlaceResult[]> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&language=ja&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK') {
    return data.results.slice(0, 5).map((p: Record<string, unknown>) => ({
      name: p.name as string,
      vicinity: p.vicinity as string,
      rating: (p.rating as number) ?? 0,
      types: (p.types as string[]) ?? [],
      lat: (p.geometry as { location: { lat: number; lng: number } }).location.lat,
      lng: (p.geometry as { location: { lat: number; lng: number } }).location.lng,
      priceLevel: p.price_level as number | undefined,
      placeId: p.place_id as string,
    }));
  }
  return [];
}

// 2点間の距離（km）
export function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
