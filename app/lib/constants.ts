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

// マッチング後の推奨アプローチ・デートコース（matchIdごと）
export const MATCH_RECOMMENDATIONS: Record<number, {
  approaches: { title: string; description: string; tip: string }[];
  dateCourses: { name: string; area: string; budget: string; description: string }[];
}> = {
  1: {
    approaches: [
      {
        title: "仕事の話から入る",
        description: "データアナリストという共通の土壌があるため、分析や数字の話題で盛り上がりやすいです。",
        tip: "「最近どんな分析してます？」から始めると会話が弾む確率92%"
      },
      {
        title: "議論を楽しむ姿勢を見せる",
        description: "自立型で議論好きなため、意見の違いを恐れず建設的に話すと好感度UP。",
        tip: "「そういう考え方もあるね」と受け止めてから自分の意見を"
      },
      {
        title: "朝の時間帯に連絡",
        description: "朝型のため、7-9時のメッセージは既読率が高い傾向に。",
        tip: "「おはよう、今日も良い1日に」で自然な距離感を"
      }
    ],
    dateCourses: [
      { name: "BLUE BOTTLE 青山", area: "表参道", budget: "¥2,000", description: "カウンター席で並列座り。コーヒーの話から仕事観の共有へ。" },
      { name: "六本木 展望ラウンジ", area: "六本木", budget: "¥3,500", description: "夜景×知的な会話。2回目デートに最適。" },
      { name: "代々木公園 散歩→カフェ", area: "代々木", budget: "¥1,500", description: "インドア派だが自然の話題は好み。運動量は控えめに。" }
    ]
  },
  2: {
    approaches: [
      {
        title: "感性を褒める",
        description: "UIデザイナーとして感性が仕事。デザインや美意識の話題で共感を示す。",
        tip: "「この配色、センスいいね」と具体的に褒める"
      },
      {
        title: "感情への共感を意識",
        description: "論理型のあなたは「事実」で返しがち。まず「それ、大変だったね」と共感を。",
        tip: "共感→事実の順で返すと信頼感が増す"
      },
      {
        title: "美食の話題で誘う",
        description: "美食家タグ。新しいレストランやカフェの情報を共有すると反応が良い。",
        tip: "「最近○○に行ったんだけど」と具体的な体験を"
      }
    ],
    dateCourses: [
      { name: "渋谷 美術館×カフェ", area: "渋谷", budget: "¥2,500", description: "アート鑑賞で感性の共有。その後カフェで感想を。" },
      { name: "恵比寿 隠れ家レストラン", area: "恵比寿", budget: "¥4,000", description: "美食家向け。こだわりの食材と空間が話題に。" },
      { name: "代々木公園 ピクニック", area: "代々木", budget: "¥2,000", description: "アウトドア派。手作りお弁当で心が伝わる。" }
    ]
  },
  3: {
    approaches: [
      {
        title: "キャリアの話を共有",
        description: "バリキャリ同士。仕事の話から入ると距離が縮まりやすい。",
        tip: "「最近どんなプロジェクト？」で共通点を探る"
      },
      {
        title: "夜の時間帯を提案",
        description: "夜型のため、19時以降のデート提案が成功率高い。",
        tip: "「週末の夜、空いてる？」で誘う"
      },
      {
        title: "読書の趣味を掘る",
        description: "読書好き。最近読んだ本の話で知的な会話を。",
        tip: "「最近ハマってる本ある？」で趣味の深掘り"
      }
    ],
    dateCourses: [
      { name: "丸の内 ビジネスランチ", area: "丸の内", budget: "¥3,000", description: "1回目はランチで。仕事の話から自然に。" },
      { name: "神保町 古書店巡り", area: "神保町", budget: "¥3,500", description: "読書好き向け。古書店で共通の趣味を発見。" },
      { name: "六本木 バー", area: "六本木", budget: "¥4,000", description: "夜型向け。落ち着いたバーで2回目デート。" }
    ]
  }
};

