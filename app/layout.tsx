import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DateScience - 恋愛のパーソナルジム',
  description: '感情をデータ化し、最短ルートで成婚へ。科学的アプローチで恋愛偏差値を可視化します。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <div className="bg-slate-950 min-h-screen text-slate-200 flex justify-center items-center p-0 md:p-8">
          {/* Mobile Frame Container */}
          <div className="w-full h-[100dvh] md:h-[750px] md:w-[390px] bg-slate-900 md:rounded-3xl shadow-2xl overflow-hidden relative border-0 md:border border-slate-800 flex flex-col">
            <main className="flex-1 overflow-hidden relative">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
