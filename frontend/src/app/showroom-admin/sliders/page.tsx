'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';
import type { CarSlider } from '@/types/showroom';

export default function AdminSlidersPage() {
  const [sliders, setSliders] = useState<CarSlider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getSliders()
      .then(data => setSliders(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this slider?')) return;
    try {
      await adminApi.deleteSlider(id);
      setSliders(prev => prev.filter(s => s.id !== id));
    } catch { alert('Failed to delete'); }
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-black text-white">Sliders Management</h1></div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <div className="space-y-4">
        {sliders.length === 0 ? <p className="text-gray-500 text-center py-8">No sliders yet</p> :
        sliders.map(slider => (
          <motion.div key={slider.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">{slider.title || 'Untitled Slider'}</h3>
              <p className="text-gray-500 text-sm">{slider.description || ''}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${slider.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>{slider.is_active ? 'Active' : 'Inactive'}</span>
            </div>
            <button onClick={() => handleDelete(slider.id)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
}
