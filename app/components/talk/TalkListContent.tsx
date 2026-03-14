'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { MOCK_MATCHES } from '@/app/lib/constants';

export default function TalkListContent() {
  return (
    <div className="h-full overflow-y-auto pb-24">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 p-4">
        <h2 className="text-xl font-bold text-white">トーク</h2>
        <p className="text-xs text-slate-400">マッチした相手とメッセージ</p>
      </header>

      <div className="p-4 space-y-2">
        {MOCK_MATCHES.length > 0 ? (
          MOCK_MATCHES.map((match) => (
            <Link
              key={match.id}
              href={`/talk/${match.id}`}
              className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${match.imgColor} flex items-center justify-center text-slate-800 font-bold text-lg relative overflow-hidden shrink-0`}>
                {match.imageSrc ? (
                  <Image
                    src={match.imageSrc}
                    alt={match.name}
                    fill
                    className="object-cover scale-125"
                  />
                ) : (
                  match.name[0]
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-200">{match.name}</h3>
                <p className="text-xs text-slate-500 truncate">
                  {match.job} • 相性{match.score}%
                </p>
              </div>
              <MessageCircle size={18} className="text-slate-500 shrink-0" />
            </Link>
          ))
        ) : (
          <div className="text-center py-16">
            <MessageCircle size={48} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-sm mb-2">まだトークはありません</p>
            <p className="text-xs text-slate-500">マッチングした相手がここに表示されます</p>
            <Link
              href="/matching"
              className="inline-block mt-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-lg transition-colors"
            >
              マッチングを探す
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
