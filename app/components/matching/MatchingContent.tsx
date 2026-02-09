import { MOCK_MATCHES } from '@/app/lib/constants';
import MatchCard from './MatchCard';

export default function MatchingContent() {
  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">AI相性予測</h2>
        <p className="text-xs text-slate-400">データに基づいた高精度マッチング</p>
      </header>

      <div className="space-y-6">
        {MOCK_MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
