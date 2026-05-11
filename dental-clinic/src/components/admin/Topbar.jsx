import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiSun, FiMoon, FiMenu } from 'react-icons/fi';

import useStore from '../../store/useStore';

export default function Topbar() {
  const { darkMode, toggleDarkMode, notifications, markAllNotificationsRead, currentUser, toggleSidebar } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-auto z-30 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
          <FiMenu size={20} />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2 w-80">
          <FiSearch className="text-slate-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleDarkMode} className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative"
          >
            <FiBell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] flex items-center justify-center font-bold">{unreadCount}</span>
            )}
          </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Notifications</h3>
                  <button onClick={markAllNotificationsRead} className="text-xs text-primary hover:text-primary-dark">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0 ${!n.read ? 'bg-primary/5' : ''}`}>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{n.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700 ml-1">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold">
            {currentUser.avatar}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">{currentUser.name}</p>
            <p className="text-xs text-slate-400">{currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
