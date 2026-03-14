'use client';

interface ReviewStageTabsProps {
  activeStage: 'immediate' | 'night' | 'followup';
  onChangeStage: (stage: 'immediate' | 'night' | 'followup') => void;
}

const STAGES = [
  { key: 'immediate' as const, label: '直後' },
  { key: 'night' as const, label: '当日夜' },
  { key: 'followup' as const, label: 'フォローアップ' },
];

export default function ReviewStageTabs({ activeStage, onChangeStage }: ReviewStageTabsProps) {
  return (
    <div className="flex bg-slate-800 rounded-lg p-1 mb-6 border border-slate-700">
      {STAGES.map(stage => (
        <button
          key={stage.key}
          onClick={() => onChangeStage(stage.key)}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors ${
            activeStage === stage.key
              ? 'bg-rose-500 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {stage.label}
        </button>
      ))}
    </div>
  );
}
