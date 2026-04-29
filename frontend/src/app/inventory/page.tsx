'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard, Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { InputField, SelectField, TextareaField } from '@/components/ui/FormFields';
import { usePaginatedFetch } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { Product } from '@/types';

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
}

export default function InventoryPage() {
  const [showModal, setShowModal] = useState(false);
  const { data: products, pagination, loading, refetch, setSearchQuery } = usePaginatedFetch<Product>('/products');
  const [form, setForm] = useState({ name: '', sku: '', description: '', category_id: '', cost_price: '', selling_price: '', unit: 'pcs', reorder_level: '10' });

  const columns: Column<Product>[] = [
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'name', header: 'Product Name', sortable: true },
    { key: 'category', header: 'Category', render: (item) => <span>{item.category?.name || '-'}</span> },
    { key: 'cost_price', header: 'Cost', render: (item) => formatCurrency(item.cost_price), className: 'text-right' },
    { key: 'selling_price', header: 'Price', render: (item) => formatCurrency(item.selling_price), className: 'text-right' },
    { key: 'total_stock', header: 'Stock', sortable: true, render: (item) => {
      const stock = item.total_stock || 0;
      const isLow = stock <= item.reorder_level;
      return <span className={`font-medium ${isLow ? 'text-danger-500' : 'text-success-600'}`}>{stock}</span>;
    }},
    { key: 'is_active', header: 'Status', render: (item) => <StatusBadge status={item.is_active ? 'active' : 'inactive'} /> },
  ];

  const handleSubmit = async () => {
    try {
      await api.post('/products', {
        ...form,
        cost_price: Number(form.cost_price),
        selling_price: Number(form.selling_price),
        category_id: Number(form.category_id) || null,
        reorder_level: Number(form.reorder_level),
      });
      toast.success('Product created');
      setShowModal(false);
      setForm({ name: '', sku: '', description: '', category_id: '', cost_price: '', selling_price: '', unit: 'pcs', reorder_level: '10' });
      refetch();
    } catch {
      toast.error('Failed to create product');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-sm text-[var(--muted)]">Manage products, stock levels, and warehouses</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ Add Product</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Products" value="12" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} />
          <StatCard title="Low Stock Items" value="3" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>} changeType="negative" change="Needs reorder" />
          <StatCard title="Warehouses" value="3" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
          <StatCard title="Total Stock Value" value={formatCurrency(452850)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} changeType="positive" change="+3.4%" />
        </div>

        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          pagination={pagination}
          searchable
          onSearch={setSearchQuery}
          searchPlaceholder="Search products..."
          emptyMessage="No products found"
          actions={(item) => (
            <div className="flex gap-1">
              <Button size="sm" variant="ghost">Edit</Button>
              <Button size="sm" variant="ghost" className="text-danger-500">Delete</Button>
            </div>
          )}
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product" size="lg" footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button onClick={handleSubmit}>Create Product</Button></>}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })} required />
              <InputField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: (e.target as HTMLInputElement).value })} required />
            </div>
            <TextareaField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: (e.target as HTMLTextAreaElement).value })} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Cost Price" type="number" value={form.cost_price} onChange={(e) => setForm({ ...form, cost_price: (e.target as HTMLInputElement).value })} required />
              <InputField label="Selling Price" type="number" value={form.selling_price} onChange={(e) => setForm({ ...form, selling_price: (e.target as HTMLInputElement).value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: (e.target as HTMLSelectElement).value })} options={[{ value: 'pcs', label: 'Pieces' }, { value: 'kg', label: 'Kilograms' }, { value: 'box', label: 'Box' }, { value: 'ream', label: 'Ream' }, { value: 'pack', label: 'Pack' }, { value: 'license', label: 'License' }]} />
              <InputField label="Reorder Level" type="number" value={form.reorder_level} onChange={(e) => setForm({ ...form, reorder_level: (e.target as HTMLInputElement).value })} />
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
