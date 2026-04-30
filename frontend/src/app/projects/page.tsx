'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatCard, Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { StatusBadge, Badge } from '@/components/ui/Badge';
import { InputField, SelectField, TextareaField } from '@/components/ui/FormFields';
import { usePaginatedFetch, useFetch } from '@/hooks/useApi';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import type { Project, Task } from '@/types';

const tabs = ['Projects', 'Kanban Board'];

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { data: projects, pagination, loading, refetch, setSearchQuery } = usePaginatedFetch<Project>('/projects');
  const { data: kanban } = useFetch<Record<string, Task[]>>(selectedProject ? `/projects/${selectedProject}/kanban` : '', [selectedProject]);

  const projectColumns: Column<Project>[] = [
    { key: 'name', header: 'Project', sortable: true },
    { key: 'manager', header: 'Manager', render: (item) => <span>{item.manager?.name || '-'}</span> },
    { key: 'start_date', header: 'Start', sortable: true },
    { key: 'end_date', header: 'End' },
    { key: 'budget', header: 'Budget', render: (item) => formatCurrency(item.budget || 0), className: 'text-right' },
    { key: 'progress', header: 'Progress', render: (item) => (
      <div className="flex items-center gap-2">
        <div className="h-2 w-20 rounded-full bg-gray-200 dark:bg-slate-700">
          <div className="h-full rounded-full bg-primary-600" style={{ width: `${item.progress}%` }} />
        </div>
        <span className="text-xs font-medium">{item.progress}%</span>
      </div>
    )},
    { key: 'priority', header: 'Priority', render: (item) => {
      const colors: Record<string, 'danger' | 'warning' | 'info' | 'default'> = { critical: 'danger', high: 'warning', medium: 'info', low: 'default' };
      return <Badge variant={colors[item.priority] || 'default'}>{item.priority}</Badge>;
    }},
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const kanbanColumns = ['todo', 'in_progress', 'in_review', 'done'];
  const kanbanLabels: Record<string, string> = { todo: 'To Do', in_progress: 'In Progress', in_review: 'In Review', done: 'Done' };
  const kanbanColors: Record<string, string> = { todo: 'bg-gray-500', in_progress: 'bg-blue-500', in_review: 'bg-amber-500', done: 'bg-green-500' };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Projects & Tasks</h1>
            <p className="text-sm text-[var(--muted)]">Track projects, tasks, and team progress</p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ New Project</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Projects" value="2" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
          <StatCard title="Total Tasks" value="28" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} />
          <StatCard title="Completed" value="14" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} changeType="positive" change="50% done" />
          <StatCard title="Overdue" value="3" icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>} changeType="negative" change="Needs attention" />
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
            columns={projectColumns}
            data={projects}
            loading={loading}
            pagination={pagination}
            searchable
            onSearch={setSearchQuery}
            onRowClick={(item) => { setSelectedProject((item as unknown as Project).id); setActiveTab(1); }}
            actions={() => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button><Button size="sm" variant="ghost">Edit</Button></div>}
          />
        )}

        {activeTab === 1 && (
          <div>
            {!selectedProject && <p className="text-center text-[var(--muted)] py-8">Select a project to view its Kanban board</p>}
            {selectedProject && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {kanbanColumns.map((col) => (
                  <div key={col} className="rounded-xl border border-[var(--border-color)] bg-gray-50 dark:bg-slate-800/50 p-3">
                    <div className="mb-3 flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${kanbanColors[col]}`} />
                      <h3 className="text-sm font-semibold">{kanbanLabels[col]}</h3>
                      <span className="ml-auto rounded-full bg-gray-200 dark:bg-slate-700 px-2 py-0.5 text-xs font-medium">{kanban?.[col]?.length || 0}</span>
                    </div>
                    <div className="space-y-2">
                      {(kanban?.[col] || []).map((task) => (
                        <div key={task.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <p className="text-sm font-medium">{task.title}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant={task.priority === 'critical' ? 'danger' : task.priority === 'high' ? 'warning' : 'default'}>{task.priority}</Badge>
                            {task.assignee && (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                {task.assignee.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Project" size="lg" footer={<><Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button><Button>Create Project</Button></>}>
          <div className="space-y-4">
            <InputField label="Project Name" required />
            <TextareaField label="Description" />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Start Date" type="date" required />
              <InputField label="End Date" type="date" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Budget" type="number" />
              <SelectField label="Priority" options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }, { value: 'critical', label: 'Critical' }]} />
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
