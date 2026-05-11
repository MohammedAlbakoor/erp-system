import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarCheck } from 'react-icons/fa';
import { services } from '../../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
};

const categories = ['All', ...new Set(services.map((s) => s.category))];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? services : services.filter((s) => s.category === activeCategory);

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Services</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">Comprehensive Dental Services</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">From preventive care to advanced surgical procedures, we offer everything you need for a perfect smile.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-48">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 text-3xl">{service.icon}</span>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-slate-700">{service.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{service.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{service.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><FaClock /> {service.duration}</span>
                  <span className="flex items-center gap-1"><FaCalendarCheck /> {service.sessions} session{service.sessions > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">${service.price}</span>
                  <div className="flex gap-2">
                    <Link to={`/services/${service.id}`} className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors">
                      Details
                    </Link>
                    <Link to="/booking" className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary-dark transition-colors">
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
