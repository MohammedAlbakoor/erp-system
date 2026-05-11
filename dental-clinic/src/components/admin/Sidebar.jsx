import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTooth, FaHome, FaUserInjured, FaCalendarAlt, FaStethoscope, FaTeeth, FaClipboardList,
  FaPrescriptionBottle, FaFileInvoiceDollar, FaBoxes, FaTruck, FaFlask, FaMoneyBillWave,
  FaChartBar, FaUsers, FaCog, FaHistory, FaChevronLeft, FaChevronRight, FaSignOutAlt
} from 'react-icons/fa';
import useStore from '../../store/useStore';

const menuItems = [
  { to: '/admin', icon: FaHome, label: 'Dashboard', exact: true },
  { to: '/admin/patients', icon: FaUserInjured, label: 'Patients' },
  { to: '/admin/appointments', icon: FaCalendarAlt, label: 'Appointments' },
  { to: '/admin/visits', icon: FaStethoscope, label: 'Visits' },
  { to: '/admin/dental-chart/1', icon: FaTeeth, label: 'Dental Chart' },
  { to: '/admin/treatment-plans', icon: FaClipboardList, label: 'Treatment Plans' },
  { to: '/admin/prescriptions', icon: FaPrescriptionBottle, label: 'Prescriptions' },
  { to: '/admin/invoices', icon: FaFileInvoiceDollar, label: 'Invoices' },
  { to: '/admin/inventory', icon: FaBoxes, label: 'Inventory' },
  { to: '/admin/suppliers', icon: FaTruck, label: 'Suppliers' },
  { to: '/admin/labs', icon: FaFlask, label: 'Laboratories' },
  { to: '/admin/expenses', icon: FaMoneyBillWave, label: 'Expenses' },
  { to: '/admin/reports', icon: FaChartBar, label: 'Reports' },
  { to: '/admin/users', icon: FaUsers, label: 'Users' },
  { to: '/admin/settings', icon: FaCog, label: 'Settings' },
  { to: '/admin/audit-log', icon: FaHistory, label: 'Audit Log' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useStore();
  const location = useLocation();

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="fixed left-0 top-0 bottom-0 z-40 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden lg:flex flex-col shadow-sm"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
              <FaTooth className="text-white text-sm" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-bold text-slate-800 dark:text-white whitespace-nowrap">
                  DentaCare
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button onClick={toggleSidebar} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            {sidebarOpen ? <FaChevronLeft size={12} /> : <FaChevronRight size={12} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map(({ to, icon: Icon, label, exact }) => {
            const isActive = exact ? location.pathname === to : location.pathname.startsWith(to) && to !== '/admin';
            return (
              <Link
                key={to}
                to={to}
                title={!sidebarOpen ? label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <FaSignOutAlt size={18} className="shrink-0" />
            <AnimatePresence>
              {sidebarOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Back to Site</motion.span>}
            </AnimatePresence>
          </Link>
        </div>
      </motion.aside>
    </>
  );
}
