import { MOCK_CHECKINS } from '@/app/lib/constants';

export default function CheckInHistory() {
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-300 mb-3">過去のチェックイン</h3>
      <div className="space-y-3">
        {MOCK_CHECKINS.map(checkin => (
          <div key={checkin.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 font-mono">{checkin.date}</span>
              <div className="flex gap-2">
                {checkin.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">衝突</div>
                <div className={`text-sm font-bold ${checkin.conflict > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {checkin.conflict}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">信頼</div>
                <div className="text-sm font-bold text-emerald-400">{checkin.trust}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1">親密</div>
                <div className="text-sm font-bold text-blue-400">{checkin.intimacy}</div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{checkin.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
