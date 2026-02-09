import { Brain } from 'lucide-react';

interface ResultStepProps {
  userType: string;
}

export default function ResultStep({ userType }: ResultStepProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in text-center">
      <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-6 text-rose-500">
        <Brain size={40} />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">診断完了</h2>
      <p className="text-slate-400 mb-6">あなたのタイプは...</p>
      <div className="text-xl font-bold text-rose-400 border border-rose-500/50 bg-rose-500/10 px-6 py-3 rounded-lg mb-8 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
        {userType}
      </div>
      <p className="text-sm text-slate-400 animate-pulse">データを生成中...</p>
    </div>
  );
}
