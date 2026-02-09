import { RADAR_LABELS } from '@/app/lib/constants';
import type { UserStats } from '@/app/lib/types';

interface RadarChartProps {
  stats: UserStats;
}

export default function RadarChart({ stats }: RadarChartProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex items-center text-xs">
          <span className="w-20 text-slate-400 font-medium">
            {RADAR_LABELS[key as keyof UserStats]}
          </span>
          <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden relative">
            {/* Background Grid Lines (Visual only) */}
            <div className="absolute top-0 left-1/4 h-full w-px bg-slate-600/30"></div>
            <div className="absolute top-0 left-2/4 h-full w-px bg-slate-600/30"></div>
            <div className="absolute top-0 left-3/4 h-full w-px bg-slate-600/30"></div>
            
            <div 
              className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="ml-3 text-slate-200 w-8 text-right font-mono font-bold">{value}</span>
        </div>
      ))}
    </div>
  );
}
