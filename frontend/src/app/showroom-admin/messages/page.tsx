'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await adminApi.getMessages({ page: p });
      setMessages(data.data);
      setTotal(data.total);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const markRead = async (id: number) => {
    try {
      await adminApi.markMessageRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    } catch { console.error('Failed to mark read'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Contact Messages</h1>
        <p className="text-gray-400 text-sm mt-1">{total} messages</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <div className="space-y-4">
        {messages.length === 0 ? <p className="text-gray-500 text-center py-8">No messages yet</p> :
        messages.map(msg => (
          <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-gray-900 border rounded-2xl p-6 transition-all ${msg.is_read ? 'border-gray-800' : 'border-amber-500/30'}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-bold text-sm">{msg.name}</h3>
                <p className="text-gray-500 text-xs">{msg.email} | {msg.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                {!msg.is_read && (
                  <button onClick={() => markRead(msg.id)} className="text-xs text-amber-400 hover:text-amber-300">Mark Read</button>
                )}
                <span className="text-gray-500 text-xs">{new Date(msg.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            {msg.subject && <p className="text-amber-400 text-sm font-medium mb-1">{msg.subject}</p>}
            <p className="text-gray-400 text-sm">{msg.message}</p>
          </motion.div>
        ))}
        {lastPage > 1 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-gray-500 text-sm">Page {page} of {lastPage}</p>
            <div className="flex gap-2">
              <button onClick={() => fetchData(page - 1)} disabled={page <= 1} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-50">Previous</button>
              <button onClick={() => fetchData(page + 1)} disabled={page >= lastPage} className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
