'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageSquare, MapPin, CheckSquare, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_MATCHES, MATCH_CONVERSATION_TOPICS, MOCK_DATE_COURSES, MOCK_PREP_CHECKLIST } from '@/app/lib/constants';
import type { ConversationTopic } from '@/app/lib/types';

interface PreSupportContentProps {
  matchId: string;
}

function TopicCard({ topic }: { topic: ConversationTopic }) {
  const [open, setOpen] = useState(false);

  const riskColors = {
    safe: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    moderate: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    bold: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
  };
  const riskLabels = { safe: '安全', moderate: '中程度', bold: '大胆' };

  return (
    <div className={`rounded-xl border overflow-hidden ${riskColors[topic.riskLevel]}`}>
      <button onClick={() => setOpen(!open)} className="w-full p-4 text-left">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-sm font-bold text-slate-200 leading-snug">{topic.topic}</span>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskColors[topic.riskLevel]}`}>
              {riskLabels[topic.riskLevel]}
            </span>
            {open ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
          </div>
        </div>
        <p className="text-xs text-slate-400">{topic.reason}</p>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-700/30 pt-3">
          {/* 自分の切り出し（右） */}
          <div className="flex justify-end">
            <p className="text-xs text-slate-200 leading-relaxed bg-rose-500/20 rounded-2xl rounded-tr-sm p-3 border border-rose-500/25 max-w-[80%]">
              {topic.opener}
            </p>
          </div>
          {/* 相手の返答（左） */}
          <div className="flex justify-start">
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-700/60 rounded-2xl rounded-tl-sm p-3 border border-slate-600/40 max-w-[80%]">
              {topic.openerReply}
            </p>
          </div>
          {topic.followUp && (
            <>
              {/* 自分の掘り下げ（右） */}
              <div className="flex justify-end">
                <p className="text-xs text-slate-200 leading-relaxed bg-rose-500/15 rounded-2xl rounded-tr-sm p-3 border border-rose-500/20 max-w-[80%]">
                  {topic.followUp}
                </p>
              </div>
              {/* 相手の返答（左） */}
              {topic.followUpReply && (
                <div className="flex justify-start">
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-700/60 rounded-2xl rounded-tl-sm p-3 border border-slate-600/40 max-w-[80%]">
                    {topic.followUpReply}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function PreSupportContent({ matchId }: PreSupportContentProps) {
  const router = useRouter();
  const match = MOCK_MATCHES.find(m => m.id === parseInt(matchId));
  const [checklist, setChecklist] = useState(MOCK_PREP_CHECKLIST);

  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  if (!match) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-400">マッチングが見つかりませんでした</p>
      </div>
    );
  }

  const topics = MATCH_CONVERSATION_TOPICS[match.id] ?? [];

  return (
    <div className="h-full overflow-y-auto pb-24">
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.push(`/matching/${matchId}`)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <h1 className="text-lg font-bold text-white">デート前支援</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Match Info */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${match.imgColor} flex items-center justify-center text-slate-800 font-bold`}>
            {match.name[0]}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{match.name}さんとのデート準備</h3>
            <p className="text-xs text-slate-400">
              {match.job} / {match.tags.map(t => `#${t}`).join(' ')}
            </p>
          </div>
        </div>

        {/* Conversation Topics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-blue-400" />
              <h3 className="text-sm font-bold text-slate-300">会話トピック提案</h3>
            </div>
            <span className="text-[10px] text-slate-500">タップで詳細</span>
          </div>
          <div className="space-y-3">
            {topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>

        {/* Date Courses */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-rose-400" />
            <h3 className="text-sm font-bold text-slate-300">デートコース提案</h3>
          </div>
          <div className="space-y-3">
            {MOCK_DATE_COURSES.map(course => (
              <div key={course.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <h4 className="text-sm font-bold text-slate-200 mb-1">{course.name}</h4>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-rose-400 font-bold">{course.budget}</span>
                  <span className="text-xs text-slate-500">{course.location}</span>
                </div>
                <p className="text-xs text-slate-400">{course.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prep Checklist */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckSquare size={16} className="text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-300">準備チェックリスト</h3>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-3">
            {checklist.map(item => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-rose-500 focus:ring-rose-500 accent-rose-500"
                />
                <span className={`text-sm ${item.checked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* AI Advice */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={16} className="text-rose-400" />
            <h4 className="text-sm font-bold text-slate-300">AIアドバイス</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {match.name}さんは「{match.tags[0]}」タイプです。会話では相手のペースに合わせつつ、あなたの論理的な面を活かして具体的なプランを提案すると好印象です。初回は2-3時間程度で切り上げるのがベストです。
          </p>
        </div>
      </div>
    </div>
  );
}
