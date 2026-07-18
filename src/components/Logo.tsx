import Link from 'next/link';
import { Route } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { badge: 'w-7 h-7', icon: 15, text: 'text-lg' },
  md: { badge: 'w-9 h-9', icon: 18, text: 'text-xl' },
  lg: { badge: 'w-11 h-11', icon: 22, text: 'text-2xl' },
};

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const { badge, icon, text } = sizeConfig[size];

  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span
        className={`${badge} flex items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-teal-800 shadow-sm transition-transform duration-300 group-hover:rotate-6`}
      >
        <Route size={icon} className="text-white" strokeWidth={2.4} />
      </span>
      <span
        className={`font-heading font-extrabold tracking-tight ${text} ${textColor}`}
      >
        Roam<span className="text-orange-500">ly</span>
      </span>
    </Link>
  );
}
