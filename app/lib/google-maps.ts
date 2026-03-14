// Google Maps JavaScript API ローダー

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

let loadPromise: Promise<void> | null = null;

export function loadGoogleMaps(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject('SSR');
  if (window.google?.maps) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&language=ja`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google Maps の読み込みに失敗しました'));
    document.head.appendChild(script);
  });

  return loadPromise;
}

// タイムアウト付きPromise
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

// ジオコーディング（住所/駅名 → 緯度経度）
export function geocode(address: string): Promise<{ lat: number; lng: number; name: string } | null> {
  const inner = new Promise<{ lat: number; lng: number; name: string } | null>((resolve) => {
    try {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address, region: 'jp' }, (results, status) => {
        console.log(`[geocode] "${address}" → status: ${status}`);
        if (status === 'OK' && results && results.length > 0) {
          const loc = results[0].geometry.location;
          resolve({ lat: loc.lat(), lng: loc.lng(), name: results[0].formatted_address });
        } else {
          resolve(null);
        }
      });
    } catch (err) {
      console.error('[geocode] Exception:', err);
      resolve(null);
    }
  });
  return withTimeout(inner, 5000, null);
}

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

// 周辺検索（Places Nearby Search）
export function searchNearby(
  lat: number,
  lng: number,
  type: string,
  radius: number = 1000
): Promise<PlaceResult[]> {
  const inner = new Promise<PlaceResult[]>((resolve) => {
    try {
      const div = document.createElement('div');
      const service = new google.maps.places.PlacesService(div);

      service.nearbySearch(
        {
          location: new google.maps.LatLng(lat, lng),
          radius,
          type,
        },
        (results, status) => {
          console.log(`[nearbySearch] type=${type} → status: ${status}, count: ${results?.length ?? 0}`);
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const places: PlaceResult[] = results.slice(0, 8).map((p) => ({
              name: p.name ?? '',
              vicinity: p.vicinity ?? '',
              rating: p.rating ?? 0,
              types: p.types ?? [],
              lat: p.geometry?.location?.lat() ?? 0,
              lng: p.geometry?.location?.lng() ?? 0,
              priceLevel: p.price_level,
              placeId: p.place_id ?? '',
            }));
            resolve(places);
          } else {
            resolve([]);
          }
        }
      );
    } catch (err) {
      console.error('[nearbySearch] Exception:', err);
      resolve([]);
    }
  });
  return withTimeout(inner, 8000, []);
}

// テキスト検索（より柔軟）
export function textSearch(
  query: string,
  lat: number,
  lng: number,
  radius: number = 1000
): Promise<PlaceResult[]> {
  const inner = new Promise<PlaceResult[]>((resolve) => {
    try {
      const div = document.createElement('div');
      const service = new google.maps.places.PlacesService(div);

      service.textSearch(
        {
          query,
          location: new google.maps.LatLng(lat, lng),
          radius,
        },
        (results, status) => {
          console.log(`[textSearch] "${query}" → status: ${status}, count: ${results?.length ?? 0}`);
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const places: PlaceResult[] = results.slice(0, 8).map((p) => ({
              name: p.name ?? '',
              vicinity: p.formatted_address ?? '',
              rating: p.rating ?? 0,
              types: p.types ?? [],
              lat: p.geometry?.location?.lat() ?? 0,
              lng: p.geometry?.location?.lng() ?? 0,
              priceLevel: p.price_level,
              placeId: p.place_id ?? '',
            }));
            resolve(places);
          } else {
            resolve([]);
          }
        }
      );
    } catch (err) {
      console.error('[textSearch] Exception:', err);
      resolve([]);
    }
  });
  return withTimeout(inner, 8000, []);
}
