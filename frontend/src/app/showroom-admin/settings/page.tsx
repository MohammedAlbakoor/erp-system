'use client';

import { motion } from 'framer-motion';

export default function AdminPage() {
  const pageName = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';
  const titles: Record<string, string> = {
    brands: 'Brands & Models', inquiries: 'Inquiries Management', customers: 'Customer CRM',
    sales: 'Sales & Reports', sliders: 'Sliders Management', testimonials: 'Testimonials',
    services: 'Services Management', blog: 'Blog Posts', faqs: 'FAQ Management',
    settings: 'Showroom Settings', messages: 'Contact Messages',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">{titles[pageName || ''] || 'Management'}</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your showroom content</p>
        </div>
        <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add New
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
        <svg className="w-16 h-16 text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 className="text-xl font-bold text-gray-400 mb-2">Management Dashboard</h3>
        <p className="text-gray-500">This section connects to the admin API endpoints for full CRUD operations. Data will be loaded from the backend API.</p>
      </motion.div>
    </div>
  );
}
