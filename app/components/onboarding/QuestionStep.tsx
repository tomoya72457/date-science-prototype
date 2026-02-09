import { ChevronRight } from 'lucide-react';
import type { ConflictQuestion } from '@/app/lib/types';

interface QuestionStepProps {
  question: ConflictQuestion;
  currentStep: number;
  totalSteps: number;
  onAnswer: () => void;
}

export default function QuestionStep({ question, currentStep, totalSteps, onAnswer }: QuestionStepProps) {
  return (
    <div className="p-6 h-full flex flex-col justify-center max-w-md mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-rose-400 mb-2 font-mono font-bold">
          <span>SIMULATION</span>
          <span>{currentStep + 1} / {totalSteps}</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full">
          <div 
            className="h-full bg-rose-500 rounded-full transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-8 leading-relaxed">
        {question.text}
      </h3>

      <div className="space-y-4">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={onAnswer}
            className="w-full text-left p-4 bg-slate-800 border border-slate-700 rounded-xl hover:border-rose-500 hover:bg-slate-750 transition-all text-slate-200 text-sm group"
          >
            <div className="flex justify-between items-center">
              {option.label}
              <ChevronRight size={16} className="text-slate-500 group-hover:text-rose-500" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
