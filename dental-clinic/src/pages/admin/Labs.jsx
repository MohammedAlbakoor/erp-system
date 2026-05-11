import { motion } from 'framer-motion';
import { FiPlus, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { laboratories, patients } from '../../data/mockData';

export default function Labs() {
  const statusColors = {
    Sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Ready: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Received: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Installed: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Laboratories</h1>
          <p className="text-sm text-slate-500">{laboratories.length} laboratories</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Add Lab Case
        </button>
      </div>

      <div className="space-y-6">
        {laboratories.map((lab) => (
          <div key={lab.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"><FaFlask className="text-purple-600 text-xl" /></div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">{lab.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><FiPhone size={12} /> {lab.phone}</span>
                    <span className="flex items-center gap-1"><FiMapPin size={12} /> {lab.address}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {lab.workType.map((w) => (
                      <span key={w} className="px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs">{w}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-semibold text-slate-800 dark:text-white mb-3">Active Cases ({lab.cases.length})</h4>
              <div className="space-y-3">
                {lab.cases.map((c) => {
                  const patient = patients.find((p) => p.id === c.patientId);
                  return (
                    <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{c.type}</p>
                        <p className="text-xs text-slate-500">Patient: {patient?.fullName} {c.tooth ? `| Tooth #${c.tooth}` : ''}</p>
                        <p className="text-xs text-slate-400">Sent: {c.sentDate} | Expected: {c.expectedDate}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[c.status]}`}>{c.status}</span>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white mt-1">${c.cost}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
