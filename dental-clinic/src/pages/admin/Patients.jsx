import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiFilter } from 'react-icons/fi';
import { FaEye, FaEdit, FaTeeth } from 'react-icons/fa';
import { patients } from '../../data/mockData';

export default function Patients() {
  const [search, setSearch] = useState('');


  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.fileNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Patients</h1>
          <p className="text-sm text-slate-500">{patients.length} total patients</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Add Patient
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5">
              <FiSearch className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search by name, phone, or file number..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full" />
            </div>
            <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
              <FiFilter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                {['File #', 'Patient Name', 'Phone', 'Gender', 'Age', 'City', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-primary">{patient.fileNumber}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">{patient.fullName.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{patient.fullName}</p>
                        <p className="text-xs text-slate-400">{patient.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{patient.phone}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{patient.gender}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{patient.age}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{patient.city}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${patient.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600'}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/patients/${patient.id}`} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors" title="View"><FaEye size={14} /></Link>
                      <Link to={`/admin/dental-chart/${patient.id}`} className="p-2 rounded-lg text-slate-400 hover:text-secondary hover:bg-secondary/10 transition-colors" title="Dental Chart"><FaTeeth size={14} /></Link>
                      <button className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors" title="Edit"><FaEdit size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
