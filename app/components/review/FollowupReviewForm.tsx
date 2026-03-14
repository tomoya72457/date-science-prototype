'use client';

interface FollowupReviewFormProps {
  onSubmit: () => void;
}

export default function FollowupReviewForm({ onSubmit }: FollowupReviewFormProps) {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg mb-4">
        <p className="text-xs text-slate-300 leading-tight">
          デートから数日経った今の気持ちを記録しましょう。時間が経つと見えてくるものがあります。
        </p>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">デート後の連絡頻度</label>
        <div className="grid grid-cols-3 gap-2">
          {['増えた', '変わらない', '減った'].map(option => (
            <button key={option} className="py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 hover:border-rose-500 hover:text-rose-400 transition-colors">
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">次のデートへの期待度</label>
        <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>あまり...</span>
          <span>普通</span>
          <span>とても楽しみ</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-3 block">関係性の進展を感じる？</label>
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:border-rose-500 hover:text-rose-500 transition-colors text-sm font-bold">
            まだ分からない
          </button>
          <button className="py-3 bg-slate-800 border border-rose-500/50 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white transition-colors text-sm font-bold">
            感じる
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-3 block">次のデートでやりたいこと</label>
        <div className="flex flex-wrap gap-2">
          {["もっと深い話", "アクティビティ", "食事メイン", "ドライブ", "映画", "自然の中で"].map(tag => (
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
        フォローアップレビューを送信
      </button>
    </div>
  );
}
