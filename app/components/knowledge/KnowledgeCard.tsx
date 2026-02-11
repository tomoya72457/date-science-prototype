import Link from 'next/link';
import type { Knowledge } from '@/app/lib/types';

interface KnowledgeCardProps {
  knowledge: Knowledge;
}

export default function KnowledgeCard({ knowledge }: KnowledgeCardProps) {
  const Icon = knowledge.icon;

  return (
    <Link 
      href={`/knowledge/${knowledge.id}`}
      className="block bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
          {knowledge.category}
        </span>
        <div className="flex items-center gap-1 text-slate-500 text-xs">
          <Icon size={14} />
          <span>{knowledge.likes}</span>
        </div>
      </div>
      
      <h3 className="font-bold text-slate-200 text-sm mb-2 group-hover:text-rose-400 transition-colors">
        {knowledge.title}
      </h3>
      
      <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
        {knowledge.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {knowledge.tags.map(tag => (
          <span key={tag} className="text-[10px] text-slate-500">#{tag}</span>
        ))}
      </div>
    </Link>
  );
}
