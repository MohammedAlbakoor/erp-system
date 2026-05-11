import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiPrinter, FiDownload } from 'react-icons/fi';
import { invoices, patients, services, invoiceStatuses, payments } from '../../data/mockData';

export default function Invoices() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = invoices.filter((inv) => {
    const patient = patients.find((p) => p.id === inv.patientId);
    const matchSearch = !search || patient?.fullName.toLowerCase().includes(search.toLowerCase()) || inv.invoiceNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = invoices.reduce((s, i) => s + i.paid, 0);
  const totalUnpaid = invoices.reduce((s, i) => s + i.remaining, 0);

  const statusColors = {
    Paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'Partially Paid': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Unpaid: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Cancelled: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Invoices & Payments</h1>
          <p className="text-sm text-slate-500">{invoices.length} invoices</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> New Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-sm text-slate-500 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-sm text-slate-500 mb-1">Outstanding</p>
          <p className="text-2xl font-bold text-red-500">${totalUnpaid.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <p className="text-sm text-slate-500 mb-1">Total Invoiced</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">${invoices.reduce((s, i) => s + i.total, 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5">
            <FiSearch className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 outline-none">
            <option value="All">All Statuses</option>
            {invoiceStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                {['Invoice #', 'Patient', 'Service', 'Date', 'Total', 'Paid', 'Remaining', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((inv) => {
                const patient = patients.find((p) => p.id === inv.patientId);
                const service = services.find((s) => s.id === inv.serviceId);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-primary">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">{patient?.fullName}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{service?.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{inv.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white">${inv.total}</td>
                    <td className="px-4 py-3 text-sm text-green-600 font-medium">${inv.paid}</td>
                    <td className="px-4 py-3 text-sm text-red-500 font-medium">${inv.remaining}</td>
                    <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[inv.status]}`}>{inv.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10"><FiPrinter size={14} /></button>
                        <button className="p-2 rounded-lg text-slate-400 hover:text-green-500 hover:bg-green-50"><FiDownload size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Recent Payments</h2>
        <div className="space-y-3">
          {payments.map((payment) => {
            const invoice = invoices.find((i) => i.id === payment.invoiceId);
            const patient = patients.find((p) => p.id === invoice?.patientId);
            return (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">$</div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{patient?.fullName}</p>
                    <p className="text-xs text-slate-500">{invoice?.invoiceNumber} &middot; {payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+${payment.amount}</p>
                  <p className="text-xs text-slate-400">{payment.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
