'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { adminApi } from '@/lib/showroomApi';
import type { Car, CarBrand, CarInquiry } from '@/types/showroom';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-amber-500/20 text-amber-400',
  interested: 'bg-emerald-500/20 text-emerald-400',
  booked: 'bg-purple-500/20 text-purple-400',
  sold: 'bg-red-500/20 text-red-400',
};

interface DashboardData {
  stats: Record<string, number>;
  most_viewed: Car[];
  latest_inquiries: (CarInquiry & { car?: Car })[];
  cars_by_brand: (CarBrand & { cars_count: number })[];
}

export default function ShowroomAdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const s = data?.stats || {};

  const stats = [
    { label: 'Total Cars', value: s.total_cars ?? 0, color: 'from-blue-500 to-blue-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" /> },
    { label: 'Available', value: s.available_cars ?? 0, color: 'from-emerald-500 to-emerald-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> },
    { label: 'Reserved', value: s.reserved_cars ?? 0, color: 'from-amber-500 to-amber-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: 'Sold', value: s.sold_cars ?? 0, color: 'from-red-500 to-red-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: 'Inquiries', value: s.total_inquiries ?? 0, color: 'from-purple-500 to-purple-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> },
    { label: 'Customers', value: s.total_customers ?? 0, color: 'from-pink-500 to-pink-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
    { label: 'Messages', value: s.total_messages ?? 0, color: 'from-teal-500 to-teal-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
    { label: 'Brands', value: s.total_brands ?? 0, color: 'from-indigo-500 to-indigo-600', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
  ];

  const latestInquiries = data?.latest_inquiries || [];
  const mostViewed = data?.most_viewed || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your showroom performance</p>
      </div>

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
            </div>
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
            <Link href="/showroom-admin/inquiries" className="text-amber-400 hover:text-amber-300 text-sm font-medium">View All</Link>
          </div>
          {latestInquiries.length === 0 ? (
            <p className="text-gray-500 text-sm py-4">No inquiries yet</p>
          ) : (
          <div className="space-y-3">
            {latestInquiries.map(inq => (
              <div key={inq.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-amber-400 font-bold text-sm">{inq.customer_name?.charAt(0) || '?'}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{inq.customer_name}</p>
                    <p className="text-gray-500 text-xs">{inq.car?.title || 'General'} - {inq.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[inq.status] || statusColors.new}`}>{inq.status}</span>
                  <p className="text-gray-500 text-xs mt-1">{new Date(inq.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Most Viewed Cars</h2>
            <Link href="/showroom-admin/cars" className="text-amber-400 hover:text-amber-300 text-sm font-medium">View All</Link>
          </div>
          {mostViewed.length === 0 ? (
            <p className="text-gray-500 text-sm py-4">No cars yet</p>
          ) : (
          <div className="space-y-3">
            {mostViewed.map((car, i) => (
              <div key={car.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i < 3 ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-800 text-gray-400'}`}>#{i + 1}</span>
                  <p className="text-white text-sm font-medium">{car.title}</p>
                </div>
                <div className="flex items-center gap-6 text-xs">
                  <div className="text-right">
                    <p className="text-white font-semibold">{(car.views_count || 0).toLocaleString()}</p>
                    <p className="text-gray-500">views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-semibold">${Number(car.price).toLocaleString()}</p>
                    <p className="text-gray-500">price</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </motion.div>
      </div>

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
