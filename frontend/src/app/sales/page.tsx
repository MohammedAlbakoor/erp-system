'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard, Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { InputField, SelectField, TextareaField } from '@/components/ui/FormFields';
import { ERPBarChart, ERPLineChart } from '@/components/ui/Charts';
import { usePaginatedFetch } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { Customer, Lead, Invoice } from '@/types';

const tabs = ['Customers', 'Leads', 'Invoices'];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
}

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { data: customers, pagination: custPag, loading: custLoad, refetch: custRefetch, setSearchQuery: setCustSearch } = usePaginatedFetch<Customer>('/customers');
  const { data: leads, pagination: leadPag, loading: leadLoad, refetch: leadRefetch } = usePaginatedFetch<Lead>('/leads');
  const { data: invoices, pagination: invPag, loading: invLoad, refetch: invRefetch } = usePaginatedFetch<Invoice>('/invoices');
  const [customerForm, setCustomerForm] = useState({ name: '', email: '', phone: '', company: '', address: '', city: '', country: '' });

  const customerColumns: Column<Customer>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'company', header: 'Company', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'city', header: 'City' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const leadColumns: Column<Lead>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'company', header: 'Company' },
    { key: 'email', header: 'Email' },
    { key: 'source', header: 'Source' },
    { key: 'estimated_value', header: 'Est. Value', render: (item) => formatCurrency(item.estimated_value || 0), className: 'text-right' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const invoiceColumns: Column<Invoice>[] = [
    { key: 'number', header: 'Invoice #', sortable: true },
    { key: 'customer', header: 'Customer', render: (item) => <span>{item.customer?.name || '-'}</span> },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'total', header: 'Total', render: (item) => formatCurrency(item.total), className: 'text-right' },
    { key: 'amount_paid', header: 'Paid', render: (item) => formatCurrency(item.amount_paid), className: 'text-right' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const handleCreateCustomer = async () => {
    try {
      await api.post('/customers', customerForm);
      toast.success('Customer created');
      setShowModal(false);
      custRefetch();
    } catch {
      toast.error('Failed to create customer');
    }
  };

  const monthlySales = [
    { month: 'Jan', sales: 32 }, { month: 'Feb', sales: 28 }, { month: 'Mar', sales: 45 },
    { month: 'Apr', sales: 38 }, { month: 'May', sales: 52 }, { month: 'Jun', sales: 48 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Sales & CRM</h1>
            <p className="text-sm text-[var(--muted)]">Manage customers, leads, and invoices</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ New Customer</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Customers" value="8" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} changeType="positive" change="+3 this month" />
          <StatCard title="Open Leads" value="24" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />
          <StatCard title="Monthly Revenue" value={formatCurrency(92000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} changeType="positive" change="+15.3%" />
          <StatCard title="Conversion Rate" value="32%" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} changeType="positive" change="+2.1%" />
        </div>

        <div className="border-b border-[var(--border-color)]">
          <nav className="flex gap-4">
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} className={`border-b-2 px-1 py-3 text-sm font-medium transition-colors ${activeTab === i ? 'border-primary-600 text-primary-600' : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'}`}>
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 0 && <DataTable columns={customerColumns} data={customers} loading={custLoad} pagination={custPag} searchable onSearch={setCustSearch} searchPlaceholder="Search customers..." actions={() => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button><Button size="sm" variant="ghost">Edit</Button></div>} />}
        {activeTab === 1 && <DataTable columns={leadColumns} data={leads} loading={leadLoad} pagination={leadPag} searchable emptyMessage="No leads found" actions={() => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button></div>} />}
        {activeTab === 2 && <DataTable columns={invoiceColumns} data={invoices} loading={invLoad} pagination={invPag} searchable emptyMessage="No invoices found" actions={() => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button><Button size="sm" variant="ghost">PDF</Button></div>} />}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Customer" size="lg" footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button onClick={handleCreateCustomer}>Create Customer</Button></>}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Name" value={customerForm.name} onChange={(e) => setCustomerForm({ ...customerForm, name: (e.target as HTMLInputElement).value })} required />
              <InputField label="Company" value={customerForm.company} onChange={(e) => setCustomerForm({ ...customerForm, company: (e.target as HTMLInputElement).value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Email" type="email" value={customerForm.email} onChange={(e) => setCustomerForm({ ...customerForm, email: (e.target as HTMLInputElement).value })} />
              <InputField label="Phone" value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: (e.target as HTMLInputElement).value })} />
            </div>
            <InputField label="Address" value={customerForm.address} onChange={(e) => setCustomerForm({ ...customerForm, address: (e.target as HTMLInputElement).value })} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="City" value={customerForm.city} onChange={(e) => setCustomerForm({ ...customerForm, city: (e.target as HTMLInputElement).value })} />
              <InputField label="Country" value={customerForm.country} onChange={(e) => setCustomerForm({ ...customerForm, country: (e.target as HTMLInputElement).value })} />
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
