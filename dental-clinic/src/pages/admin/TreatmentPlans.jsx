import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { treatmentPlans, patients, doctors, services } from '../../data/mockData';

export default function TreatmentPlans() {
  const statusColors = {
    Proposed: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Approved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'In Progress': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  const itemStatusIcons = {
    Completed: <FaCheckCircle className="text-green-500" />,
    'In Progress': <FaClock className="text-amber-500" />,
    Pending: <FaClock className="text-slate-400" />,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Treatment Plans</h1>
          <p className="text-sm text-slate-500">{treatmentPlans.length} plans</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> New Plan
        </button>
      </div>

      <div className="space-y-6">
        {treatmentPlans.map((plan) => {
          const patient = patients.find((p) => p.id === plan.patientId);
          const doctor = doctors.find((d) => d.id === plan.doctorId);
          const remaining = plan.totalCost - plan.discount - plan.paidAmount;
          const progress = plan.items.filter((i) => i.status === 'Completed').length / plan.items.length * 100;

          return (
            <div key={plan.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white">{plan.title}</h2>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[plan.status]}`}>{plan.status}</span>
                    </div>
                    <p className="text-sm text-slate-500">Patient: {patient?.fullName} &middot; Doctor: {doctor?.name} &middot; Created: {plan.createdAt}</p>
                    <p className="text-sm text-slate-500 mt-1">{plan.diagnosis}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">Total</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-white">${plan.totalCost}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">Discount</p>
                    <p className="text-lg font-bold text-green-600">${plan.discount}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">Paid</p>
                    <p className="text-lg font-bold text-primary">${plan.paidAmount}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-500">Remaining</p>
                    <p className="text-lg font-bold text-danger">${remaining}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium text-slate-800 dark:text-white">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1 }} className="h-full gradient-primary rounded-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.items.map((item) => {
                    const service = services.find((s) => s.id === item.serviceId);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                        <div className="flex items-center gap-3">
                          {itemStatusIcons[item.status]}
                          <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-white">{service?.name}</p>
                            {item.toothNumber && <p className="text-xs text-slate-500">Tooth #{item.toothNumber}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-slate-800 dark:text-white">${item.price}</p>
                          <span className="text-xs text-slate-500">{item.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
