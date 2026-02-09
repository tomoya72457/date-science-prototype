'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

interface ReviewSuccessProps {
  onBack: () => void;
}

export default function ReviewSuccess({ onBack }: ReviewSuccessProps) {
  const router = useRouter();

  const handleBackHome = () => {
    onBack();
    router.push('/dashboard');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-500">
        <CheckCircle2 size={32} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">レビュー提出完了</h3>
      <p className="text-sm text-slate-400 mb-6">
        相手のレビューが提出されると<br/>AI要約レポートが閲覧可能になります。
      </p>
      
      <div className="w-full bg-slate-800 p-4 rounded-xl border border-slate-700 text-left mb-6">
        <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase">獲得リワード</h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">データ協力ポイント</span>
          <span className="text-rose-400 font-bold font-mono">+150 Pt</span>
        </div>
      </div>

      <button 
        onClick={handleBackHome}
        className="text-sm text-rose-500 hover:text-rose-400 font-medium"
      >
        ホームへ戻る
      </button>
    </div>
  );
}
