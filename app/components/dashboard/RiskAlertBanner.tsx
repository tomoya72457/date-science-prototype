'use client';

import Link from 'next/link';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { MOCK_RISK_ALERTS } from '@/app/lib/constants';

export default function RiskAlertBanner() {
  const highestRisk = MOCK_RISK_ALERTS.find(a => a.level === 'high') ?? MOCK_RISK_ALERTS[0];
  if (!highestRisk) return null;

  const levelStyles = {
    high: 'bg-red-500/10 border-red-500/30 text-red-400',
    medium: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    low: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  return (
    <Link href="/risk" className={`block p-4 rounded-xl border mb-4 ${levelStyles[highestRisk.level]}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold mb-1">{highestRisk.title}</h4>
          <p className="text-xs opacity-80 leading-relaxed">{highestRisk.description}</p>
        </div>
        <ChevronRight size={16} className="shrink-0 mt-0.5 opacity-60" />
      </div>
    </Link>
  );
}
