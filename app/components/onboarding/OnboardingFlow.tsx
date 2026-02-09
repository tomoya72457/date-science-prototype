'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';
import { CONFLICT_QUESTIONS } from '@/app/lib/constants';
import QuestionStep from './QuestionStep';
import ResultStep from './ResultStep';

export default function OnboardingFlow() {
  const router = useRouter();
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userType, setUserType] = useState<string | null>(null);

  const handleAnswer = () => {
    if (onboardingStep < CONFLICT_QUESTIONS.length - 1) {
      setOnboardingStep(prev => prev + 1);
    } else {
      setUserType("論理的解決型 (Logical Solver)");
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  if (userType) {
    return <ResultStep userType={userType} />;
  }

  const question = CONFLICT_QUESTIONS[onboardingStep];

  return (
    <QuestionStep
      question={question}
      currentStep={onboardingStep}
      totalSteps={CONFLICT_QUESTIONS.length}
      onAnswer={handleAnswer}
    />
  );
}
