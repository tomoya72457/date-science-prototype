# DateScience - 恋愛のパーソナルジム

Next.js App Router + TypeScript + Tailwind CSSで構築された恋愛支援アプリケーションです。

## 🚀 セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリを確認できます。

## 📁 プロジェクト構造

```
app/
├── components/           # コンポーネント
│   ├── asset/           # /asset ページ用パーツ
│   ├── dashboard/       # /dashboard ページ用パーツ
│   ├── knowledge/       # /knowledge ページ用パーツ
│   ├── matching/        # /matching ページ用パーツ
│   ├── onboarding/      # /onboarding ページ用パーツ
│   ├── review/          # /review ページ用パーツ
│   ├── welcome/         # トップページ用パーツ
│   └── shared/          # 共通コンポーネント
│       ├── BottomNav.tsx    # ナビゲーションバー
│       └── RadarChart.tsx   # レーダーチャート
├── lib/
│   ├── constants.ts     # 定数データ
│   └── types.ts         # TypeScript型定義
├── asset/              # データ資産ページ
├── dashboard/          # ダッシュボードページ
├── knowledge/          # ナレッジページ
├── matching/           # マッチングページ
├── onboarding/         # オンボーディングページ
├── review/             # 振り返りページ
├── layout.tsx          # ルートレイアウト
├── page.tsx            # トップページ (Welcome)
└── globals.css         # グローバルスタイル
```

## 🎨 技術スタック

- **Next.js 15** - App Router
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Lucide React** - アイコン

## 📱 ページ構成

| ルート | 説明 |
|--------|------|
| `/` | ウェルカムページ (LP) |
| `/onboarding` | 診断フロー |
| `/dashboard` | ホームダッシュボード |
| `/matching` | マッチング一覧 |
| `/knowledge` | ナレッジ記事 |
| `/review` | デート振り返り |
| `/asset` | データ資産 (偏差値) |

## 🔧 ビルド

本番環境用のビルドを生成:

```bash
npm run build
```

本番サーバーの起動:

```bash
npm start
```

## 📝 開発ガイドライン

- **Server Component優先**: 可能な限りServer Componentを使用
- **Client Component**: ユーザー操作が必要な場合のみ `'use client'` を使用
- **コンポーネント分割**: ページごとにコンポーネントを分割し、再利用性を重視
- **型安全性**: `lib/types.ts` で型定義を一元管理

## 🎯 主な機能

- ✅ 恋愛診断フロー
- ✅ AI相性マッチング
- ✅ データ資産の可視化
- ✅ ナレッジ記事の閲覧
- ✅ デート振り返り機能
- ✅ パーソナライズドダッシュボード
