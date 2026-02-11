import { LucideIcon } from 'lucide-react';

// ユーザー統計情報
export interface UserStats {
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
