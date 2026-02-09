import Link from 'next/link';
import Image from 'next/image';
import { Brain, ArrowRight } from 'lucide-react';
import type { Match } from '@/app/lib/types';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
      {/* Header with Score */}
      <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${match.imgColor} flex items-center justify-center text-slate-800 font-bold relative overflow-hidden`}>
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
          <div>
            <h3 className="font-bold text-slate-200">{match.name}, {match.age}</h3>
            <p className="text-xs text-slate-500">{match.job}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rose-500">{match.score}</div>
          <div className="text-[10px] text-slate-500 font-bold">予測スコア</div>
        </div>
      </div>

      {/* AI Reason */}
      <div className="p-4">
        <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-700/50 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={14} className="text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">AI推薦理由</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {match.reason}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {match.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 text-[10px] rounded-md border border-slate-600">
              #{tag}
            </span>
          ))}
        </div>

        <Link 
          href={`/matching/${match.id}`}
          className="w-full py-3 bg-slate-200 text-slate-900 font-bold rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
        >
          <span>詳細データを見る</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
