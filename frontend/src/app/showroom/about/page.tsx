'use client';

import { motion } from 'framer-motion';

const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
const stagger = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">About Us</p>
            <h1 className="text-5xl font-black text-white mb-6">AutoElite Motors</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Premium car showroom with over 15 years of experience in the automotive industry, committed to excellence and customer satisfaction.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="text-4xl font-black text-white mb-6">A Legacy of Excellence</h2>
            <p className="text-gray-400 leading-relaxed mb-6">AutoElite Motors was founded with a vision to revolutionize the car buying experience. Over 15 years, we have grown from a small showroom to one of the most trusted names in the automotive industry.</p>
            <p className="text-gray-400 leading-relaxed mb-6">We specialize in offering a wide range of new and pre-owned vehicles, carefully selected and thoroughly inspected to ensure the highest quality for our customers. Every car that enters our showroom goes through a rigorous 200+ point inspection process.</p>
            <p className="text-gray-400 leading-relaxed">Our commitment to transparency, fair pricing, and exceptional customer service has earned us the trust of thousands of satisfied customers.</p>
          </motion.div>
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl h-96 flex items-center justify-center">
            <svg className="w-32 h-32 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Our Vision', icon: '🔭', text: 'To be the most trusted car showroom in the region, setting the standard for quality and customer satisfaction.' },
              { title: 'Our Mission', icon: '🎯', text: 'Providing premium vehicles with transparent pricing, exceptional service, and a seamless buying experience.' },
              { title: 'Our Values', icon: '💎', text: 'Integrity, Transparency, Quality, Customer First, Innovation, and Continuous Improvement.' },
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

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Cars Available' }, { value: '2,000+', label: 'Cars Sold' },
            { value: '5,000+', label: 'Happy Clients' }, { value: '15+', label: 'Years Experience' },
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

      {/* Team */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Our Team</p>
            <h2 className="text-4xl font-black text-white">Meet Our Expert Team</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Ahmed Al-Rashid', role: 'General Manager' },
              { name: 'Khalid Mohammed', role: 'Sales Director' },
              { name: 'Omar Hassan', role: 'Technical Inspector' },
              { name: 'Sara Al-Ahmed', role: 'Customer Relations' },
            ].map((member, i) => (
              <motion.div key={i} {...stagger} transition={{ delay: i * 0.1 }} className="text-center group">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-black group-hover:scale-110 transition-transform">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-amber-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
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
