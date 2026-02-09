import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  borderColor: string;
}

export default function ActionCard({
  href,
  title,
  description,
  icon: Icon,
  iconBgColor,
  iconColor,
  borderColor
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className={`bg-slate-800 p-4 rounded-xl ${borderColor} flex justify-between items-center cursor-pointer hover:bg-slate-750 transition-colors shadow-md`}
    >
      <div>
        <h4 className="font-bold text-slate-200 text-sm">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <div className={`${iconBgColor} ${iconColor} p-2 rounded-lg`}>
        <Icon size={20} />
      </div>
    </Link>
  );
}
