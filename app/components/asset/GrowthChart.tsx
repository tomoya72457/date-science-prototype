import { TrendingUp } from 'lucide-react';

const GROWTH_DATA = [30, 45, 40, 60, 55, 75, 82];
const MONTHS = ['4月', '5月', '6月', '7月', '8月', '9月', '10月'];

export default function GrowthChart() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="font-bold text-slate-200 text-sm mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-rose-400"/>
        偏差値の推移
      </h3>
      <div className="h-32 flex items-end justify-between px-2 gap-2">
        {GROWTH_DATA.map((h, i) => (
          <div key={i} className="w-full bg-slate-700 rounded-t-sm relative group">
            <div 
              className="absolute bottom-0 w-full bg-rose-500/80 rounded-t-sm transition-all duration-500 group-hover:bg-rose-400"
              style={{ height: `${h}%` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
        {MONTHS.map((month, i) => (
          <span key={i}>{month}</span>
        ))}
      </div>
    </div>
  );
}
