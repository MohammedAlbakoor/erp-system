'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const demoCars = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: ['Toyota Camry 2024', 'BMW X5 2023', 'Mercedes E-Class', 'Hyundai Tucson 2024', 'Kia Sportage 2023', 'Lexus RX 2024', 'Audi Q7 2023', 'Porsche Cayenne', 'Honda CR-V 2023', 'Nissan Patrol 2024', 'Toyota Land Cruiser', 'Ford Explorer 2024', 'Chevrolet Tahoe', 'BMW 5 Series 2024', 'Mercedes S-Class'][i],
  brand: ['Toyota', 'BMW', 'Mercedes', 'Hyundai', 'Kia', 'Lexus', 'Audi', 'Porsche', 'Honda', 'Nissan', 'Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes'][i],
  year: 2023 + (i % 2),
  price: 25000 + i * 8000,
  status: (['available', 'available', 'reserved', 'sold', 'available', 'available', 'reserved', 'available', 'sold', 'available', 'available', 'available', 'reserved', 'available', 'sold'] as const)[i],
  condition: i % 3 === 0 ? 'new' : 'used',
  views: (i + 1) * 200,
  is_featured: i % 3 === 0,
  is_published: i % 5 !== 0,
  internal_number: `CAR-${1000 + i}`,
}));

const statusStyles: Record<string, string> = {
  available: 'bg-emerald-500/20 text-emerald-400',
  reserved: 'bg-amber-500/20 text-amber-400',
  sold: 'bg-red-500/20 text-red-400',
  archived: 'bg-gray-500/20 text-gray-400',
};

export default function AdminCarsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCars = demoCars.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Cars Management</h1>
          <p className="text-gray-400 text-sm mt-1">{demoCars.length} total cars</p>
        </div>
        <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add New Car
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cars..." className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 w-64" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-amber-500">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Car</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Price</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Condition</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Views</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Published</th>
                <th className="text-left text-xs text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => (
                <tr key={car.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" /></svg>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{car.title}</p>
                        <p className="text-gray-500 text-xs">{car.brand} | {car.internal_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-amber-400 font-bold text-sm">${car.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[car.status]}`}>{car.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${car.condition === 'new' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>{car.condition}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{car.views}</td>
                  <td className="px-6 py-4">
                    <div className={`w-3 h-3 rounded-full ${car.is_published ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-amber-400 rounded-lg hover:bg-amber-500/10 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
