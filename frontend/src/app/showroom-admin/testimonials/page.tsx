'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';
import type { CarTestimonial } from '@/types/showroom';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<CarTestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getTestimonials()
      .then(data => setTestimonials(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await adminApi.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch { alert('Failed to delete'); }
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-black text-white">Testimonials</h1></div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.length === 0 ? <p className="text-gray-500 col-span-2 text-center py-8">No testimonials yet</p> :
        testimonials.map(t => (
          <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 font-bold">{t.customer_name.charAt(0)}</div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t.customer_name}</h3>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < t.rating ? 'text-amber-400' : 'text-gray-600'}>★</span>)}</div>
                </div>
              </div>
              <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            <p className="text-gray-400 text-sm">{t.content}</p>
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
}
