'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Send } from 'lucide-react';
import { MOCK_MATCHES } from '@/app/lib/constants';

interface Message {
  id: string;
  text: string;
  isOwn: boolean;
  timestamp: Date;
}

interface ChatContentProps {
  matchId: string;
}

const INITIAL_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: '1', text: 'こんにちは！プロフィール見ました。データアナリストなんですね、私も分析系の仕事してます！', isOwn: false, timestamp: new Date() },
    { id: '2', text: 'はじめまして！そうなんです。どんな分析をされてるんですか？', isOwn: true, timestamp: new Date() },
  ],
  2: [],
  3: [],
};

export default function ChatContent({ matchId }: ChatContentProps) {
  const router = useRouter();
  const match = MOCK_MATCHES.find(m => m.id === parseInt(matchId));
  const [messages, setMessages] = useState<Message[]>(() => {
    const initial = INITIAL_MESSAGES[match?.id as number] || [];
    return initial.length > 0 ? initial : [
      { id: '1', text: `こんにちは！${match?.name}さんとマッチできて嬉しいです。`, isOwn: false, timestamp: new Date() },
    ];
  });
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!match) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-400">チャットが見つかりませんでした</p>
          <button
            onClick={() => router.push('/talk')}
            className="mt-4 text-rose-500 hover:text-rose-400"
          >
            トーク一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isOwn: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // 簡易的な自動返信（2秒後）
    setTimeout(() => {
      const replies: Record<number, string[]> = {
        1: ['お互いデータ系で共通点がありそうで嬉しいです！', '最近はユーザー行動の分析をしてます。'],
        2: ['ありがとうございます！デザインの話、してみたいです。', '今度カフェでお話しませんか？'],
        3: ['コンサルタント、大変そうですね。', '読書好きなんですね！最近何か読みました？'],
      };
      const options = replies[match.id] || ['メッセージありがとうございます！'];
      const reply = options[Math.floor(Math.random() * options.length)];
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: reply,
        isOwn: false,
        timestamp: new Date(),
      }]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => router.push('/talk')}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <div className={`w-10 h-10 rounded-full ${match.imgColor} flex items-center justify-center text-slate-800 font-bold relative overflow-hidden shrink-0`}>
            {match.imageSrc ? (
              <Image src={match.imageSrc} alt={match.name} fill className="object-cover scale-125" />
            ) : (
              match.name[0]
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-white">{match.name}</h1>
            <p className="text-xs text-slate-500">{match.job}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.isOwn
                  ? 'bg-rose-500 text-white rounded-br-md'
                  : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-4 pb-safe">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
