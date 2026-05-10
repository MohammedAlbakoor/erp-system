'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';
import type { CarBrand } from '@/types/showroom';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getBrands()
      .then(data => setBrands(data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this brand?')) return;
    try {
      await adminApi.deleteBrand(id);
      setBrands(prev => prev.filter(b => b.id !== id));
    } catch { alert('Failed to delete'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Brands & Models</h1>
          <p className="text-gray-400 text-sm mt-1">{brands.length} brands</p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map(brand => (
          <motion.div key={brand.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-xl font-bold text-amber-400">{brand.name.charAt(0)}</div>
                <div>
                  <h3 className="text-white font-bold">{brand.name}</h3>
                  <p className="text-gray-500 text-xs">{brand.status ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(brand.id)} className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </motion.div>
        ))}
        {brands.length === 0 && <p className="text-gray-500 col-span-3 text-center py-8">No brands found</p>}
      </div>
      )}
    </div>
  );
}
