'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover
    ? { whileHover: { y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }, transition: { duration: 0.2 } }
    : {};

  return (
    <Component
      className={`rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm ${className}`}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  tooltip?: string;
}

export function StatCard({ title, value, icon, change, changeType = 'neutral', tooltip }: StatCardProps) {
  return (
    <Card hover className="relative group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--muted)]">{title}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
          {change && (
            <p
              className={`mt-1 text-sm font-medium ${
                changeType === 'positive'
                  ? 'text-success-600'
                  : changeType === 'negative'
                  ? 'text-danger-500'
                  : 'text-[var(--muted)]'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30">
          {icon}
        </div>
      </div>
      {tooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </Card>
  );
}
