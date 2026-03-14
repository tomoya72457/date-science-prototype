'use client';

interface MonthSelectorProps {
  months: string[];
  selected: string;
  onSelect: (month: string) => void;
}

export default function MonthSelector({ months, selected, onSelect }: MonthSelectorProps) {
  const formatMonth = (m: string) => {
    const [year, month] = m.split('-');
    return `${year}年${parseInt(month)}月`;
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
      {months.map(month => (
        <button
          key={month}
          onClick={() => onSelect(month)}
          className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
            selected === month
              ? 'bg-rose-500 text-white border-rose-500'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-rose-500'
          }`}
        >
          {formatMonth(month)}
        </button>
      ))}
    </div>
  );
}
