import { RADAR_LABELS } from '@/app/lib/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface RadarChartProps {
  stats: Record<string, number>;
  labels?: Record<string, string>;
  colorFrom?: string;
  colorTo?: string;
}

export default function RadarChart({
  stats,
  labels,
  colorFrom = 'from-rose-600',
  colorTo = 'to-rose-400'
}: RadarChartProps) {
  const resolvedLabels = labels ?? (RADAR_LABELS as Record<string, string>);

  return (
    <div className="flex flex-col gap-3 w-full">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex items-center text-xs">
          <span className="w-20 text-slate-400 font-medium shrink-0">
            {resolvedLabels[key] ?? key}
          </span>
          <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden relative">
            {/* Background Grid Lines (Visual only) */}
            <div className="absolute top-0 left-1/4 h-full w-px bg-slate-600/30"></div>
            <div className="absolute top-0 left-2/4 h-full w-px bg-slate-600/30"></div>
            <div className="absolute top-0 left-3/4 h-full w-px bg-slate-600/30"></div>

            <div
              className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full`}
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="ml-3 text-slate-200 w-8 text-right font-mono font-bold">{value}</span>
        </div>
      ))}
    </div>
  );
}
