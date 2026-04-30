'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard, Card } from '@/components/ui/Card';
import { ERPLineChart, ERPBarChart, ERPPieChart } from '@/components/ui/Charts';
import { StatusBadge } from '@/components/ui/Badge';
import { useFetch } from '@/hooks/useApi';
import type { DashboardStats } from '@/types';

const mockRevenueData = [
  { month: 'Jan', revenue: 42000 }, { month: 'Feb', revenue: 38000 }, { month: 'Mar', revenue: 55000 },
  { month: 'Apr', revenue: 49000 }, { month: 'May', revenue: 62000 }, { month: 'Jun', revenue: 58000 },
  { month: 'Jul', revenue: 71000 }, { month: 'Aug', revenue: 65000 }, { month: 'Sep', revenue: 78000 },
  { month: 'Oct', revenue: 72000 }, { month: 'Nov', revenue: 85000 }, { month: 'Dec', revenue: 92000 },
];

const mockSalesByCategory = [
  { name: 'Electronics', value: 45000 }, { name: 'Furniture', value: 28000 }, { name: 'Software', value: 18000 },
  { name: 'Office Supplies', value: 12000 }, { name: 'Raw Materials', value: 8000 },
];

const mockTopProducts = [
  { name: 'Laptop Pro 15"', sales: 156, revenue: 202944 }, { name: 'Monitor 27"', sales: 98, revenue: 44099 },
  { name: 'Standing Desk', sales: 67, revenue: 40199 }, { name: 'Ergonomic Chair', sales: 54, revenue: 21599 },
  { name: 'Mechanical Keyboard', sales: 142, revenue: 14199 },
];

const mockRecentInvoices = [
  { number: 'INV-000042', customer: 'Acme Corp', total: 12500, status: 'paid' },
  { number: 'INV-000041', customer: 'TechStart Inc', total: 8750, status: 'pending' },
  { number: 'INV-000040', customer: 'Global Solutions', total: 15200, status: 'overdue' },
  { number: 'INV-000039', customer: 'Peak Performance', total: 3400, status: 'paid' },
  { number: 'INV-000038', customer: 'Digital Dynamics', total: 22100, status: 'partially_paid' },
];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
}

export default function DashboardPage() {
  const { data: stats } = useFetch<DashboardStats>('/dashboard');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-[var(--muted)]">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats?.total_revenue || 767000)}
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            change="+12.5% from last month"
            changeType="positive"
            tooltip="Total revenue year to date"
          />
          <StatCard
            title="Customers"
            value={stats?.total_customers || 156}
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            change="+8 new this month"
            changeType="positive"
          />
          <StatCard
            title="Active Projects"
            value={stats?.active_projects || 12}
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
            change="3 due this week"
            changeType="neutral"
          />
          <StatCard
            title="Overdue Invoices"
            value={stats?.overdue_invoices || 5}
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>}
            change="$18,500 outstanding"
            changeType="negative"
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Revenue Trend</h3>
            <ERPLineChart data={mockRevenueData} xKey="month" yKey="revenue" yLabel="Revenue" />
          </Card>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Sales by Category</h3>
            <ERPPieChart data={mockSalesByCategory} nameKey="name" valueKey="value" />
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Products */}
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Top Products</h3>
            <ERPBarChart data={mockTopProducts} xKey="name" yKey="sales" yLabel="Units Sold" color="#22c55e" height={250} />
          </Card>

          {/* Recent Invoices */}
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Recent Invoices</h3>
            <div className="space-y-3">
              {mockRecentInvoices.map((inv) => (
                <div key={inv.number} className="flex items-center justify-between rounded-lg border border-[var(--border-color)] p-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{inv.number}</p>
                    <p className="text-xs text-[var(--muted)]">{inv.customer}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{formatCurrency(inv.total)}</span>
                    <StatusBadge status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
