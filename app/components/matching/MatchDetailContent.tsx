'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart, MessageCircle, Brain, Star } from 'lucide-react';
import { MOCK_MATCHES, MOCK_USER } from '@/app/lib/constants';
import RadarChart from '../shared/RadarChart';

interface MatchDetailContentProps {
  matchId: string;
}

export default function MatchDetailContent({ matchId }: MatchDetailContentProps) {
  const router = useRouter();
  const match = MOCK_MATCHES.find(m => m.id === parseInt(matchId));
  const [isLiked, setIsLiked] = useState(false);

  if (!match) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-400">マッチングが見つかりませんでした</p>
          <button 
            onClick={() => router.push('/matching')}
            className="mt-4 text-rose-500 hover:text-rose-400"
          >
            一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => router.push('/matching')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <h1 className="text-lg font-bold text-white">詳細データ</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-full ${match.imgColor} flex items-center justify-center text-slate-800 font-bold text-2xl relative overflow-hidden`}>
                {match.imageSrc ? (
                  <Image
                    src={match.imageSrc}
                    alt={match.name}
                    fill
                    className="object-cover scale-125"
                  />
                ) : (
                  match.name[0]
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{match.name}</h2>
                <p className="text-slate-400 text-sm">{match.age}歳 • {match.job}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 text-center bg-slate-950/40 rounded-lg p-3 border border-slate-700/50">
                <div className="text-3xl font-bold text-rose-500 mb-1">{match.score}</div>
                <div className="text-xs text-slate-400">予測スコア</div>
              </div>
              <div className="flex-1 text-center bg-slate-950/40 rounded-lg p-3 border border-slate-700/50">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{match.compatibility}</div>
                <div className="text-xs text-slate-400">互換性ランク</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {match.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full border border-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-emerald-400" />
            <h3 className="font-bold text-emerald-400">AI詳細分析</h3>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {match.reason}
          </p>
          
          <div className="bg-slate-950/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
              <Star size={14} />
              相性が良い理由
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>コミュニケーションスタイルの一致度: 92%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>ライフスタイルの互換性: 88%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>価値観の共有度: 85%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <h3 className="font-bold text-slate-200 mb-4 text-sm">パラメータ比較</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-400 mb-2">あなたのパラメータ</p>
              <RadarChart stats={MOCK_USER.stats} />
            </div>
            
            <div className="border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-400 mb-2">{match.name}さんの推定パラメータ</p>
              <RadarChart stats={{
                conversation: 80,
                empathy: 85,
                logic: 70,
                appearance: 75,
                planning: 82
              }} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${
              isLiked 
                ? 'bg-rose-500 hover:bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-500/25' 
                : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{isLiked ? 'いいね済み' : 'いいね！'}</span>
          </button>
          <button className="py-4 bg-slate-200 hover:bg-white text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700">
            <MessageCircle size={18} />
            <span>メッセージ</span>
          </button>
        </div>

        {/* Tips */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <h4 className="text-xs font-bold text-slate-300 mb-2">💡 アプローチのヒント</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            初回メッセージでは、プロフィールの「{match.tags[0]}」に関連する話題から始めると返信率が37%向上します。
          </p>
        </div>
      </div>
    </div>
  );
}
