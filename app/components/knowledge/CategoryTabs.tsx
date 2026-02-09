'use client';

interface CategoryTabsProps {
  categories: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function CategoryTabs({ categories, activeIndex, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat, i) => (
        <button
          key={cat}
          onClick={() => {
            console.log('カテゴリクリック:', cat, 'インデックス:', i);
            onSelect(i);
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
            i === activeIndex
              ? 'bg-rose-500 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
