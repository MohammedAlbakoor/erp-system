import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { appointments, patients, invoices, expenses } from '../../data/mockData';

const tabs = ['Appointments', 'Patients', 'Financial', 'Treatments'];

const monthlyData = [
  { month: 'Jan', appointments: 120, newPatients: 22, revenue: 12500, expenses: 8200 },
  { month: 'Feb', appointments: 135, newPatients: 28, revenue: 15200, expenses: 8500 },
  { month: 'Mar', appointments: 150, newPatients: 32, revenue: 18400, expenses: 9100 },
  { month: 'Apr', appointments: 142, newPatients: 25, revenue: 16800, expenses: 8800 },
  { month: 'May', appointments: 165, newPatients: 35, revenue: 21000, expenses: 9500 },
  { month: 'Jun', appointments: 155, newPatients: 30, revenue: 19500, expenses: 9200 },
];

const ageDistribution = [
  { range: '0-17', count: 15, color: '#0ea5e9' },
  { range: '18-30', count: 35, color: '#14b8a6' },
  { range: '31-45', count: 45, color: '#d4a853' },
  { range: '46-60', count: 30, color: '#8b5cf6' },
  { range: '60+', count: 20, color: '#ef4444' },
];

const treatmentStats = [
  { name: 'Cleaning', count: 85 }, { name: 'Whitening', count: 42 }, { name: 'Implants', count: 28 },
  { name: 'Root Canal', count: 35 }, { name: 'Orthodontics', count: 22 }, { name: 'Crowns', count: 30 },
  { name: 'Fillings', count: 55 }, { name: 'Extraction', count: 18 },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Appointments');

  const totalRevenue = invoices.reduce((s, i) => s + i.paid, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Reports & Analytics</h1>
        <p className="text-sm text-slate-500">Comprehensive clinic performance overview</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Appointments' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { label: "Today's Appointments", value: appointments.filter((a) => a.date === '2025-05-10').length, color: 'text-primary' },
              { label: 'This Week', value: appointments.length, color: 'text-teal-500' },
              { label: 'Cancellations', value: appointments.filter((a) => a.status === 'Cancelled').length, color: 'text-red-500' },
              { label: 'No-shows', value: appointments.filter((a) => a.status === 'No-show').length, color: 'text-amber-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Monthly Appointments Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs><linearGradient id="apptGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Area type="monotone" dataKey="appointments" stroke="#0ea5e9" fill="url(#apptGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'Patients' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Patients', value: patients.length, color: 'text-primary' },
              { label: 'Active Patients', value: patients.filter((p) => p.status === 'Active').length, color: 'text-green-500' },
              { label: 'New This Month', value: 5, color: 'text-teal-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">New Patients Trend</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                  <Bar dataKey="newPatients" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Age Distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={ageDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="count">
                    {ageDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {ageDistribution.map((d) => (
                  <div key={d.range} className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} /><span className="text-xs text-slate-500">{d.range}: {d.count}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Financial' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'text-green-500' },
              { label: 'Total Expenses', value: `$${totalExpenses.toLocaleString()}`, color: 'text-red-500' },
              { label: 'Net Profit', value: `$${(totalRevenue - totalExpenses).toLocaleString()}`, color: 'text-primary' },
              { label: 'Unpaid', value: `$${invoices.reduce((s, i) => s + i.remaining, 0).toLocaleString()}`, color: 'text-amber-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Revenue vs Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Legend />
                <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'Treatments' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Most Performed Treatments</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={treatmentStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
                <Bar dataKey="count" fill="#0ea5e9" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </motion.div>
  );
}
