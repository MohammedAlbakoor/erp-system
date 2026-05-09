'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { use } from 'react';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/showroom" className="hover:text-amber-400 transition">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/showroom/blog" className="hover:text-amber-400 transition">Blog</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-amber-400">{slug.replace(/-/g, ' ')}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Buying Guide</span>
          <h1 className="text-4xl font-black text-white mt-3 mb-6">{slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-10">
            <span>January 15, 2024</span>
            <span>|</span>
            <span>5 min read</span>
            <span>|</span>
            <span>1,250 views</span>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl h-80 mb-10 flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>

          <div className="prose prose-invert prose-amber max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">This is a comprehensive guide to help you make informed decisions when shopping for your next vehicle. Our expert team has compiled the most important factors to consider.</p>
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Key Considerations</h2>
            <p className="text-gray-400 leading-relaxed mb-4">When looking for the perfect car, there are several factors you should consider. Budget, fuel efficiency, safety ratings, and resale value are just a few of the important aspects to evaluate.</p>
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">Our Recommendations</h2>
            <p className="text-gray-400 leading-relaxed mb-4">Based on our extensive experience in the automotive industry, we have compiled a list of the top vehicles in each category that offer the best value for money.</p>
            <p className="text-gray-400 leading-relaxed">Contact us today to learn more about any of these vehicles or to schedule a test drive at our showroom.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm transition flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Share
                </button>
              </div>
              <Link href="/showroom/blog" className="text-amber-400 hover:text-amber-300 font-semibold text-sm flex items-center gap-2">
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                Back to Blog
              </Link>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
