'use client';

interface BadgeProps {
  children: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  secondary: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const variantMap: Record<string, BadgeProps['variant']> = {
    active: 'success', paid: 'success', completed: 'success', approved: 'success', done: 'success',
    closed_won: 'success', present: 'success', accepted: 'success',
    pending: 'warning', draft: 'warning', todo: 'warning', new: 'warning', planning: 'warning',
    submitted: 'warning', prospecting: 'warning',
    overdue: 'danger', cancelled: 'danger', rejected: 'danger', lost: 'danger', terminated: 'danger',
    closed_lost: 'danger', failed: 'danger', absent: 'danger',
    in_progress: 'info', processing: 'info', sent: 'info', contacted: 'info', proposal: 'info',
    negotiation: 'info', in_review: 'info', inspecting: 'info',
    on_hold: 'secondary', on_leave: 'secondary', qualified: 'secondary', partially_paid: 'secondary',
    inactive: 'default', resigned: 'default',
  };
  const variant = variantMap[status] || 'default';
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return <Badge variant={variant}>{label}</Badge>;
}
