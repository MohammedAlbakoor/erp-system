import { motion } from 'framer-motion';
import { FiPlus, FiPrinter, FiDownload } from 'react-icons/fi';
import { FaPrescriptionBottle, FaTooth } from 'react-icons/fa';
import { prescriptions, patients, doctors } from '../../data/mockData';
import { clinicInfo } from '../../data/mockData';

export default function Prescriptions() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Prescriptions</h1>
          <p className="text-sm text-slate-500">{prescriptions.length} prescriptions</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> New Prescription
        </button>
      </div>

      <div className="space-y-6">
        {prescriptions.map((rx) => {
          const patient = patients.find((p) => p.id === rx.patientId);
          const doctor = doctors.find((d) => d.id === rx.doctorId);
          return (
            <div key={rx.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaTooth size={24} />
                  <div>
                    <h3 className="font-bold">{clinicInfo.name}</h3>
                    <p className="text-xs opacity-80">{clinicInfo.address}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"><FiPrinter size={16} /></button>
                  <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"><FiDownload size={16} /></button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div>
                    <p className="text-sm text-slate-500">Patient</p>
                    <p className="font-bold text-slate-800 dark:text-white">{patient?.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Doctor</p>
                    <p className="font-bold text-slate-800 dark:text-white">{doctor?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Date</p>
                    <p className="font-bold text-slate-800 dark:text-white">{rx.date}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2"><FaPrescriptionBottle className="text-primary" /> Medications</h4>
                  <div className="space-y-3">
                    {rx.items.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-white">{item.medicineName}</p>
                            <p className="text-sm text-slate-500 mt-1">Dosage: {item.dosage} &middot; Duration: {item.duration}</p>
                            <p className="text-sm text-primary mt-1">{item.instructions}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {rx.notes && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-sm text-amber-800 dark:text-amber-300">
                    <span className="font-medium">Notes:</span> {rx.notes}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    <p>Signature: ___________________</p>
                    <p className="mt-1">{doctor?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
