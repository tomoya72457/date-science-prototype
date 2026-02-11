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
    const counts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<AnswerType, number>);

    const maxCount = Math.max(...Object.values(counts));
    const dominantTypes = Object.entries(counts)
      .filter(([_, count]) => count === maxCount)
      .map(([type]) => type);

    // 複数の傾向が同点の場合の処理
    if (dominantTypes.length > 1) {
      if (dominantTypes.includes('logic') && dominantTypes.includes('emotion')) {
        return "バランス調整型 (Balanced Mediator)";
      }
      if (dominantTypes.includes('logic') && dominantTypes.includes('avoid')) {
        return "戦略的回避型 (Strategic Avoider)";
      }
      if (dominantTypes.includes('emotion') && dominantTypes.includes('avoid')) {
        return "配慮重視型 (Caring Considerate)";
      }
    }

    // 単一の傾向が優勢な場合
    const dominantType = dominantTypes[0] as AnswerType;
    
    switch (dominantType) {
      case 'logic':
        return "論理的解決型 (Logical Solver)";
      case 'emotion':
        return "共感優先型 (Empathy First)";
      case 'avoid':
        return "平和主義型 (Peaceful Harmonizer)";
      default:
        return "バランス調整型 (Balanced Mediator)";
    }
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
