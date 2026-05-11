import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiGlobe, FiClock, FiMail, FiPhone, FiBell, FiPrinter, FiSliders, FiSun, FiMoon } from 'react-icons/fi';
import { clinicInfo } from '../../data/mockData';
import useStore from '../../store/useStore';

const settingTabs = ['General', 'Booking', 'Notifications', 'Appearance', 'Printing'];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500">Manage clinic configuration</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {settingTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'General' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Clinic Information</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { label: 'Clinic Name', value: clinicInfo.name, icon: FiGlobe },
              { label: 'Phone', value: clinicInfo.phone, icon: FiPhone },
              { label: 'WhatsApp', value: clinicInfo.whatsapp, icon: FiPhone },
              { label: 'Email', value: clinicInfo.email, icon: FiMail },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2 mb-2"><Icon size={14} /> {label}</label>
                <input type="text" defaultValue={value} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Address</label>
            <input type="text" defaultValue={clinicInfo.address} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2"><FiClock size={14} /> Working Hours</label>
              <input type="text" defaultValue={clinicInfo.hours} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2"><FiGlobe size={14} /> Language</label>
              <select defaultValue="en" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
            <FiSave /> Save Changes
          </button>
        </div>
      )}

      {activeTab === 'Booking' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Booking Settings</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Default Duration (minutes)</label>
              <input type="number" defaultValue={30} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Max Advance Booking (days)</label>
              <input type="number" defaultValue={30} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>
          <div className="space-y-3">
            {['Allow online booking', 'Require admin confirmation', 'Allow emergency booking', 'Send booking confirmation'].map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer">
                <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer-checked:bg-primary absolute inset-0 rounded-full transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300">{s}</span>
              </label>
            ))}
          </div>
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
            <FiSave /> Save Changes
          </button>
        </div>
      )}

      {activeTab === 'Notifications' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><FiBell className="text-primary" /> Notification Settings</h2>
          <div className="space-y-4">
            {[
              { name: 'Appointment Reminders', desc: 'Send reminders before appointments' },
              { name: 'New Booking Alerts', desc: 'Notify staff of new bookings' },
              { name: 'Payment Receipts', desc: 'Send payment confirmations' },
              { name: 'Follow-up Reminders', desc: 'Remind doctors about follow-ups' },
              { name: 'Low Stock Alerts', desc: 'Alert when inventory is low' },
              { name: 'Expiry Alerts', desc: 'Alert before materials expire' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div><p className="text-sm font-medium text-slate-800 dark:text-white">{item.name}</p><p className="text-xs text-slate-500">{item.desc}</p></div>
                <div className="relative w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer-checked:bg-primary absolute inset-0 rounded-full transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Appearance' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><FiSliders className="text-primary" /> Theme Settings</h2>
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <div className="flex items-center gap-3">
              {darkMode ? <FiMoon className="text-primary text-xl" /> : <FiSun className="text-amber-500 text-xl" />}
              <div><p className="text-sm font-medium text-slate-800 dark:text-white">Dark Mode</p><p className="text-xs text-slate-500">Toggle dark/light theme</p></div>
            </div>
            <button onClick={toggleDarkMode} className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-slate-200'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ml-0.5 ${darkMode ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Primary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#0ea5e9" className="w-10 h-10 rounded-lg border-none cursor-pointer" />
                <input type="text" defaultValue="#0ea5e9" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm font-mono text-slate-800 dark:text-white outline-none" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Secondary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" defaultValue="#14b8a6" className="w-10 h-10 rounded-lg border-none cursor-pointer" />
                <input type="text" defaultValue="#14b8a6" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm font-mono text-slate-800 dark:text-white outline-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Animation Intensity</label>
            <div className="flex gap-3">
              {['Light', 'Medium', 'High'].map((level) => (
                <button key={level} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${level === 'Medium' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  {level}
                </button>
              ))}
            </div>
          </div>
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
            <FiSave /> Save Changes
          </button>
        </div>
      )}

      {activeTab === 'Printing' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2"><FiPrinter className="text-primary" /> Printing Settings</h2>
          <div className="space-y-3">
            {['Show clinic logo on invoices', 'Show clinic logo on prescriptions', 'Include clinic address in header', 'Include doctor signature line', 'Auto-print after payment'].map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded-md text-primary border-slate-300 focus:ring-primary" />
                <span className="text-sm text-slate-700 dark:text-slate-300">{s}</span>
              </label>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Paper Size</label>
            <select defaultValue="A4" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none">
              <option value="A4">A4</option>
              <option value="A5">A5</option>
              <option value="Letter">Letter</option>
            </select>
          </div>
          <button className="px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
            <FiSave /> Save Changes
          </button>
        </div>
      )}
    </motion.div>
  );
}
