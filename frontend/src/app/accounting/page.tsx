'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, StatCard } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { InputField, SelectField, TextareaField } from '@/components/ui/FormFields';
import { ERPBarChart } from '@/components/ui/Charts';
import { usePaginatedFetch } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { JournalEntry, Account } from '@/types';

const tabs = ['Journal Entries', 'Chart of Accounts', 'Reports'];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
}

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { data: entries, pagination, loading, refetch } = usePaginatedFetch<JournalEntry>('/journal-entries');
  const [form, setForm] = useState({ reference: '', date: '', description: '', lines: [{ account_id: '', debit: '', credit: '', description: '' }] });

  const journalColumns: Column<JournalEntry>[] = [
    { key: 'reference', header: 'Reference', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'description', header: 'Description' },
    { key: 'total_debit', header: 'Debit', render: (item) => formatCurrency(item.total_debit) },
    { key: 'total_credit', header: 'Credit', render: (item) => formatCurrency(item.total_credit) },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const handleSubmit = async () => {
    try {
      await api.post('/journal-entries', {
        ...form,
        lines: form.lines.map((l) => ({ ...l, debit: Number(l.debit) || 0, credit: Number(l.credit) || 0, account_id: Number(l.account_id) })),
      });
      toast.success('Journal entry created');
      setShowModal(false);
      refetch();
    } catch {
      toast.error('Failed to create journal entry');
    }
  };

  const addLine = () => setForm({ ...form, lines: [...form.lines, { account_id: '', debit: '', credit: '', description: '' }] });

  const monthlyExpenses = [
    { month: 'Jan', amount: 28000 }, { month: 'Feb', amount: 32000 }, { month: 'Mar', amount: 27000 },
    { month: 'Apr', amount: 35000 }, { month: 'May', amount: 31000 }, { month: 'Jun', amount: 29000 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Accounting</h1>
            <p className="text-sm text-[var(--muted)]">Manage your financial records</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ New Journal Entry</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Assets" value={formatCurrency(255000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} changeType="positive" change="+5.2%" />
          <StatCard title="Total Liabilities" value={formatCurrency(85000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>} changeType="negative" change="+2.1%" />
          <StatCard title="Revenue (MTD)" value={formatCurrency(92000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} changeType="positive" change="+15.3%" />
          <StatCard title="Expenses (MTD)" value={formatCurrency(29000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>} changeType="negative" change="+8.7%" />
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--border-color)]">
          <nav className="flex gap-4">
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${activeTab === i ? 'border-primary-600 text-primary-600' : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'}`}>
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 0 && (
          <DataTable columns={journalColumns} data={entries} loading={loading} pagination={pagination} searchable onSearch={() => {}} emptyMessage="No journal entries found" />
        )}

        {activeTab === 1 && (
          <Card>
            <h3 className="mb-4 text-lg font-semibold">Chart of Accounts</h3>
            <p className="text-sm text-[var(--muted)]">Account tree view available from the API at /api/v1/accounts</p>
          </Card>
        )}

        {activeTab === 2 && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card><h3 className="mb-4 text-lg font-semibold">Monthly Expenses</h3><ERPBarChart data={monthlyExpenses} xKey="month" yKey="amount" yLabel="Expenses" color="#ef4444" /></Card>
            <Card><h3 className="mb-4 text-lg font-semibold">Profit & Loss</h3><p className="text-sm text-[var(--muted)]">Available via /api/v1/reports/profit-loss</p></Card>
          </div>
        )}

        {/* Create Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Journal Entry" size="lg" footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button onClick={handleSubmit}>Create Entry</Button></>}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Reference" value={form.reference} onChange={(e) => setForm({ ...form, reference: (e.target as HTMLInputElement).value })} required />
              <InputField label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: (e.target as HTMLInputElement).value })} required />
            </div>
            <TextareaField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: (e.target as HTMLTextAreaElement).value })} />
            <div>
              <div className="flex items-center justify-between mb-2"><h4 className="text-sm font-semibold">Lines</h4><Button size="sm" variant="outline" onClick={addLine}>+ Add Line</Button></div>
              {form.lines.map((line, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                  <InputField label="Account ID" value={line.account_id} onChange={(e) => { const lines = [...form.lines]; lines[i].account_id = (e.target as HTMLInputElement).value; setForm({ ...form, lines }); }} />
                  <InputField label="Debit" type="number" value={line.debit} onChange={(e) => { const lines = [...form.lines]; lines[i].debit = (e.target as HTMLInputElement).value; setForm({ ...form, lines }); }} />
                  <InputField label="Credit" type="number" value={line.credit} onChange={(e) => { const lines = [...form.lines]; lines[i].credit = (e.target as HTMLInputElement).value; setForm({ ...form, lines }); }} />
                  <InputField label="Description" value={line.description} onChange={(e) => { const lines = [...form.lines]; lines[i].description = (e.target as HTMLInputElement).value; setForm({ ...form, lines }); }} />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
