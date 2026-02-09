'use client';

import { useState, useMemo } from 'react';
import { MOCK_KNOWLEDGE } from '@/app/lib/constants';
import KnowledgeCard from './KnowledgeCard';
import CategoryTabs from './CategoryTabs';

const CATEGORIES = ["すべて", "デートコース", "会話術", "成功事例", "トラブル対応"];

export default function KnowledgeContent() {
  const [activeCategory, setActiveCategory] = useState(0);

  // カテゴリに基づいてナレッジをフィルタリング
  const filteredKnowledge = useMemo(() => {
    if (activeCategory === 0) {
      // "すべて"が選択されている場合は全て表示
      return MOCK_KNOWLEDGE;
    }
    
    // 選択されたカテゴリ名を取得
    const selectedCategory = CATEGORIES[activeCategory];
    
    // カテゴリに一致するものだけをフィルタリング
    return MOCK_KNOWLEDGE.filter(item => item.category === selectedCategory);
  }, [activeCategory]);

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">ナレッジ</h2>
        <p className="text-xs text-slate-400">成功者のデートコース・勝ちパターン共有</p>
      </header>

      <CategoryTabs
        categories={CATEGORIES}
        activeIndex={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="space-y-4">
        {filteredKnowledge.length > 0 ? (
          filteredKnowledge.map((item) => (
            <KnowledgeCard key={item.id} knowledge={item} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-sm">このカテゴリのナレッジはまだありません</p>
          </div>
        )}

        {/* Premium Banner */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-white text-sm mb-1">もっとナレッジを見る</h3>
            <p className="text-[10px] text-slate-400 mb-3">プレミアム会員は全2,400件のデータを閲覧可能</p>
            <button className="px-4 py-2 bg-slate-200 text-slate-900 text-xs font-bold rounded-lg hover:bg-white transition-colors">
              プラン詳細へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
