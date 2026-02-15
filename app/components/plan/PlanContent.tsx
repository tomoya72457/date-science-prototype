'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Sparkles, Zap, Shield, Infinity } from 'lucide-react';

const FREE_FEATURES = [
  { icon: Zap, text: '恋愛診断（パーソナリティ判定）' },
  { icon: Check, text: 'ナレッジ記事 3件/月' },
  { icon: Check, text: 'AI相性マッチング 5件/月' },
  { icon: Check, text: 'デート振り返り 無制限' },
  { icon: Check, text: '恋愛偏差値データ閲覧' },
];

const PREMIUM_FEATURES = [
  { icon: Infinity, text: 'ナレッジ記事 全2,400件 無制限' },
  { icon: Infinity, text: 'AI相性マッチング 無制限' },
  { icon: Sparkles, text: '詳細AI分析レポート 毎週' },
  { icon: Sparkles, text: 'パーソナライズされたデート提案' },
  { icon: Shield, text: '1対1 AIコーチング（月2回）' },
  { icon: Sparkles, text: '成婚率データに基づくアドバイス' },
];

export default function PlanContent() {
  const router = useRouter();

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
          <h1 className="text-lg font-bold text-white">プラン詳細</h1>
          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Hero */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">DateScience プラン</h2>
          <p className="text-sm text-slate-400">
            データに基づく恋愛パーソナルジム。<br/>
            あなたの目標に合わせてプランをお選びください。
          </p>
        </div>

        {/* Free Plan */}
        <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-lg">フリー</h3>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">¥0</span>
              <span className="text-xs text-slate-500">/月</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            まずは基本機能で恋愛のデータ化を体験
          </p>
          <ul className="space-y-3 mb-5">
            {FREE_FEATURES.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <item.icon size={16} className="text-emerald-400 shrink-0" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <div className="py-3 rounded-xl border border-slate-600 text-center text-slate-400 text-sm font-bold">
            現在のプラン
          </div>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-2xl p-5 border-2 border-rose-500/50 relative overflow-hidden">
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded">
            人気No.1
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-rose-400" />
              <h3 className="font-bold text-white text-lg">プレミアム</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-rose-400">¥2,980</span>
              <span className="text-xs text-slate-500">/月</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 mb-4">
            成婚率1.8倍。全機能使い放題で最短ルートへ
          </p>
          <ul className="space-y-3 mb-5">
            {PREMIUM_FEATURES.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-200">
                <item.icon size={16} className="text-rose-400 shrink-0" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="block w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-center transition-colors shadow-lg shadow-rose-500/25"
          >
            プレミアムにアップグレード
          </Link>
          <p className="text-[10px] text-slate-500 text-center mt-2">
            いつでもキャンセル可能。初月50%OFFキャンペーン中
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h4 className="font-bold text-slate-200 text-sm mb-3">機能比較</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-400 font-normal">機能</th>
                  <th className="text-center py-2 text-slate-400 font-normal">フリー</th>
                  <th className="text-center py-2 text-rose-400 font-normal">プレミアム</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700/50">
                  <td className="py-2">ナレッジ記事</td>
                  <td className="text-center py-2">3件/月</td>
                  <td className="text-center py-2 text-rose-400">無制限</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-2">AIマッチング</td>
                  <td className="text-center py-2">5件/月</td>
                  <td className="text-center py-2 text-rose-400">無制限</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-2">AIコーチング</td>
                  <td className="text-center py-2">—</td>
                  <td className="text-center py-2 text-rose-400">月2回</td>
                </tr>
                <tr>
                  <td className="py-2">成婚サポート</td>
                  <td className="text-center py-2">—</td>
                  <td className="text-center py-2 text-rose-400">〇</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <h4 className="font-bold text-slate-200 text-sm mb-3">よくある質問</h4>
          <details className="mb-3">
            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
              解約はいつでもできますか？
            </summary>
            <p className="text-xs text-slate-500 mt-1 pl-2">
              はい。いつでもマイページから解約可能です。解約後も月末までは利用できます。
            </p>
          </details>
          <details className="mb-3">
            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
              支払い方法は？
            </summary>
            <p className="text-xs text-slate-500 mt-1 pl-2">
              クレジットカード（VISA/Mastercard/AMEX/JCB）、Apple Pay、Google Payに対応しています。
            </p>
          </details>
          <details>
            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300">
              無料から有料に切り替えるとどうなりますか？
            </summary>
            <p className="text-xs text-slate-500 mt-1 pl-2">
              即座に全機能がアンロックされます。既存のデータはそのまま引き継がれます。
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
