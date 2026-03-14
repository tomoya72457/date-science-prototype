'use client';

interface NightReviewFormProps {
  onSubmit: () => void;
}

export default function NightReviewForm({ onSubmit }: NightReviewFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 mb-4">
        <p className="text-xs text-slate-400">
          デートから時間が経った今、冷静に振り返ってみましょう。
        </p>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">全体的な満足度</label>
        <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>不満</span>
          <span>普通</span>
          <span>大満足</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">相手との距離感の変化</label>
        <div className="grid grid-cols-3 gap-2">
          {['縮まった', '変わらない', '広がった'].map(option => (
            <button key={option} className="py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-rose-500 hover:text-rose-400 transition-colors">
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-3 block">もう一度行きたい場所だった？</label>
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-rose-500 hover:text-rose-500 transition-colors text-sm font-bold">
            いいえ
          </button>
          <button className="py-3 bg-slate-800 border border-rose-500/50 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-sm font-bold">
            はい
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-3 block">今の気持ちをメモ（任意）</label>
        <textarea
          placeholder="デートを振り返って感じたことを自由に書いてください..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-rose-500 resize-none h-24"
        />
      </div>

      <button
        onClick={onSubmit}
        className="w-full py-4 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-bold shadow-lg shadow-rose-500/20 mt-4"
      >
        当日夜レビューを送信
      </button>
    </div>
  );
}
