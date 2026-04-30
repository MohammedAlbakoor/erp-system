'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { InputField, SelectField, TextareaField } from '@/components/ui/FormFields';
import { usePaginatedFetch } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { PurchaseOrder, Supplier } from '@/types';

const tabs = ['Purchase Orders', 'Suppliers'];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
}

export default function PurchasingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { data: orders, pagination: poPag, loading: poLoad, refetch: poRefetch } = usePaginatedFetch<PurchaseOrder>('/purchase-orders');
  const { data: suppliers, pagination: supPag, loading: supLoad } = usePaginatedFetch<Supplier>('/suppliers');

  const poColumns: Column<PurchaseOrder>[] = [
    { key: 'number', header: 'PO #', sortable: true },
    { key: 'supplier', header: 'Supplier', render: (item) => <span>{item.supplier?.name || '-'}</span> },
    { key: 'order_date', header: 'Date', sortable: true },
    { key: 'total', header: 'Total', render: (item) => formatCurrency(item.total), className: 'text-right' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const supplierColumns: Column<Supplier>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'company', header: 'Company' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'payment_terms', header: 'Payment Terms' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const handleApprove = async (id: number) => {
    try {
      await api.post(`/purchase-orders/${id}/approve`);
      toast.success('Purchase order approved');
      poRefetch();
    } catch {
      toast.error('Failed to approve');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Purchasing</h1>
            <p className="text-sm text-[var(--muted)]">Manage purchase orders and suppliers</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ New Purchase Order</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Open POs" value="7" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
          <StatCard title="Pending Approval" value="3" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} changeType="negative" change="Needs action" />
          <StatCard title="Suppliers" value="5" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
          <StatCard title="Monthly Spend" value={formatCurrency(145000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1" /></svg>} changeType="negative" change="+8.2%" />
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

        {activeTab === 0 && (
          <DataTable columns={poColumns} data={orders} loading={poLoad} pagination={poPag} searchable emptyMessage="No purchase orders found" actions={(item) => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button>{(item as unknown as PurchaseOrder).status === 'submitted' && <Button size="sm" variant="primary" onClick={() => handleApprove((item as unknown as PurchaseOrder).id)}>Approve</Button>}</div>} />
        )}
        {activeTab === 1 && (
          <DataTable columns={supplierColumns} data={suppliers} loading={supLoad} pagination={supPag} searchable searchPlaceholder="Search suppliers..." actions={() => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button><Button size="sm" variant="ghost">Edit</Button></div>} />
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Purchase Order" size="lg" footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button>Create PO</Button></>}>
          <div className="space-y-4">
            <SelectField label="Supplier" options={suppliers.map((s) => ({ value: String(s.id), label: s.name }))} placeholder="Select supplier" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Order Date" type="date" />
              <InputField label="Expected Date" type="date" />
            </div>
            <TextareaField label="Notes" />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
