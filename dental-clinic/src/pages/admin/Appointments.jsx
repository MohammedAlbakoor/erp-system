import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { FaClock, FaEye, FaEdit } from 'react-icons/fa';
import { appointments, patients, services, doctors, appointmentStatuses } from '../../data/mockData';

export default function Appointments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = appointments.filter((a) => {
    const patient = patients.find((p) => p.id === a.patientId);
    const matchSearch = !search || patient?.fullName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchDate = !dateFilter || a.date === dateFilter;
    return matchSearch && matchStatus && matchDate;
  });

  const statusColors = {
    New: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Waiting: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Cancelled: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
    'No-show': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Postponed: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    Emergency: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Appointments</h1>
          <p className="text-sm text-slate-500">{filtered.length} appointments</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> New Appointment
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5">
            <FiSearch className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search patient..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 outline-none">
            <option value="All">All Statuses</option>
            {appointmentStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 outline-none" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                {['Patient', 'Service', 'Doctor', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((appt) => {
                const patient = patients.find((p) => p.id === appt.patientId);
                const service = services.find((s) => s.id === appt.serviceId);
                const doctor = doctors.find((d) => d.id === appt.doctorId);
                return (
                  <tr key={appt.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{patient?.fullName.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">{patient?.fullName}</p>
                          {appt.isFirstVisit && <span className="text-xs text-primary">First Visit</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{service?.icon} {service?.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{doctor?.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{appt.date}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1"><FaClock size={10} /> {appt.startTime}-{appt.endTime}</td>
                    <td className="px-4 py-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[appt.status]}`}>{appt.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10"><FaEye size={14} /></button>
                        <button className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50"><FaEdit size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
