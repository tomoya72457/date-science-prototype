'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CONFLICT_QUESTIONS } from '@/app/lib/constants';
import QuestionStep from './QuestionStep';
import ResultStep from './ResultStep';

type AnswerType = 'logic' | 'emotion' | 'avoid';

export default function OnboardingFlow() {
  const router = useRouter();
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userType, setUserType] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  const calculateUserType = (answers: AnswerType[]): string => {
    // 2問の回答から9通りのタイプを判定
    const [first, second] = answers;
    
    // 9つの組み合わせパターン
    const typeMap: Record<string, string> = {
      'logic-logic': '完全論理型 (Pure Analyzer)',
      'logic-emotion': '戦略的共感型 (Strategic Empath)',
      'logic-avoid': '効率重視型 (Efficiency Seeker)',
      'emotion-logic': '感情的理性型 (Emotional Rationalist)',
      'emotion-emotion': '純粋共感型 (Pure Empath)',
      'emotion-avoid': '配慮優先型 (Considerate Harmonizer)',
      'avoid-logic': '平和的合理主義 (Peaceful Pragmatist)',
      'avoid-emotion': '調和的感受性 (Harmonious Sensitive)',
      'avoid-avoid': '完全平和主義 (Pure Peacekeeper)'
    };
    
    const key = `${first}-${second}`;
    return typeMap[key] || 'バランス型 (Balanced Type)';
  };

  const handleAnswer = (answerType: AnswerType) => {
    const newAnswers = [...answers, answerType];
    setAnswers(newAnswers);

    if (onboardingStep < CONFLICT_QUESTIONS.length - 1) {
      setOnboardingStep(prev => prev + 1);
    } else {
      const determinedType = calculateUserType(newAnswers);
      setUserType(determinedType);
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
