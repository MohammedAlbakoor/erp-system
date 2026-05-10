'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { showroomApi } from '@/lib/showroomApi';

const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
const stagger = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

interface AboutData {
  settings: Record<string, string>;
  stats: Record<string, number>;
  testimonials?: { id: number; customer_name: string; rating: number; content: string }[];
}

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showroomApi.getAbout()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const settings = data?.settings || {};
  const stats = data?.stats;
  const showroomName = settings['showroom_name'] || 'AutoElite Motors';
  const aboutText = settings['about_text'] || 'Premium car showroom committed to excellence and customer satisfaction.';
  const vision = settings['vision'] || 'To be the most trusted car showroom in the region, setting the standard for quality and customer satisfaction.';
  const mission = settings['mission'] || 'Providing premium vehicles with transparent pricing, exceptional service, and a seamless buying experience.';
  const values = settings['values'] || 'Integrity, Transparency, Quality, Customer First, Innovation, and Continuous Improvement.';

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">About Us</p>
            <h1 className="text-5xl font-black text-white mb-6">{showroomName}</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{aboutText}</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="text-4xl font-black text-white mb-6">A Legacy of Excellence</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{aboutText}</p>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl h-96 flex items-center justify-center">
            <svg className="w-32 h-32 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Our Vision', icon: '🔭', text: vision },
              { title: 'Our Mission', icon: '🎯', text: mission },
              { title: 'Our Values', icon: '💎', text: values },
            ].map((item, i) => (
              <motion.div key={i} {...stagger} transition={{ delay: i * 0.15 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-amber-500/30 transition-all">
                <span className="text-5xl mb-6 block">{item.icon}</span>
                <h3 className="text-xl font-bold text-amber-400 mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: stats ? `${stats.available_cars}+` : '0', label: 'Cars Available' },
            { value: stats ? `${stats.sold_cars}+` : '0', label: 'Cars Sold' },
            { value: stats ? `${stats.total_cars}+` : '0', label: 'Total Cars' },
            { value: stats ? `${stats.brands_count}+` : '0', label: 'Brands' },
          ].map((stat, i) => (
            <motion.div key={i} {...stagger} transition={{ delay: i * 0.1 }} className="text-center p-8 bg-gray-900 border border-gray-800 rounded-3xl">
              <motion.span className="text-5xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent block mb-3" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 100, delay: i * 0.1 }}>
                {stat.value}
              </motion.span>
              <p className="text-gray-400 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-4xl font-black text-white">Why Customers Trust Us</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🛡️', title: 'Certified Quality', desc: 'Every vehicle undergoes a 200+ point inspection' },
            { icon: '💰', title: 'Fair Pricing', desc: 'Transparent pricing with no hidden fees' },
            { icon: '📄', title: 'Full Documentation', desc: 'Complete history and documentation for every car' },
            { icon: '🤝', title: 'After-Sale Support', desc: 'Dedicated support even after your purchase' },
            { icon: '🔄', title: 'Easy Trade-In', desc: 'Hassle-free trade-in process for your current car' },
            { icon: '💳', title: 'Flexible Finance', desc: 'Multiple financing options to fit your budget' },
          ].map((item, i) => (
            <motion.div key={i} {...stagger} transition={{ delay: i * 0.1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all flex gap-4">
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
