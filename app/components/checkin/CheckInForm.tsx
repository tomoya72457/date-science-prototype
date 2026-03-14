'use client';

import { useState } from 'react';

interface CheckInFormProps {
  onSubmit: () => void;
}

const BEHAVIOR_TAGS = [
  "積極的に連絡", "自分から誘った", "相手の話を聞けた", "感情を伝えた",
  "サプライズした", "衝突を避けた", "素直に謝れた", "感謝を伝えた"
];

export default function CheckInForm({ onSubmit }: CheckInFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">衝突度</label>
        <input type="range" min="0" max="100" defaultValue="20" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500" />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>穏やか</span>
          <span>普通</span>
          <span>衝突あり</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">信頼度</label>
        <input type="range" min="0" max="100" defaultValue="75" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>不安</span>
          <span>普通</span>
          <span>安心</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-4 block">親密度</label>
        <input type="range" min="0" max="100" defaultValue="68" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>距離あり</span>
          <span>普通</span>
          <span>とても近い</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-3 block">今週の行動変化タグ</label>
        <div className="flex flex-wrap gap-2">
          {BEHAVIOR_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs transition-colors border ${
                selectedTags.includes(tag)
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-rose-500 hover:text-rose-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-bold text-slate-300 mb-3 block">今週のメモ（任意）</label>
        <textarea
          placeholder="今週の関係性について感じたことを自由に書いてください..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-rose-500 resize-none h-24"
        />
      </div>

      <button
        onClick={onSubmit}
        className="w-full py-4 bg-rose-500 hover:bg-rose-600 rounded-xl text-white font-bold shadow-lg shadow-rose-500/20"
      >
        チェックインを記録
      </button>
    </div>
  );
}
