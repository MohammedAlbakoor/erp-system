'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';
import type { CarInquiry } from '@/types/showroom';

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400', contacted: 'bg-amber-500/20 text-amber-400',
  interested: 'bg-emerald-500/20 text-emerald-400', not_interested: 'bg-gray-500/20 text-gray-400',
  booked: 'bg-purple-500/20 text-purple-400', sold: 'bg-red-500/20 text-red-400', cancelled: 'bg-red-500/20 text-red-400',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<CarInquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await adminApi.getInquiries({ page: p });
      setInquiries(data.data);
      setTotal(data.total);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await adminApi.updateInquiry(id, { status });
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
    } catch { alert('Failed to update'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Inquiries Management</h1>
        <p className="text-gray-400 text-sm mt-1">{total} total inquiries</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Customer</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Phone</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Type</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Status</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Date</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Actions</th>
            </tr></thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No inquiries yet</td></tr>
              ) : inquiries.map(inq => (
                <tr key={inq.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{inq.customer_name}</p>
                    <p className="text-gray-500 text-xs">{inq.city || ''}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{inq.phone}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm capitalize">{inq.type}</td>
                  <td className="px-6 py-4">
                    <select value={inq.status} onChange={e => updateStatus(inq.id, e.target.value)} className={`text-xs px-2.5 py-1 rounded-full font-medium border-0 outline-none ${statusColors[inq.status] || statusColors.new} bg-transparent cursor-pointer`}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="not_interested">Not Interested</option>
                      <option value="booked">Booked</option>
                      <option value="sold">Sold</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{new Date(inq.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <a href={`https://wa.me/${inq.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg inline-flex transition">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lastPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm">Page {page} of {lastPage}</p>
            <div className="flex gap-2">
              <button onClick={() => fetchData(page - 1)} disabled={page <= 1} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-700">Previous</button>
              <button onClick={() => fetchData(page + 1)} disabled={page >= lastPage} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-700">Next</button>
            </div>
          </div>
        )}
      </motion.div>
      )}
    </div>
  );
}
