import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaCalendarAlt, FaUserInjured, FaMoneyBillWave, FaExclamationTriangle, FaClock, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { appointments, patients, invoices, services } from '../../data/mockData';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const monthlyRevenue = [
  { month: 'Jan', revenue: 12500, patients: 45 },
  { month: 'Feb', revenue: 15200, patients: 52 },
  { month: 'Mar', revenue: 18400, patients: 61 },
  { month: 'Apr', revenue: 16800, patients: 58 },
  { month: 'May', revenue: 21000, patients: 68 },
  { month: 'Jun', revenue: 19500, patients: 63 },
];

const serviceBreakdown = [
  { name: 'Cleaning', value: 30, color: '#0ea5e9' },
  { name: 'Whitening', value: 20, color: '#14b8a6' },
  { name: 'Implants', value: 15, color: '#d4a853' },
  { name: 'Orthodontics', value: 12, color: '#8b5cf6' },
  { name: 'Root Canal', value: 10, color: '#ef4444' },
  { name: 'Other', value: 13, color: '#94a3b8' },
];

const weeklyAppointments = [
  { day: 'Mon', count: 8 }, { day: 'Tue', count: 12 }, { day: 'Wed', count: 10 },
  { day: 'Thu', count: 15 }, { day: 'Fri', count: 11 }, { day: 'Sat', count: 6 },
];

function StatCard({ icon: Icon, label, value, change, positive, color, to }) {
  const Wrapper = to ? Link : 'div';
  return (
    <motion.div variants={fadeUp}>
      <Wrapper to={to} className={`block bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-700 ${to ? 'cursor-pointer' : ''}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
            {change && (
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>
                {positive ? <FaArrowUp /> : <FaArrowDown />} {change}
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default function Dashboard() {
  const todayAppts = appointments.filter((a) => a.date === '2025-05-10');
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const unpaidTotal = invoices.reduce((sum, inv) => sum + inv.remaining, 0);
  const emergencies = todayAppts.filter((a) => a.status === 'Emergency').length;

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, Dr. Sarah</p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaCalendarAlt} label="Today's Appointments" value={todayAppts.length} change="+12% vs last week" positive to="/admin/appointments" color="bg-blue-500" />
        <StatCard icon={FaUserInjured} label="Total Patients" value={patients.length} change="+5 this month" positive to="/admin/patients" color="bg-teal-500" />
        <StatCard icon={FaMoneyBillWave} label="Revenue (Today)" value={`$${totalRevenue.toLocaleString()}`} change="+18% vs yesterday" positive to="/admin/invoices" color="bg-amber-500" />
        <StatCard icon={FaExclamationTriangle} label="Emergencies" value={emergencies} to="/admin/appointments" color="bg-red-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Revenue & Patients</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Services Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {serviceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {serviceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Weekly Appointments</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyAppointments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none' }} />
              <Bar dataKey="count" fill="#14b8a6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Today&apos;s Appointments</h2>
            <Link to="/admin/appointments" className="text-sm text-primary hover:text-primary-dark">View All</Link>
          </div>
          <div className="space-y-3">
            {todayAppts.slice(0, 5).map((appt) => {
              const patient = patients.find((p) => p.id === appt.patientId);
              const service = services.find((s) => s.id === appt.serviceId);
              const statusColors = { Completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', Confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', Waiting: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', New: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', Emergency: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
              return (
                <div key={appt.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 w-16">
                      <FaClock size={12} /> {appt.startTime}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{patient?.fullName}</p>
                      <p className="text-xs text-slate-500">{service?.name}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[appt.status] || 'bg-slate-100 text-slate-600'}`}>
                    {appt.status}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Unpaid Invoices</h2>
          <div className="text-3xl font-bold text-danger mb-2">${unpaidTotal.toLocaleString()}</div>
          <p className="text-sm text-slate-500 mb-4">{invoices.filter((i) => i.status !== 'Paid').length} invoices pending</p>
          <Link to="/admin/invoices" className="text-sm text-primary hover:text-primary-dark font-medium">View Details &rarr;</Link>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Follow-up Alerts</h2>
          <div className="space-y-3">
            {[
              { patient: 'Robert Williams', note: 'Root canal follow-up due', urgent: true },
              { patient: 'Maria Garcia', note: 'Invisalign adjustment needed', urgent: false },
              { patient: 'John Smith', note: 'Crown fitting scheduled', urgent: false },
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${alert.urgent ? 'bg-danger' : 'bg-warning'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{alert.patient}</p>
                  <p className="text-xs text-slate-500">{alert.note}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Most Requested</h2>
          <div className="space-y-3">
            {services.slice(0, 5).map((service, i) => (
              <div key={service.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{service.icon}</span>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{service.name}</span>
                </div>
                <span className="text-xs text-slate-400">{30 - i * 4} bookings</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
