import { MapPin, Lightbulb, TrendingUp } from 'lucide-react';
import type { User, Match, Knowledge, ConflictQuestion } from './types';

// モックユーザーデータ
export const MOCK_USER: User = {
  name: "ケンジ",
  age: 29,
  grade: "B+",
  type: "論理的解決型 (Logical Solver)",
  stats: {
    conversation: 75,
    empathy: 60,
    logic: 85,
    appearance: 70,
    planning: 80
  }
};

// モックマッチングデータ
export const MOCK_MATCHES: Match[] = [
  {
    id: 1,
    name: "アヤカ",
    age: 27,
    job: "データアナリスト",
    score: 94,
    compatibility: "S",
    reason: "双方が議論を好むため、建設的な関係が築けます。コンフリクト解決スタイルが一致しています。",
    tags: ["自立型", "朝型", "インドア派"],
    imgColor: "bg-rose-200",
    imageSrc: "/images/ayaka.png"
  },
  {
    id: 2,
    name: "ミオ",
    age: 28,
    job: "UIデザイナー",
    score: 88,
    compatibility: "A",
    reason: "あなたの論理性を彼女の感性が補完する関係です。ただし、感情共有のフェーズで丁寧な対話が必要です。",
    tags: ["共有型", "アウトドア", "美食家"],
    imgColor: "bg-blue-200",
    imageSrc: "/images/mio.png"
  },
  {
    id: 3,
    name: "サトミ",
    age: 30,
    job: "コンサルタント",
    score: 82,
    compatibility: "B+",
    reason: "キャリア観は非常に合致しますが、生活リズムの調整が必要です。",
    tags: ["バリキャリ", "夜型", "読書"],
    imgColor: "bg-emerald-200",
    imageSrc: "/images/satomi.png"
  }
];

// モックナレッジデータ
export const MOCK_KNOWLEDGE: Knowledge[] = [
  {
    id: 1,
    category: "デートコース",
    title: "【成婚率Aランク】初対面で会話が弾む「並列座り」カフェ3選",
    description: "対面よりもカウンター席の方が、論理型ユーザーの緊張を緩和し、成婚率が15%向上するというデータがあります。",
    tags: ["渋谷/恵比寿", "予算:¥2,000", "静かさ:★★★"],
    likes: 342,
    icon: MapPin
  },
  {
    id: 2,
    category: "会話ナレッジ",
    title: "沈黙が怖くなくなる「あえてのタメ」技術",
    description: "成功者の会話ログ分析：沈黙を3秒許容することで、相手の発話量が20%増加します。",
    tags: ["会話術", "心理学", "即実践"],
    likes: 890,
    icon: Lightbulb
  },
  {
    id: 3,
    category: "成功事例",
    title: "【30代男性・論理型】3回目のデートで告白するためのロードマップ",
    description: "実際に成婚したユーザーの行動ログから導き出された、最適な連絡頻度とデート間隔。",
    tags: ["ケーススタディ", "再現性高"],
    likes: 567,
    icon: TrendingUp
  }
];

// コンフリクト解決質問
export const CONFLICT_QUESTIONS: ConflictQuestion[] = [
  {
    id: 1,
    text: "約束のデート当日、相手が仕事で1時間遅れると連絡がありました。あなたの反応は？",
    options: [
      { label: "待ち時間にカフェで仕事をするので問題ないと伝える", type: "logic" },
      { label: "寂しい気持ちを伝えつつ、気をつけて来てねと言う", type: "emotion" },
      { label: "今回はリスケジュールしようと提案する", type: "avoid" }
    ]
  },
  {
    id: 2,
    text: "将来の家計管理について意見が食い違いました。どう解決する？",
    options: [
      { label: "Excelでシミュレーションを作り、数字で最適解を探す", type: "logic" },
      { label: "お互いの不安な点を話し合い、妥協点を探る", type: "emotion" },
      { label: "とりあえず共通の財布を作り、残りは干渉しない", type: "avoid" }
    ]
  }
];

// レーダーチャートのラベル
export const RADAR_LABELS = {
  conversation: "会話力",
  empathy: "共感力",
  logic: "論理性",
  appearance: "清潔感",
  planning: "計画性"
} as const;
