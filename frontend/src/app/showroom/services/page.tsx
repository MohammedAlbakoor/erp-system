'use client';

import { motion } from 'framer-motion';

const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
const stagger = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const services = [
  { icon: '🚗', title: 'Car Sales', titleAr: 'بيع السيارات', desc: 'Wide selection of new and used vehicles with competitive pricing. Browse our collection and find your perfect car with transparent pricing and no hidden fees.' },
  { icon: '🤝', title: 'Car Purchase', titleAr: 'شراء السيارات', desc: 'We buy your car at the best market price. Get a free instant evaluation and a fair offer for your vehicle. No obligations, no pressure.' },
  { icon: '🔄', title: 'Car Trade-In', titleAr: 'تبديل السيارات', desc: 'Trade your current car for a newer model with an easy and streamlined process. We handle all paperwork and documentation for you.' },
  { icon: '📊', title: 'Car Evaluation', titleAr: 'تقييم السيارات', desc: 'Professional vehicle evaluation service with market analysis. Know the true value of your car before buying or selling.' },
  { icon: '🔍', title: 'Car Inspection', titleAr: 'فحص السيارات', desc: 'Comprehensive 200+ point inspection for every vehicle by certified technicians. Full transparency about the condition of every car.' },
  { icon: '💰', title: 'Financing & Installments', titleAr: 'التمويل والتقسيط', desc: 'Flexible financing plans with competitive interest rates starting from 3.5%. Down payment as low as 20% with up to 60 months payment terms.' },
  { icon: '🚚', title: 'Car Shipping', titleAr: 'شحن السيارات', desc: 'Safe and reliable car shipping to any destination. Fully insured transportation with real-time tracking.' },
  { icon: '🌍', title: 'Car Import', titleAr: 'استيراد السيارات', desc: 'Import your dream car from anywhere in the world. We handle customs clearance, shipping, and all import documentation.' },
  { icon: '📋', title: 'Vehicle Registration', titleAr: 'تسجيل المركبات', desc: 'Complete registration and ownership transfer services. Save time with our hassle-free documentation process.' },
  { icon: '🛡️', title: 'Insurance', titleAr: 'التأمين', desc: 'Comprehensive insurance options from leading providers. Get the best coverage at competitive rates for your vehicle.' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">What We Offer</p>
            <h1 className="text-5xl font-black text-white mb-6">Our Services</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">Comprehensive automotive services to meet all your needs, from buying and selling to financing and shipping.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div key={i} {...stagger} transition={{ delay: i * 0.1 }} className="group bg-gray-900 border border-gray-800 hover:border-amber-500/30 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5">
              <div className="flex gap-6">
                <span className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">{service.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{service.desc}</p>
                  <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Contact via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
