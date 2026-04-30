'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge } from '@/components/ui/Badge';
import { InputField, SelectField } from '@/components/ui/FormFields';
import { usePaginatedFetch } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { Employee } from '@/types';

const tabs = ['Employees', 'Attendance', 'Leave Requests', 'Payroll'];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
}

export default function HRPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { data: employees, pagination, loading, refetch, setSearchQuery } = usePaginatedFetch<Employee>('/employees');

  const employeeColumns: Column<Employee>[] = [
    { key: 'employee_id', header: 'ID', sortable: true },
    { key: 'user', header: 'Name', render: (item) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
          {item.user?.name?.charAt(0) || '?'}
        </div>
        <div>
          <p className="text-sm font-medium">{item.user?.name}</p>
          <p className="text-xs text-[var(--muted)]">{item.user?.email}</p>
        </div>
      </div>
    )},
    { key: 'position', header: 'Position' },
    { key: 'department', header: 'Department', render: (item) => <span>{item.department?.name || '-'}</span> },
    { key: 'hire_date', header: 'Hire Date', sortable: true },
    { key: 'base_salary', header: 'Salary', render: (item) => formatCurrency(item.base_salary), className: 'text-right' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const handleCheckIn = async (id: number) => {
    try {
      await api.post(`/employees/${id}/check-in`);
      toast.success('Checked in successfully');
    } catch {
      toast.error('Check-in failed');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Human Resources</h1>
            <p className="text-sm text-[var(--muted)]">Manage employees, attendance, and payroll</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ Add Employee</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Employees" value="10" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
          <StatCard title="On Leave Today" value="2" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
          <StatCard title="Pending Leave" value="4" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} changeType="negative" change="Needs review" />
          <StatCard title="Monthly Payroll" value={formatCurrency(680000)} icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
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
          <DataTable
            columns={employeeColumns}
            data={employees}
            loading={loading}
            pagination={pagination}
            searchable
            onSearch={setSearchQuery}
            searchPlaceholder="Search employees..."
            actions={(item) => (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleCheckIn((item as unknown as Employee).id)}>Check In</Button>
                <Button size="sm" variant="ghost">View</Button>
              </div>
            )}
          />
        )}
        {activeTab === 1 && <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center text-[var(--muted)]">Attendance records loaded from /api/v1/employees/:id (check-in/check-out)</div>}
        {activeTab === 2 && <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center text-[var(--muted)]">Leave requests managed via /api/v1/employees/:id/leave-request</div>}
        {activeTab === 3 && <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center text-[var(--muted)]">Payroll generated via /api/v1/employees/:id/payroll</div>}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Employee" size="lg" footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button>Create</Button></>}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Employee ID" placeholder="EMP-0001" required />
              <SelectField label="Department" options={[{ value: '1', label: 'Engineering' }, { value: '2', label: 'Sales' }, { value: '3', label: 'Marketing' }, { value: '4', label: 'HR' }, { value: '5', label: 'Finance' }]} placeholder="Select department" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Position" required />
              <InputField label="Hire Date" type="date" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Base Salary" type="number" required />
              <SelectField label="Employment Type" options={[{ value: 'full_time', label: 'Full Time' }, { value: 'part_time', label: 'Part Time' }, { value: 'contract', label: 'Contract' }, { value: 'intern', label: 'Intern' }]} />
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
