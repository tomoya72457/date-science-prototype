import { Brain } from 'lucide-react';

export default function CoachingCard() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
      <div className="flex items-center gap-2 mb-3">
        <Brain size={18} className="text-emerald-400" />
        <h3 className="font-bold text-emerald-400 text-sm">AIコーチング</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 mb-1">勝ちパターン分析</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            「仕事の相談」から入るデートは成婚率の高いユーザーとのマッチング時に80%の確率で2回目に繋がっています。あなたの知的な強みが活きています。
          </p>
        </div>
        <div className="w-full h-px bg-slate-700"></div>
        <div>
          <h4 className="text-xs font-bold text-slate-300 mb-1">改善のためのTo-Do</h4>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
            <li>初対面での「否定的な接続詞(でも、しかし)」を15%減らす</li>
            <li>相手の「感情」に対して「事実」で返さず「共感」を挟む</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
