import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { expenses, expenseCategories } from '../../data/mockData';

const categoryColors = {
  'Medical Materials': '#0ea5e9', Rent: '#8b5cf6', Salaries: '#14b8a6', Equipment: '#f59e0b',
  Maintenance: '#ef4444', Sterilization: '#06b6d4', Laboratories: '#d4a853', General: '#94a3b8',
};

export default function Expenses() {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = categoryFilter === 'All' ? expenses : expenses.filter((e) => e.category === categoryFilter);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const pieData = expenseCategories.map((cat) => ({
    name: cat,
    value: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
    color: categoryColors[cat],
  })).filter((d) => d.value > 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Expenses</h1>
          <p className="text-sm text-slate-500">{expenses.length} records &middot; Total: ${total.toLocaleString()}</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Add Expense
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 outline-none">
                <option value="All">All Categories</option>
                {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50">
                    {['Category', 'Description', 'Amount', 'Date', 'Recurring'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filtered.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: (categoryColors[exp.category] || '#94a3b8') + '20', color: categoryColors[exp.category] }}>
                          {exp.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-800 dark:text-white">{exp.description}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-red-500">${exp.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{exp.date}</td>
                      <td className="px-4 py-3">
                        {exp.recurring ? <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs">Recurring</span> : <span className="text-xs text-slate-400">One-time</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Breakdown</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: 12, border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-500">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-800 dark:text-white">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