// モックナレッジデータ
export const MOCK_KNOWLEDGE: Knowledge[] = [
  {
    id: 1,
    category: "デートコース",
    title: "【成婚率Aランク】初対面で会話が弾む「並列座り」カフェ3選",
    description: "対面よりもカウンター席の方が、論理型ユーザーの緊張を緩和し、成婚率が15%向上するというデータがあります。",
    tags: ["渋谷/恵比寿", "予算:¥2,000", "静かさ:★★★"],
    likes: 342,
    icon: MapPin,
    content: {
      introduction: "初対面のデートで最も重要なのは「会話の心理的安全性」です。対面座席よりもカウンター席（並列座り）を選ぶことで、視線のプレッシャーが軽減され、自然な会話が生まれやすくなります。当社のデータ分析では、並列座りを選んだカップルの2回目デート成功率が15%向上することが判明しました。",
      sections: [
        {
          heading: "1. BLUE BOTTLE COFFEE 青山カフェ",
          content: "広々としたカウンター席が特徴的な、開放感のあるカフェ。窓際のカウンター席は外の景色を眺めながら会話ができ、沈黙も自然に感じられます。コーヒーの淹れ方を見ながら話すきっかけも作りやすい。",
          tips: [
            "平日15時-17時が比較的空いています",
            "カウンター席は予約不可のため、開店直後がおすすめ",
            "コーヒーの香りが会話の緊張をほぐす効果あり"
          ]
        },
        {
          heading: "2. Streamer Coffee Company 渋谷",
          content: "バリスタとの距離が近く、コーヒーについての質問がきっかけで会話が広がりやすい設計。ロースト度合いやフレーバーノートについて聞くことで、自然に2人の会話も深まります。",
          tips: [
            "「どれがおすすめですか？」から始める鉄板トーク",
            "テイスティングシートを使った会話展開が可能",
            "混雑時は近くの公園でテイクアウトも◎"
          ]
        },
        {
          heading: "3. Fuglen Tokyo 代々木公園",
          content: "ノルウェー発のカフェで、北欧のインテリアが話題のきっかけに。カウンター席からは職人技のラテアートが見られ、共通の興味として会話が弾みます。",
          tips: [
            "インテリアの話題で趣味嗜好を自然に探れる",
            "「旅行好きですか？」への布石として最適",
            "ヴィンテージ家具が会話のネタになる"
          ]
        }
      ],
      keyTakeaways: [
        "並列座りは視線プレッシャーを40%軽減",
        "共通の観察対象（バリスタ、景色）が沈黙を自然にする",
        "「何を飲みますか？」は低リスクな最初の質問",
        "カウンター席は滞在時間の調整がしやすい"
      ],
      successRate: "85%",
      dataSource: "2023年ユーザー行動ログ 1,248件のデータから算出"
    }
  },
  {
    id: 2,
    category: "会話ナレッジ",
    title: "沈黙が怖くなくなる「あえてのタメ」技術",
    description: "成功者の会話ログ分析：沈黙を3秒許容することで、相手の発話量が20%増加します。",
    tags: ["会話術", "心理学", "即実践"],
    likes: 890,
    icon: Lightbulb,
    content: {
      introduction: "会話の沈黙を恐れるあまり、相手の話を遮ったり、一方的に話し続けてしまう失敗パターンは非常に多く見られます。しかし、心理学の研究では「3秒の沈黙」は相手に思考の時間を与え、より深い発言を引き出すことが証明されています。成婚率の高いユーザーの会話ログを分析したところ、意図的な沈黙を使いこなしていることがわかりました。",
      sections: [
        {
          heading: "なぜ沈黙が効果的なのか",
          content: "人間の脳は「空白を埋めたい」という心理的欲求を持っています。あなたが沈黙を作ることで、相手は「もっと話さなきゃ」と感じ、より本音に近い発言をする傾向があります。特に初対面では、表面的な情報交換で終わらないために、この技術が重要です。",
          tips: [
            "相手が話し終えてから3秒待つ（心の中で「1、2、3」と数える）",
            "焦って質問を重ねない",
            "相手の目を優しく見つめながら待つ"
          ]
        },
        {
          heading: "実践的な使い方",
          content: "相手が「趣味は読書です」と答えた場合、すぐに「どんな本を読むんですか？」と聞くのではなく、3秒間の間を取ります。すると相手は自然に「最近は○○の本にハマってて...」と詳しく話し始めます。この「自発的な追加情報」が、会話の深さを生み出します。",
          tips: [
            "「へえ〜（3秒の間）」だけで続きを引き出せる",
            "質問ではなく相槌で間を作る",
            "メモを取るフリをして自然な間を演出"
          ]
        },
        {
          heading: "失敗パターンの回避",
          content: "ただし、7秒以上の沈黙は逆効果です。また、無表情での沈黙は「興味がない」と誤解されます。重要なのは「興味を持って待っている」ことが伝わる表情と姿勢です。",
          tips: [
            "微笑みながら待つ",
            "体は相手の方に向けたまま",
            "7秒を超えたら次の質問へ"
          ]
        }
      ],
      keyTakeaways: [
        "3秒の沈黙で相手の発話量が20%増加",
        "自発的な発言は相手の本音を含みやすい",
        "沈黙は「考える時間」のプレゼント",
        "表情と姿勢で「待っている」意図を伝える"
      ],
      successRate: "78%",
      dataSource: "成婚ユーザー342名の初回デート会話ログ分析"
    }
  },
  {
    id: 3,
    category: "成功事例",
    title: "【30代男性・論理型】3回目のデートで告白するためのロードマップ",
    description: "実際に成婚したユーザーの行動ログから導き出された、最適な連絡頻度とデート間隔。",
    tags: ["ケーススタディ", "再現性高"],
    likes: 567,
    icon: TrendingUp,
    content: {
      introduction: "「いつ告白すればいいのか」は多くの人が悩むポイントです。早すぎると軽く見られ、遅すぎると友達ゾーンに入ってしまいます。当社のデータ分析では、論理型ユーザーの場合、3回目のデートで告白するパターンが最も成功率が高いことがわかりました（成功率73%）。ここでは実際の成功事例をもとに、再現性のあるロードマップを紹介します。",
      sections: [
        {
          heading: "1回目デート：信頼関係の構築（所要時間: 2-3時間）",
          content: "目的は「この人と一緒にいると楽しい」と思ってもらうこと。カフェやランチなど、短時間で終わる場所を選びます。重要なのは「次も会いたい」と思わせる程度で終わらせること。",
          tips: [
            "会話の7割は相手に話してもらう",
            "共通の趣味や価値観を1つ見つける",
            "次回の約束を具体的に決めずに別れる（焦りを見せない）",
            "当日夜に「今日は楽しかったです」とシンプルなメッセージ"
          ]
        },
        {
          heading: "1回目と2回目の間（推奨: 5-7日間）",
          content: "連絡頻度は2-3日に1回。相手の反応速度に合わせることが重要です。内容は「この前話していた○○、面白そうですね」など、デートの内容を踏まえた軽いメッセージ。LINE通話は避け、文字でのやり取りのみ。",
          tips: [
            "相手が返信するまでの平均時間に合わせる",
            "質問攻めにしない",
            "デート中の話題の続きを振る"
          ]
        },
        {
          heading: "2回目デート：距離を縮める（所要時間: 3-4時間）",
          content: "ディナーや映画など、1回目より少し長い時間を共有します。ここで物理的な距離も縮めます（隣に座る、軽いボディタッチなど）。感情面での深い話題にも触れ、「特別な関係になりたい」という空気を作ります。",
          tips: [
            "「実は...」という話題を1つ共有する",
            "相手の良いところを具体的に褒める（3回以上）",
            "デート終わりに「次はいつ会えますか？」と聞く",
            "3回目デートを1週間以内に設定"
          ]
        },
        {
          heading: "2回目と3回目の間（推奨: 4-6日間）",
          content: "連絡頻度を上げます（毎日1-2回）。「おはよう」「おやすみ」などの挨拶を自然に入れ、日常を共有する感覚を作ります。ここで相手の生活リズムや価値観をさらに理解します。",
          tips: [
            "相手の忙しい時間帯を把握して避ける",
            "写真や画像を使って視覚的なコミュニケーション",
            "「次会うの楽しみ」など期待感を高める"
          ]
        },
        {
          heading: "3回目デート：告白（所要時間: 4-5時間）",
          content: "夕方から夜にかけての時間帯を選びます。ディナー→散歩の流れが理想的。告白は静かな場所（公園のベンチ、夜景が見える場所）で、真剣に伝えます。",
          tips: [
            "「ちょっと真面目な話があるんだけど」と前置き",
            "好きになった理由を具体的に（2-3個）",
            "「付き合ってください」とストレートに",
            "返事を急かさない（その場で答えが出なくてもOK）"
          ]
        }
      ],
      keyTakeaways: [
        "3回目デートの告白成功率: 73%（論理型ユーザー）",
        "デート間隔は5-7日が最適（長すぎず短すぎず）",
        "連絡頻度は段階的に増やす（焦りを見せない）",
        "告白は具体的な理由とともにストレートに"
      ],
      successRate: "73%",
      dataSource: "論理型ユーザー156名の成婚までのログデータ"
    }
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

// 6軸関係性スコアのラベル
export const RELATIONSHIP_LABELS = {
  values: "価値観整合",
  repair: "修復力",
  trust: "信頼",
  communication: "コミュ質",
  independence: "自立バランス",
  intimacy: "親密性"
} as const;

// モック6軸関係性スコア
export const MOCK_RELATIONSHIP_SCORES: import('./types').RelationshipScores = {
  values: 78,
  repair: 65,
  trust: 82,
  communication: 71,
  independence: 88,
  intimacy: 60
};

// モックチェックイン履歴
export const MOCK_CHECKINS: import('./types').CheckIn[] = [
  {
    id: 1,
    date: "2024-01-14",
    conflict: 20,
    trust: 75,
    intimacy: 68,
    tags: ["穏やかな週", "デートなし"],
    note: "今週は落ち着いた一週間でした。LINEでの会話が増えた。"
  },
  {
    id: 2,
    date: "2024-01-07",
    conflict: 45,
    trust: 70,
    intimacy: 72,
    tags: ["小さな衝突", "仲直り済"],
    note: "予定のすれ違いで少し揉めたが、話し合いで解決できた。"
  },
  {
    id: 3,
    date: "2024-01-01",
    conflict: 10,
    trust: 80,
    intimacy: 85,
    tags: ["イベント", "良い時間"],
    note: "年末年始を一緒に過ごした。とても良い時間だった。"
  }
];

// モック月次レビュー
export const MOCK_MONTHLY_REVIEWS: import('./types').MonthlyReview[] = [
  {
    month: "2024-01",
    overallScore: 74,
    relationshipScores: { values: 78, repair: 65, trust: 82, communication: 71, independence: 88, intimacy: 60 },
    highlights: [
      "信頼スコアが前月比+5ポイント上昇",
      "週3回以上のコミュニケーションを維持",
      "衝突後の修復スピードが改善"
    ],
    challenges: [
      "親密性スコアが目標値を下回っている",
      "感情共有の頻度が低い",
      "デートの計画が相手任せになりがち"
    ],
    aiSummary: "今月は信頼構築に大きな進展がありました。特に衝突後の対話姿勢が改善されています。来月は親密性を高めるため、感情を言語化する練習を意識しましょう。具体的には「今こう感じている」と伝える回数を増やすことを推奨します。",
    nextActions: [
      {
        id: 1,
        title: "「今こう感じている」を1日1回伝える",
        description: "感情の言語化を習慣にするため、日常の小さな感情（嬉しい・ありがたい等）を相手にLINEや対面で伝えましょう。親密性スコア+8ptが見込めます。",
        deadline: "毎日（2月末まで継続）",
        category: "親密性",
        priority: "high"
      },
      {
        id: 2,
        title: "週末デートを自分から提案する",
        description: "「相手任せ」の課題を改善するため、今月は自分からデートプランを2回以上提案しましょう。場所・時間・予算まで具体的に決めるのがポイントです。",
        deadline: "2月第2週までに1回目を実施",
        category: "計画性",
        priority: "high"
      },
      {
        id: 3,
        title: "相手の話に「共感→質問」のセットで返す",
        description: "会話中に相手の感情に共感した上で掘り下げ質問をするパターンを意識しましょう。例：「それは嬉しいね！どんなところが一番良かった？」",
        deadline: "次回デートから実践",
        category: "コミュニケーション",
        priority: "medium"
      },
      {
        id: 4,
        title: "毎週チェックインを欠かさず記録",
        description: "データが蓄積されることでAI分析の精度が向上します。日曜夜に5分で振り返りを入力する習慣をつけましょう。",
        deadline: "毎週日曜 21:00",
        category: "データ蓄積",
        priority: "medium"
      }
    ]
  },
  {
    month: "2023-12",
    overallScore: 68,
    relationshipScores: { values: 75, repair: 58, trust: 77, communication: 66, independence: 85, intimacy: 55 },
    highlights: [
      "価値観の擦り合わせが進んだ",
      "自立バランスが良好",
    ],
    challenges: [
      "修復力のスコアが低い",
      "コミュニケーションの質に課題",
    ],
    aiSummary: "12月は忙しい時期ながらも関係維持ができました。修復力の改善が来月の課題です。衝突時に「まず相手の話を聞く」姿勢を意識しましょう。",
    nextActions: [
      {
        id: 1,
        title: "衝突時に「まず30秒相手の話を聞く」ルールを実践",
        description: "反論したくなっても30秒間は聞き役に徹しましょう。修復力スコアが最も伸びやすいアクションです。",
        deadline: "次の意見の相違時から即実践",
        category: "修復力",
        priority: "high"
      },
      {
        id: 2,
        title: "LINEで「今日どうだった？」を週3回送る",
        description: "日常会話の頻度を上げることでコミュニケーションの質が底上げされます。短文でOKなので継続を重視しましょう。",
        deadline: "月・水・金の夜",
        category: "コミュニケーション",
        priority: "high"
      },
      {
        id: 3,
        title: "相手の好きな食べ物リストを作成する",
        description: "相手への関心を行動で示すことで信頼スコアが向上します。会話の中で出てきた好みをメモしておきましょう。",
        deadline: "1月中旬までに5個以上",
        category: "信頼構築",
        priority: "medium"
      }
    ]
  }
];

// モックリスクアラート
export const MOCK_RISK_ALERTS: import('./types').RiskAlert[] = [
  {
    id: 1,
    level: "medium",
    title: "コミュニケーション頻度の低下",
    description: "先週と比較してメッセージのやり取りが40%減少しています。相手からの返信間隔も長くなっています。",
    action: "今日中に近況を尋ねるメッセージを送りましょう"
  },
  {
    id: 2,
    level: "low",
    title: "デート間隔が空いている",
    description: "前回のデートから2週間が経過しています。定期的な対面コミュニケーションが信頼維持に重要です。",
    action: "今週末のデートプランを提案しましょう"
  }
];

// モック改善提案
export const MOCK_IMPROVEMENTS: import('./types').ImprovementSuggestion[] = [
  {
    id: 1,
    title: "感情表現の練習",
    description: "「嬉しい」「楽しい」などの感情を具体的に伝える回数を増やしましょう。論理型の方は特に効果的です。",
    impact: "high",
    category: "コミュニケーション"
  },
  {
    id: 2,
    title: "サプライズの計画",
    description: "小さなサプライズ（好きなスイーツを買っていくなど）で親密性スコアが向上します。",
    impact: "medium",
    category: "親密性"
  },
  {
    id: 3,
    title: "共通の趣味を探す",
    description: "二人で一緒に楽しめる新しいアクティビティを見つけましょう。共通体験が信頼を深めます。",
    impact: "medium",
    category: "信頼構築"
  }
];

// マッチ相手別の会話トピック提案
export const MATCH_CONVERSATION_TOPICS: Record<number, import('./types').ConversationTopic[]> = {
  1: [ // アヤカ（データアナリスト・自立型・朝型・インドア派）
    {
      id: 1, topic: "仕事で使っている分析ツールやデータの話",
      riskLevel: "safe",
      reason: "あなたもロジカル型。データの話は双方の得意分野で自然に盛り上がる",
      opener: "普段どんなツールで分析してます？最近Pythonばっかりで…",
      openerReply: "私もPython派！最近はdbtとか使い始めてて、データ基盤の整備にハマってます",
      followUp: "一番面白かった分析結果ってどんなやつでした？",
      followUpReply: "ユーザーの離脱分析で、意外な原因が見つかったときは鳥肌立ちました（笑）"
    },
    {
      id: 2, topic: "朝の過ごし方・モーニングルーティン",
      riskLevel: "safe",
      reason: "朝型同士の共通点。ライフスタイルの相性を自然に確認できる",
      opener: "朝型って聞いたんですけど、朝って何時くらいに起きるんですか？",
      openerReply: "6時くらいかな。朝の静かな時間にコーヒー淹れるのが好きで",
      followUp: "おすすめの朝カフェとかあります？今度行ってみたい",
      followUpReply: "青山のBLUE BOTTLE、朝イチだと空いてておすすめですよ！"
    },
    {
      id: 3, topic: "最近ハマっているインドアの楽しみ方",
      riskLevel: "safe",
      reason: "インドア派のタグあり。Netflix・ゲーム・読書など共通点が見つかりやすい",
      opener: "休日インドアで過ごすの好きなんですけど、最近何か観てます？",
      openerReply: "最近ドキュメンタリーにハマってて。データで社会問題を解析する系の",
      followUp: "それ気になってた！どのシリーズがおすすめ？",
      followUpReply: "Netflixの「データの真実」ってやつ、分析好きならハマると思う！"
    },
    {
      id: 4, topic: "お互いの議論スタイルについて",
      riskLevel: "moderate",
      reason: "AI分析で「議論を好む」タイプ同士。相性を体感できるが、白熱しすぎ注意",
      opener: "意見が違ったとき、割とはっきり言う方ですか？",
      openerReply: "はい、むしろ遠慮されるより言ってほしいタイプです。建設的なのが前提ですけど",
      followUp: "僕もそうで。建設的に話せる人って実は少ないから嬉しいです",
      followUpReply: "わかります！感情的にならずに議論できるの大事ですよね"
    },
    {
      id: 5, topic: "5年後のキャリアビジョン",
      riskLevel: "moderate",
      reason: "自立型で仕事への意識が高い。将来設計の話で価値観の深い部分に触れられる",
      opener: "データアナリストって今すごい需要あるけど、この先どうしていきたいとかあります？",
      openerReply: "データサイエンティストとしてもっと上流に行きたいなって。意思決定に関わる立場に",
      followUp: "かっこいいですね。自分もエンジニアリングの先にマネジメントを考えてて",
      followUpReply: "お互いキャリア大事にしたいタイプなんですね。それって安心感ある"
    },
    {
      id: 6, topic: "パートナーに一番求めること",
      riskLevel: "bold",
      reason: "自立型同士だからこそ距離感の考え方が重要。深い話だがハマれば一気に親密に",
      opener: "自立してる人って、逆にパートナーには何を求めるんだろうって気になってて",
      openerReply: "うーん…お互いの時間を尊重しつつ、大事なときに一緒にいてくれる人かな",
      followUp: "わかる。僕も一人の時間は大事にしたいタイプで",
      followUpReply: "それ聞いて安心した。べったりされると逆に疲れちゃうので"
    }
  ],
  2: [ // ミオ（UIデザイナー・共有型・アウトドア・美食家）
    {
      id: 1, topic: "最近のUIデザインで感動したアプリやサイト",
      riskLevel: "safe",
      reason: "仕事への情熱を引き出しやすい。あなたが知らない世界を教えてもらう姿勢が好印象",
      opener: "UIデザインって気になってて。最近これすごいなって思ったアプリとかあります？",
      openerReply: "Notionのリデザインがすごく良くて！情報設計が美しいんです",
      followUp: "どこがすごいか教えてほしい！全然詳しくなくて",
      followUpReply: "ユーザーの動線が自然で、考えなくても使えるところ。語り出すと長いですよ（笑）"
    },
    {
      id: 2, topic: "最近見つけた美味しいお店",
      riskLevel: "safe",
      reason: "美食家タグあり。食の話は鉄板で、次のデートの約束にも繋げやすい",
      opener: "美味しいもの好きって聞いて嬉しくて。最近のヒットのお店あります？",
      openerReply: "恵比寿の隠れ家イタリアン！パスタが本当に美味しくて通ってます",
      followUp: "そこ気になる！今度一緒に行きません？",
      followUpReply: "いいですね！予約取りますか？金曜の夜とか空いてます"
    },
    {
      id: 3, topic: "おすすめのアウトドアスポット",
      riskLevel: "safe",
      reason: "アウトドア派。体験の共有提案で距離が縮まりやすい",
      opener: "アウトドア好きなんですね！最近どこか行きました？",
      openerReply: "先週、奥多摩でハイキングしてきました！紅葉がすごかった",
      followUp: "写真とかあったら見たい！",
      followUpReply: "見てください〜！ここの景色、本当にきれいだったんです"
    },
    {
      id: 4, topic: "デザインと論理、どっちが大事？",
      riskLevel: "moderate",
      reason: "感性派と論理派の違いを楽しめるが、相手の感性を否定しないこと",
      opener: "デザインって直感的に決める？それともロジックで詰める？",
      openerReply: "最初は直感で、そのあとロジックで検証する感じかな。両方大事",
      followUp: "なるほど、そういう視点なかった。僕はロジックから入っちゃうタイプで",
      followUpReply: "それぞれ得意なところ違うの、面白いですよね。補い合えそう"
    },
    {
      id: 5, topic: "一緒にいて心地いい関係って？",
      riskLevel: "bold",
      reason: "共有型なので関係性への考え方を聞くと本音が出やすい。タイミング重要",
      opener: "ミオさんにとって、一緒にいて楽って思える関係ってどういうのですか？",
      openerReply: "日常の小さなことを共有できる関係かな。「今日こんなことあったよ」って言い合える",
      followUp: "すごくわかる。僕も何気ない会話を大切にしたいタイプで",
      followUpReply: "嬉しい。そういうの大事にしてくれる人って少ないから"
    }
  ],
  3: [ // サトミ（コンサルタント・バリキャリ・夜型・読書）
    {
      id: 1, topic: "最近読んで面白かった本",
      riskLevel: "safe",
      reason: "読書タグあり。知的好奇心の方向性で価値観が見える",
      opener: "読書好きって書いてあったんですけど、最近のおすすめあります？",
      openerReply: "「FACTFULNESS」にハマりました。データで世界を見る系が好きで",
      followUp: "その著者の他の本も読んだことあります？",
      followUpReply: "はい！ハンス・ロスリングの講演動画もおすすめです"
    },
    {
      id: 2, topic: "コンサルの仕事で印象的だったプロジェクト",
      riskLevel: "safe",
      reason: "キャリア観の一致度が高い相手。仕事の話で共感ポイントが多い",
      opener: "コンサルって色んな業界見れて面白そう。最近どんな案件やってるんですか？",
      openerReply: "今はDX推進のプロジェクトに入ってて。レガシーな企業を変えていくのがやりがいです",
      followUp: "それってどう解決していくんですか？聞いてるだけで面白い",
      followUpReply: "まず現場のヒアリングからですね。データだけじゃ見えないことが多くて"
    },
    {
      id: 3, topic: "夜型ならではの楽しみ方",
      riskLevel: "safe",
      reason: "夜型同士の共通点として盛り上がりやすい。デートの時間帯提案にも繋がる",
      opener: "夜型なんですね、僕も遅くまで起きてるタイプで。夜中って何してます？",
      openerReply: "本読んだり、Netflixで海外ドラマ観たり。深夜の静けさが好きなんです",
      followUp: "深夜のあの集中力ってたまらないですよね",
      followUpReply: "わかる！朝型の人にはわからないあの感覚（笑）"
    },
    {
      id: 4, topic: "仕事とプライベートの境界線",
      riskLevel: "moderate",
      reason: "バリキャリ同士。生活リズムの課題を先に共有することでリスク回避にもなる",
      opener: "お互い忙しいと思うんですけど、オフの切り替えってどうしてます？",
      openerReply: "正直、難しいですね…でも週末はなるべくオフにするようにしてます",
      followUp: "忙しい同士でもちゃんと時間作りたいタイプなんで、それ聞いて安心しました",
      followUpReply: "私も同じです。限られた時間だからこそ大切にしたい"
    },
    {
      id: 5, topic: "10年後どんな暮らしをしていたいか",
      riskLevel: "bold",
      reason: "キャリア重視の相手に将来像を聞くことで、関係の本気度を互いに測れる",
      opener: "サトミさんって10年後、どんな生活イメージしてますか？",
      openerReply: "独立してフリーのコンサルやりつつ、パートナーとゆったり暮らしたいかな",
      followUp: "僕は仕事も大事だけど、パートナーとの時間も同じくらい大切にしたくて",
      followUpReply: "その考え方、すごく好きです。仕事だけの人生はつまらないですもんね"
    }
  ]
};

// モックデートコース提案
export const MOCK_DATE_COURSES: import('./types').DateCourse[] = [
  { id: 1, name: "代官山カフェ巡り + 散歩コース", budget: "¥3,000〜5,000", reason: "並列座りで会話しやすく、移動中も自然に距離が縮まる", location: "代官山・恵比寿" },
  { id: 2, name: "チームラボ体験 + ディナー", budget: "¥8,000〜12,000", reason: "共通体験で話題が生まれやすく、非日常感が好印象", location: "豊洲・お台場" },
  { id: 3, name: "料理教室デート", budget: "¥5,000〜8,000", reason: "協力作業で自然な距離感。相手の性格も見える", location: "渋谷・表参道" }
];

// モック準備チェックリスト
export const MOCK_PREP_CHECKLIST: import('./types').PrepCheckItem[] = [
  { id: 1, label: "身だしなみチェック（髪・服・爪）", checked: false },
  { id: 2, label: "待ち合わせ場所・時間の最終確認", checked: false },
  { id: 3, label: "会話トピックを3つ以上準備", checked: false },
  { id: 4, label: "お店の予約確認", checked: false },
  { id: 5, label: "充電・財布・ハンカチの確認", checked: false },
  { id: 6, label: "相手のプロフィールを再確認", checked: false }
];

// エリア別デートプラン
export const MOCK_DATE_PLANS: Record<string, import('./types').DatePlan[]> = {
  "渋谷": [
    {
      id: 1,
      title: "渋谷カルチャー満喫コース",
      theme: "カフェ × アート × ディナー",
      totalBudget: "¥6,000〜9,000",
      totalTime: "約4.5時間",
      matchScore: 92,
      spots: [
        { id: 1, name: "Streamer Coffee Company", category: "cafe", time: "14:00", duration: "45min", budget: "¥800", description: "バリスタとの距離が近い、会話が生まれるカフェ。カウンター席で並列座りが可能。", tip: "ラテアートの話題で自然にアイスブレイク", area: "渋谷" },
        { id: 2, name: "PARCO GALLERY", category: "activity", time: "15:00", duration: "60min", budget: "¥0〜1,000", description: "渋谷PARCOのギャラリースペース。現代アートの展示で感性の共有ができる。", tip: "「どの作品が好き？」で価値観を探れる", area: "渋谷" },
        { id: 3, name: "奥渋谷エリア散歩", category: "walk", time: "16:15", duration: "30min", budget: "¥0", description: "神山町〜富ヶ谷の裏通りを散策。おしゃれなショップが点在し、話題に困らない。", tip: "歩きながらだと深い話がしやすい", area: "奥渋谷" },
        { id: 4, name: "BISTRO ROJIURA", category: "restaurant", time: "17:00", duration: "90min", budget: "¥4,000〜6,000", description: "隠れ家フレンチビストロ。カウンター席あり。予約推奨。", tip: "「ここ前から気になってて」で計画性アピール", area: "奥渋谷" }
      ],
      aiComment: "論理型のあなたには、共通の話題が自然に生まれる「体験共有型」コースが最適。アートで感性の話をした後のディナーは会話が深まりやすいです。"
    },
    {
      id: 2,
      title: "渋谷リラックスデートコース",
      theme: "公園 × カフェ × 映画",
      totalBudget: "¥4,000〜6,000",
      totalTime: "約4時間",
      matchScore: 85,
      spots: [
        { id: 1, name: "代々木公園", category: "walk", time: "13:00", duration: "45min", budget: "¥0", description: "広々とした公園で散歩。天気が良ければベンチでのんびり。", tip: "自然の中だとリラックスして本音が出やすい", area: "代々木" },
        { id: 2, name: "Fuglen Tokyo", category: "cafe", time: "14:00", duration: "60min", budget: "¥1,200", description: "北欧インテリアのおしゃれカフェ。インテリアが話題のきっかけに。", tip: "「旅行好きですか？」への布石として最適", area: "代々木公園" },
        { id: 3, name: "Bunkamura ル・シネマ", category: "activity", time: "15:30", duration: "120min", budget: "¥1,800", description: "ミニシアター系の映画館。感想を語り合える作品が多い。", tip: "映画後の感想共有で価値観が見える", area: "渋谷" }
      ],
      aiComment: "インドア派の相手には、適度な屋外＋カフェ＋映画の組み合わせが好印象。映画の感想でお互いの感性を確認できます。"
    }
  ],
  "恵比寿": [
    {
      id: 3,
      title: "恵比寿グルメ大人デート",
      theme: "ワイン × イタリアン × 夜景",
      totalBudget: "¥8,000〜12,000",
      totalTime: "約3.5時間",
      matchScore: 88,
      spots: [
        { id: 1, name: "恵比寿ガーデンプレイス", category: "walk", time: "17:00", duration: "30min", budget: "¥0", description: "季節のイルミネーションが美しいスポット。写真撮影の口実で距離が縮まる。", tip: "「写真撮ろう」で自然なスキンシップ", area: "恵比寿" },
        { id: 2, name: "Il Baffone", category: "restaurant", time: "17:45", duration: "90min", budget: "¥5,000〜7,000", description: "本格イタリアンの隠れ家。パスタが絶品。カウンター席で並列座り可能。", tip: "「シェアしません？」で料理を分け合う", area: "恵比寿" },
        { id: 3, name: "Bar TRENCH", category: "bar", time: "19:30", duration: "60min", budget: "¥2,500〜4,000", description: "スピークイージースタイルのバー。落ち着いた雰囲気で深い会話ができる。", tip: "バーテンダーにおすすめを聞くと会話のきっかけに", area: "恵比寿" }
      ],
      aiComment: "美食家の相手には恵比寿のグルメコースが刺さります。ディナー→バーの流れは大人の余裕を演出でき、2回目以降のデートに最適です。"
    }
  ],
  "表参道": [
    {
      id: 4,
      title: "表参道おしゃれ散策コース",
      theme: "ショップ × カフェ × ディナー",
      totalBudget: "¥5,000〜8,000",
      totalTime: "約4時間",
      matchScore: 86,
      spots: [
        { id: 1, name: "表参道ヒルズ", category: "shop", time: "14:00", duration: "45min", budget: "¥0", description: "建築とショップを楽しめるスポット。ウィンドウショッピングで趣味嗜好を探れる。", tip: "「これ似合いそう」で相手への関心を示す", area: "表参道" },
        { id: 2, name: "OMOTESANDO KOFFEE", category: "cafe", time: "15:00", duration: "45min", budget: "¥800", description: "和のテイストを取り入れたコーヒースタンド。テイクアウトして裏通り散策も◎", tip: "テイクアウトで「一緒に歩こう」の自然な流れに", area: "表参道" },
        { id: 3, name: "裏原宿〜キャットストリート", category: "walk", time: "16:00", duration: "40min", budget: "¥0", description: "個性的なショップが並ぶストリート。話題に困らず自然にお互いのセンスがわかる。", tip: "お互いの好みの違いを楽しむ余裕を", area: "裏原宿" },
        { id: 4, name: "CITABRIA", category: "restaurant", time: "17:00", duration: "90min", budget: "¥4,000〜6,000", description: "南青山の隠れ家レストラン。野菜料理が豊富でヘルシー志向の相手にも好印象。", tip: "「健康に気を使ってる？」で生活観の話題へ", area: "南青山" }
      ],
      aiComment: "デザイナーやクリエイティブ系の相手には表参道がおすすめ。街自体がコンテンツなので沈黙を気にせず歩けます。"
    }
  ]
};
