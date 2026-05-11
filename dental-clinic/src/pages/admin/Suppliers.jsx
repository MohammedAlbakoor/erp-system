import { motion } from 'framer-motion';
import { FiPlus, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaTruck } from 'react-icons/fa';
import { suppliers } from '../../data/mockData';

export default function Suppliers() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Suppliers</h1>
          <p className="text-sm text-slate-500">{suppliers.length} suppliers</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><FaTruck className="text-primary text-xl" /></div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white">{supplier.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1"><FiPhone size={12} /> {supplier.phone}</div>
                <div className="flex items-center gap-2 text-sm text-slate-500"><FiMapPin size={12} /> {supplier.address}</div>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-xs font-medium text-slate-500 mb-2">Products</p>
              <div className="flex flex-wrap gap-1">
                {supplier.products.map((p) => (
                  <span key={p} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs">{p}</span>
                ))}
              </div>
            </div>
            {supplier.notes && <p className="text-sm text-slate-500 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl">{supplier.notes}</p>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
