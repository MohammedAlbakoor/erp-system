'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';
import type { CarBlogPost } from '@/types/showroom';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<CarBlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const data = await adminApi.getBlogList({ page: p });
      setPosts(data.data);
      setTotal(data.total);
      setPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await adminApi.deleteBlogPost(id);
      fetchData(page);
    } catch { alert('Failed to delete'); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Blog Posts</h1>
        <p className="text-gray-400 text-sm mt-1">{total} posts</p>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Title</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Category</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Status</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Date</th>
              <th className="text-left text-xs text-gray-500 uppercase px-6 py-4">Actions</th>
            </tr></thead>
            <tbody>
              {posts.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No blog posts yet</td></tr>
              ) : posts.map(post => (
                <tr key={post.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 text-white text-sm font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-gray-300 text-sm">{post.category || '-'}</td>
                  <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${post.is_published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>{post.is_published ? 'Published' : 'Draft'}</span></td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(post.id)} className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
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
