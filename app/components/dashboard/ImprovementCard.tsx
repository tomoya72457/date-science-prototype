import { Sparkles } from 'lucide-react';
import { MOCK_IMPROVEMENTS } from '@/app/lib/constants';

export default function ImprovementCard() {
  const impactColors = {
    high: 'text-rose-400 bg-rose-500/10',
    medium: 'text-amber-400 bg-amber-500/10',
    low: 'text-blue-400 bg-blue-500/10',
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-300 mb-3 px-1 flex items-center gap-2">
        <Sparkles size={14} className="text-amber-400" />
        改善提案
      </h3>
      <div className="space-y-3">
        {MOCK_IMPROVEMENTS.map(item => (
          <div key={item.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${impactColors[item.impact]}`}>
                {item.impact === 'high' ? '効果大' : item.impact === 'medium' ? '効果中' : '効果小'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            <span className="inline-block mt-2 px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-400">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
