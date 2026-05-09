'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { label: 'Total Cars', value: '156', change: '+12', color: 'from-blue-500 to-blue-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" /> },
  { label: 'Available', value: '98', change: '+5', color: 'from-emerald-500 to-emerald-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> },
  { label: 'Reserved', value: '15', change: '+3', color: 'from-amber-500 to-amber-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { label: 'Sold', value: '43', change: '+8', color: 'from-red-500 to-red-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { label: 'Inquiries', value: '87', change: '+15', color: 'from-purple-500 to-purple-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
  { label: 'Customers', value: '234', change: '+22', color: 'from-pink-500 to-pink-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
  { label: 'Messages', value: '12', change: '+4', color: 'from-teal-500 to-teal-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
  { label: 'This Month Sales', value: '$285K', change: '+18%', color: 'from-indigo-500 to-indigo-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
];

const recentInquiries = [
  { id: 1, name: 'Ahmed Hassan', car: 'Toyota Camry 2024', type: 'booking', status: 'new', time: '10 min ago' },
  { id: 2, name: 'Mohammed Ali', car: 'BMW X5 2023', type: 'inquiry', status: 'contacted', time: '1 hour ago' },
  { id: 3, name: 'Sara Ibrahim', car: 'Mercedes E-Class', type: 'test_drive', status: 'new', time: '2 hours ago' },
  { id: 4, name: 'Khalid Omar', car: 'Hyundai Tucson', type: 'financing', status: 'interested', time: '3 hours ago' },
  { id: 5, name: 'Fatima Noor', car: 'Kia Sportage', type: 'inquiry', status: 'new', time: '5 hours ago' },
];

const topCars = [
  { id: 1, title: 'Toyota Land Cruiser 2024', views: 2450, inquiries: 35 },
  { id: 2, title: 'BMW X5 2023', views: 1890, inquiries: 28 },
  { id: 3, title: 'Mercedes S-Class 2024', views: 1650, inquiries: 22 },
  { id: 4, title: 'Porsche Cayenne 2024', views: 1420, inquiries: 18 },
  { id: 5, title: 'Lexus RX 2024', views: 1200, inquiries: 15 },
];

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-amber-500/20 text-amber-400',
  interested: 'bg-emerald-500/20 text-emerald-400',
  booked: 'bg-purple-500/20 text-purple-400',
};

export default function ShowroomAdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your showroom performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{stat.icon}</svg>
              </div>
              <span className="text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
            <Link href="/showroom-admin/inquiries" className="text-amber-400 hover:text-amber-300 text-sm font-medium">View All</Link>
          </div>
          <div className="space-y-3">
            {recentInquiries.map(inq => (
              <div key={inq.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-amber-400 font-bold text-sm">{inq.name.charAt(0)}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{inq.name}</p>
                    <p className="text-gray-500 text-xs">{inq.car} - {inq.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[inq.status] || statusColors.new}`}>{inq.status}</span>
                  <p className="text-gray-500 text-xs mt-1">{inq.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Cars */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Most Viewed Cars</h2>
            <Link href="/showroom-admin/cars" className="text-amber-400 hover:text-amber-300 text-sm font-medium">View All</Link>
          </div>
          <div className="space-y-3">
            {topCars.map((car, i) => (
              <div key={car.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i < 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-800 text-gray-400'}`}>#{i + 1}</span>
                  <p className="text-white text-sm font-medium">{car.title}</p>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <div className="text-right">
                    <p className="text-white font-semibold">{car.views.toLocaleString()}</p>
                    <p className="text-gray-500">views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-semibold">{car.inquiries}</p>
                    <p className="text-gray-500">inquiries</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Add Car', href: '/showroom-admin/cars', icon: '🚗' },
            { label: 'Add Brand', href: '/showroom-admin/brands', icon: '🏢' },
            { label: 'View Inquiries', href: '/showroom-admin/inquiries', icon: '📩' },
            { label: 'Add Customer', href: '/showroom-admin/customers', icon: '👤' },
            { label: 'Record Sale', href: '/showroom-admin/sales', icon: '💰' },
            { label: 'Settings', href: '/showroom-admin/settings', icon: '⚙️' },
          ].map(action => (
            <Link key={action.label} href={action.href} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-amber-500/30 rounded-xl p-4 text-center transition-all hover:-translate-y-1">
              <span className="text-2xl block mb-2">{action.icon}</span>
              <span className="text-white text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
