import { LucideIcon } from 'lucide-react';

// ユーザー統計情報
export interface UserStats {
  [key: string]: number;
  conversation: number;
  empathy: number;
  logic: number;
  appearance: number;
  planning: number;
}

// ユーザー情報
export interface User {
  name: string;
  age: number;
  grade: string;
  type: string;
  stats: UserStats;
}

// マッチング相手情報
export interface Match {
  id: number;
  name: string;
  age: number;
  job: string;
  score: number;
  compatibility: string;
  reason: string;
  tags: string[];
  imgColor: string;
  imageSrc?: string;
}

// ナレッジ記事情報
export interface Knowledge {
  id: number;
  category: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  icon: LucideIcon;
  content?: KnowledgeContent;
}

// ナレッジ詳細コンテンツ
export interface KnowledgeContent {
  introduction: string;
  sections: KnowledgeSection[];
  keyTakeaways: string[];
  successRate?: string;
  dataSource?: string;
}

export interface KnowledgeSection {
  heading: string;
  content: string;
  tips?: string[];
}

// 6軸関係性スコア
export interface RelationshipScores {
  [key: string]: number;
  values: number;       // 価値観整合
  repair: number;       // 修復力
  trust: number;        // 信頼
  communication: number; // コミュニケーション質
  independence: number;  // 自立バランス
  intimacy: number;      // 親密性
}

// チェックインデータ
export interface CheckIn {
  id: number;
  date: string;
  conflict: number;    // 衝突度 0-100
  trust: number;       // 信頼度 0-100
  intimacy: number;    // 親密度 0-100
  tags: string[];
  note: string;
}

// ネクストアクション
export interface NextAction {
  id: number;
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

// 月次レビューデータ
export interface MonthlyReview {
  month: string;        // "2024-01" 形式
  overallScore: number;
  relationshipScores: RelationshipScores;
  highlights: string[];
  challenges: string[];
  aiSummary: string;
  nextActions: NextAction[];
}

// リスクアラート
export interface RiskAlert {
  id: number;
  level: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
}

// デート前支援 - 会話トピック
export interface ConversationTopic {
  id: number;
  topic: string;
  riskLevel: 'safe' | 'moderate' | 'bold';
  reason: string;
}

// デート前支援 - デートコース提案
export interface DateCourse {
  id: number;
  name: string;
  budget: string;
  reason: string;
  location: string;
}

// デート前支援 - チェックリスト項目
export interface PrepCheckItem {
  id: number;
  label: string;
  checked: boolean;
}

// 改善提案
export interface ImprovementSuggestion {
  id: number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

// コンフリクト解決質問の選択肢
export interface ConflictOption {
  label: string;
  type: 'logic' | 'emotion' | 'avoid';
}

// コンフリクト解決質問
export interface ConflictQuestion {
  id: number;
  text: string;
  options: ConflictOption[];
}
