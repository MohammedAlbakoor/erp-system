import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { visits, patients, doctors } from '../../data/mockData';

export default function Visits() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Visit Records</h1>
          <p className="text-sm text-slate-500">{visits.length} records</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Record Visit
        </button>
      </div>

      <div className="space-y-4">
        {visits.map((visit) => {
          const patient = patients.find((p) => p.id === visit.patientId);
          const doctor = doctors.find((d) => d.id === visit.doctorId);
          return (
            <div key={visit.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">{patient?.fullName.charAt(0)}</div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{patient?.fullName}</h3>
                    <p className="text-sm text-slate-500">Dr. {doctor?.name.split(' ').slice(1).join(' ')} &middot; {visit.date}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${visit.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {visit.paymentStatus}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="text-slate-500">Complaint:</span> <span className="text-slate-800 dark:text-white ml-1">{visit.complaint}</span></div>
                <div><span className="text-slate-500">Diagnosis:</span> <span className="text-slate-800 dark:text-white ml-1">{visit.diagnosis}</span></div>
                <div><span className="text-slate-500">Treatment:</span> <span className="text-slate-800 dark:text-white ml-1">{visit.treatment}</span></div>
                <div><span className="text-slate-500">Cost:</span> <span className="text-slate-800 dark:text-white ml-1 font-semibold">${visit.cost}</span></div>
                {visit.treatedTeeth.length > 0 && <div><span className="text-slate-500">Teeth:</span> <span className="text-slate-800 dark:text-white ml-1">#{visit.treatedTeeth.join(', #')}</span></div>}
                {visit.nextVisitDate && <div><span className="text-slate-500">Next Visit:</span> <span className="text-primary ml-1 font-medium">{visit.nextVisitDate}</span></div>}
              </div>
              {visit.notes && <p className="text-sm text-slate-500 mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">{visit.notes}</p>}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
