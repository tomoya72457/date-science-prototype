'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Share2, BookmarkPlus, CheckCircle2 } from 'lucide-react';
import { MOCK_KNOWLEDGE } from '@/app/lib/constants';
import { useState } from 'react';

interface KnowledgeDetailContentProps {
  knowledgeId: string;
}

export default function KnowledgeDetailContent({ knowledgeId }: KnowledgeDetailContentProps) {
  const router = useRouter();
  const knowledge = MOCK_KNOWLEDGE.find(k => k.id === parseInt(knowledgeId));
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const Icon = knowledge?.icon;

  if (!knowledge || !knowledge.content) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-400">記事が見つかりませんでした</p>
          <button 
            onClick={() => router.push('/knowledge')}
            className="mt-4 text-rose-500 hover:text-rose-400"
          >
            一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  const { content } = knowledge;

  return (
    <div className="h-full overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => router.push('/knowledge')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 hover:bg-slate-800 rounded-lg transition-colors ${isBookmarked ? 'text-rose-500' : 'text-slate-400'}`}
            >
              <BookmarkPlus size={20} />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Title Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
              {knowledge.category}
            </span>
            {content.successRate && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                成功率 {content.successRate}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-3 leading-tight">{knowledge.title}</h1>
          <p className="text-sm text-slate-400 leading-relaxed">{knowledge.description}</p>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              {Icon && <Icon size={16} className="text-slate-500" />}
              <span className="text-xs text-slate-500">{knowledge.likes} いいね</span>
            </div>
            {content.dataSource && (
              <span className="text-xs text-slate-500">データ: {content.dataSource}</span>
            )}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h3 className="text-sm font-bold text-slate-200 mb-2">📌 概要</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{content.introduction}</p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <h2 className="text-lg font-bold text-white mb-3">{section.heading}</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{section.content}</p>
              
              {section.tips && section.tips.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    実践ポイント
                  </h4>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-xl p-5 border border-rose-500/20">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>💡</span>
            重要ポイント
          </h3>
          <ul className="space-y-2">
            {content.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="text-sm text-slate-200 flex items-start gap-2">
                <span className="text-rose-400 mt-1">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {knowledge.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-400 text-xs rounded-full border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`py-3 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border ${
              isLiked 
                ? 'bg-rose-500 text-white border-rose-500' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{isLiked ? 'いいね済み' : 'いいね'}</span>
          </button>
          <button className="py-3 bg-slate-200 hover:bg-white text-slate-900 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
            <BookmarkPlus size={18} />
            <span>保存</span>
          </button>
        </div>

        {/* Related Note */}
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 text-center">
          <p className="text-xs text-slate-400">
            この記事は {knowledge.likes.toLocaleString()} 人のユーザーに役立ちました
          </p>
        </div>
      </div>
    </div>
  );
}
