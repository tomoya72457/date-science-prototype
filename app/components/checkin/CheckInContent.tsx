'use client';

import { useState } from 'react';
import { CalendarCheck, CheckCircle2 } from 'lucide-react';
import CheckInForm from './CheckInForm';
import CheckInHistory from './CheckInHistory';

export default function CheckInContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <CalendarCheck size={20} className="text-emerald-400" />
          <h2 className="text-xl font-bold text-white">毎週チェックイン</h2>
        </div>
        <p className="text-xs text-slate-400">今週の関係性を振り返りましょう</p>
      </header>

      {submitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">チェックイン完了！</h3>
          <p className="text-sm text-slate-400 mb-6">今週もお疲れさまでした。</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-sm text-rose-500 hover:text-rose-400"
          >
            もう一度入力する
          </button>
        </div>
      ) : (
        <CheckInForm onSubmit={() => setSubmitted(true)} />
      )}

      <div className="mt-8 pt-6 border-t border-slate-700">
        <CheckInHistory />
      </div>
    </div>
  );
}
