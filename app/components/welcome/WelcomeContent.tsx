'use client';

import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';

export default function WelcomeContent() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(244,63,94,0.15),transparent_70%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mb-8 border border-slate-700 shadow-2xl shadow-rose-500/10">
          <Activity size={48} className="text-rose-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2 font-mono tracking-tighter">DateScience</h1>
        <p className="text-sm text-rose-400 font-bold tracking-widest uppercase mb-8">Personal Gym for Romance</p>
        
        <div className="space-y-4 mb-12 max-w-xs text-slate-400 text-sm leading-relaxed">
          <p>
            「運命」を待つのは終わりです。<br/>
            感情をデータ化し、最短ルートで成婚へ。
          </p>
          <p>
            あなたの恋愛偏差値を可視化する<br/>
            科学的アプローチを始めましょう。
          </p>
        </div>

        <Link 
          href="/onboarding"
          className="group relative px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl w-full shadow-lg shadow-rose-500/25 transition-all active:scale-95 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            トレーニングを開始する
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </Link>
        
        <p className="mt-6 text-[10px] text-slate-600">
          登録することで、利用規約とプライバシーポリシーに<br/>同意したものとみなされます。
        </p>
      </div>
    </div>
  );
}
