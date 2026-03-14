'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { MOCK_RISK_ALERTS } from '@/app/lib/constants';

export default function RiskDetailContent() {
  const router = useRouter();

  const overallLevel = MOCK_RISK_ALERTS.some(a => a.level === 'high')
    ? 'high'
    : MOCK_RISK_ALERTS.some(a => a.level === 'medium')
    ? 'medium'
    : 'low';

  const gaugePercent = overallLevel === 'high' ? 80 : overallLevel === 'medium' ? 50 : 20;
  const gaugeColor = overallLevel === 'high' ? 'from-red-600 to-red-400' : overallLevel === 'medium' ? 'from-amber-600 to-amber-400' : 'from-emerald-600 to-emerald-400';
  const gaugeLabel = overallLevel === 'high' ? '要注意' : overallLevel === 'medium' ? '注意' : '良好';

  const levelStyles = {
    high: { icon: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-400' },
    medium: { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-400' },
    low: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-400' },
  };

  return (
    <div className="h-full overflow-y-auto pb-24">
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield size={18} className="text-amber-400" />
            リスク検知
          </h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Gauge */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
          <p className="text-xs text-slate-400 mb-3">総合リスクレベル</p>
          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mb-3">
            <div className={`h-full bg-gradient-to-r ${gaugeColor} rounded-full transition-all`} style={{ width: `${gaugePercent}%` }} />
          </div>
          <span className={`text-lg font-bold ${overallLevel === 'high' ? 'text-red-400' : overallLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
            {gaugeLabel}
          </span>
        </div>

        {/* Risk List */}
        <div>
          <h3 className="text-sm font-bold text-slate-300 mb-3">検知されたリスク</h3>
          <div className="space-y-3">
            {MOCK_RISK_ALERTS.map(alert => {
              const style = levelStyles[alert.level];
              return (
                <div key={alert.id} className={`${style.bg} rounded-xl p-4 border ${style.border}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} className={style.icon} />
                    <h4 className="text-sm font-bold text-slate-200">{alert.title}</h4>
                    <span className={`ml-auto px-2 py-0.5 rounded text-[10px] font-bold ${style.badge}`}>
                      {alert.level === 'high' ? '高' : alert.level === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{alert.description}</p>
                  <div className="flex items-center gap-2 bg-slate-900/40 rounded-lg p-3">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <p className="text-xs text-emerald-300">{alert.action}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
