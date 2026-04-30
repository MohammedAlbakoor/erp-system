'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SelectField, DatePicker } from '@/components/ui/FormFields';
import { ERPLineChart, ERPBarChart, ERPPieChart } from '@/components/ui/Charts';

const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000 }, { month: 'Feb', revenue: 38000, expenses: 32000 },
  { month: 'Mar', revenue: 55000, expenses: 27000 }, { month: 'Apr', revenue: 49000, expenses: 35000 },
  { month: 'May', revenue: 62000, expenses: 31000 }, { month: 'Jun', revenue: 58000, expenses: 29000 },
  { month: 'Jul', revenue: 71000, expenses: 38000 }, { month: 'Aug', revenue: 65000, expenses: 34000 },
  { month: 'Sep', revenue: 78000, expenses: 42000 }, { month: 'Oct', revenue: 72000, expenses: 39000 },
  { month: 'Nov', revenue: 85000, expenses: 45000 }, { month: 'Dec', revenue: 92000, expenses: 48000 },
];

const salesByRep = [
  { name: 'Sarah J.', sales: 156000 }, { name: 'James W.', sales: 132000 },
  { name: 'Alice B.', sales: 98000 }, { name: 'Bob D.', sales: 87000 },
  { name: 'Carol M.', sales: 76000 },
];

const departmentCosts = [
  { name: 'Engineering', value: 280000 }, { name: 'Sales', value: 180000 },
  { name: 'Marketing', value: 120000 }, { name: 'Operations', value: 95000 },
  { name: 'HR', value: 65000 }, { name: 'Finance', value: 55000 },
];

const inventoryTurnover = [
  { month: 'Jan', ratio: 4.2 }, { month: 'Feb', ratio: 3.8 }, { month: 'Mar', ratio: 5.1 },
  { month: 'Apr', ratio: 4.5 }, { month: 'May', ratio: 5.3 }, { month: 'Jun', ratio: 4.9 },
];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
}

export default function ReportsPage() {
  const [period, setPeriod] = useState('yearly');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Reports & Analytics</h1>
            <p className="text-sm text-[var(--muted)]">Comprehensive business analytics and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <SelectField label="" options={[{ value: 'yearly', label: 'This Year' }, { value: 'quarterly', label: 'This Quarter' }, { value: 'monthly', label: 'This Month' }]} value={period} onChange={(e) => setPeriod((e.target as HTMLSelectElement).value)} />
            <Button variant="outline">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Export PDF
            </Button>
            <Button variant="outline">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
              Export Excel
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Gross Revenue" value={formatCurrency(767000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} changeType="positive" change="+18.2% YoY" />
          <StatCard title="Net Profit" value={formatCurrency(339000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1" /></svg>} changeType="positive" change="44.2% margin" />
          <StatCard title="Avg Order Value" value={formatCurrency(4825)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>} changeType="positive" change="+5.3%" />
          <StatCard title="Customer Lifetime" value="24 months" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Revenue vs Expenses</h3>
            <ERPLineChart data={revenueData} xKey="month" yKey="revenue" yLabel="Revenue" />
          </Card>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Sales by Representative</h3>
            <ERPBarChart data={salesByRep} xKey="name" yKey="sales" yLabel="Sales" color="#8b5cf6" />
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Department Costs</h3>
            <ERPPieChart data={departmentCosts} nameKey="name" valueKey="value" />
          </Card>
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Inventory Turnover Rate</h3>
            <ERPLineChart data={inventoryTurnover} xKey="month" yKey="ratio" yLabel="Turnover Ratio" />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
