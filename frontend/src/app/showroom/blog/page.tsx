'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
const stagger = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const demoPosts = [
  { id: 1, slug: 'best-economy-cars-2024', title: 'Best Economy Cars in 2024', excerpt: 'Discover the most fuel-efficient and affordable cars of 2024. From hybrids to EVs, find the perfect economical vehicle.', category: 'Buying Guide', created_at: '2024-01-15' },
  { id: 2, slug: 'tips-buying-used-car', title: 'Top 10 Tips for Buying a Used Car', excerpt: 'Essential tips to consider before purchasing a pre-owned vehicle. Learn how to inspect, negotiate, and make the right choice.', category: 'Tips & Advice', created_at: '2024-01-10' },
  { id: 3, slug: 'automatic-vs-manual', title: 'Automatic vs Manual: Which is Better?', excerpt: 'A comprehensive comparison between automatic and manual transmissions. Pros, cons, and which suits your driving style.', category: 'Education', created_at: '2024-01-05' },
  { id: 4, slug: 'car-inspection-guide', title: 'How to Inspect a Car Before Purchase', excerpt: 'A step-by-step guide to thoroughly inspect any car before buying. Check engine, body, interior, and more.', category: 'Buying Guide', created_at: '2023-12-28' },
  { id: 5, slug: 'best-suv-families', title: 'Best SUVs for Families in 2024', excerpt: 'The top family-friendly SUVs with the best safety ratings, space, and features for your family needs.', category: 'Reviews', created_at: '2023-12-20' },
  { id: 6, slug: 'car-maintenance-schedule', title: 'Complete Car Maintenance Schedule', excerpt: 'Keep your car running smoothly with this comprehensive maintenance schedule covering all essential service intervals.', category: 'Maintenance', created_at: '2023-12-15' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Blog</p>
            <h1 className="text-5xl font-black text-white mb-6">Latest Articles</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Expert automotive insights, buying guides, and tips to help you make informed decisions.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoPosts.map((post, i) => (
            <motion.article key={post.id} {...stagger} transition={{ delay: i * 0.1 }}>
              <Link href={`/showroom/blog/${post.slug}`} className="group block bg-gray-900 border border-gray-800 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-700 group-hover:text-gray-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <div className="p-6">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">{post.category}</span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-amber-400 transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="text-amber-400 text-sm font-semibold flex items-center gap-1">Read More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
