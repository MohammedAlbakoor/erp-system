'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';
import type { CarSale } from '@/types/showroom';

export default function AdminSalesPage() {
  const [sales, setSales] = useState<CarSale[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await adminApi.getSales({ page: p });
      setSales(data.data);
      setTotal(data.total);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Sales & Reports</h1>
        <p className="text-gray-400 text-sm mt-1">{total} recorded sales</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Car</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Customer</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Final Price</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Payment</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Date</th>
            </tr></thead>
            <tbody>
              {sales.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No sales recorded yet</td></tr>
              ) : sales.map(sale => (
                <tr key={sale.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 text-white text-sm font-medium">{sale.car?.title || `Car #${sale.car_id}`}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{sale.customer?.name || `Customer #${sale.customer_id}`}</td>
                  <td className="px-6 py-4 text-amber-400 font-bold text-sm">${Number(sale.final_price).toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm capitalize">{sale.payment_method}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{new Date(sale.sale_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lastPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
            <p className="text-gray-500 text-sm">Page {page} of {lastPage}</p>
            <div className="flex gap-2">
              <button onClick={() => fetchData(page - 1)} disabled={page <= 1} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-50">Previous</button>
              <button onClick={() => fetchData(page + 1)} disabled={page >= lastPage} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </motion.div>
      )}
    </div>
  );
}
