'use client';

import { useState } from 'react';
import ReviewStageTabs from './ReviewStageTabs';
import ReviewForm from './ReviewForm';
import NightReviewForm from './NightReviewForm';
import FollowupReviewForm from './FollowupReviewForm';
import ReviewSuccess from './ReviewSuccess';
import { Lock } from 'lucide-react';

export default function ReviewContent() {
  const [activeStage, setActiveStage] = useState<'immediate' | 'night' | 'followup'>('immediate');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (reviewSubmitted) {
    return <ReviewSuccess onBack={() => setReviewSubmitted(false)} />;
  }

  return (
    <div className="p-5 pb-24 overflow-y-auto h-full">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">デート振り返り</h2>
          <p className="text-xs text-slate-400">ユキさん (2023-10-25)</p>
        </div>
        <Lock size={16} className="text-slate-500" />
      </header>

      <ReviewStageTabs activeStage={activeStage} onChangeStage={setActiveStage} />

      {activeStage === 'immediate' && (
        <ReviewForm onSubmit={() => setReviewSubmitted(true)} />
      )}
      {activeStage === 'night' && (
        <NightReviewForm onSubmit={() => setReviewSubmitted(true)} />
      )}
      {activeStage === 'followup' && (
        <FollowupReviewForm onSubmit={() => setReviewSubmitted(true)} />
      )}
    </div>
  );
}
