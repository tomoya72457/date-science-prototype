import { Lock, Shield } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: () => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">デート振り返り</h2>
          <p className="text-xs text-slate-400">ユキさん (2023-10-25)</p>
        </div>
        <Lock size={16} className="text-slate-500" />
      </header>

      <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg flex gap-3 mb-6">
        <Shield className="text-rose-500 shrink-0" size={20} />
        <p className="text-[10px] text-slate-300 leading-tight">
          あなたの入力はAIによって要約・匿名化されます。相手には客観的なデータとしてのみ伝わり、生の声は届きません。
        </p>
      </div>

      <div className="space-y-6">
        {/* Slider Inputs */}
        <div>
          <label className="text-sm font-bold text-slate-300 mb-4 block">会話のバランス</label>
          <div className="flex justify-between text-[10px] text-slate-500 mb-2">
            <span>相手が話した</span>
            <span>半々</span>
            <span>自分が話した</span>
          </div>
          <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-300 mb-4 block">清潔感・身だしなみ</label>
          <input type="range" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-300 mb-4 block">また会いたいですか？</label>
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-rose-500 hover:text-rose-500 transition-colors text-sm font-bold">
              いいえ
            </button>
            <button className="py-3 bg-slate-800 border border-rose-500/50 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-sm font-bold">
              はい
            </button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-bold text-slate-300 mb-3 block">印象タグ(選択)</label>
          <div className="flex flex-wrap gap-2">
            {["聞き上手", "論理的", "マナーが良い", "店選びが素敵", "少し遅刻"].map(tag => (
              <button key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 hover:border-rose-500 hover:text-rose-400 transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onSubmit}
          className="w-full py-4 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-bold shadow-lg shadow-rose-500/20 mt-4"
        >
          レビューを送信してロック
        </button>
      </div>
    </div>
  );
}
