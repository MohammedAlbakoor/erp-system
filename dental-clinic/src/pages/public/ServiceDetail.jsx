import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarCheck, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { services } from '../../data/mockData';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = services.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-medical-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Service Not Found</h1>
          <Link to="/services" className="text-primary hover:underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  const similarServices = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-64 md:h-80">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-4xl mb-2 block">{service.icon}</span>
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1"><FaClock /> {service.duration}</span>
                  <span className="flex items-center gap-1"><FaCalendarCheck /> {service.sessions} session{service.sessions > 1 ? 's' : ''}</span>
                  <span className="px-3 py-1 rounded-full bg-white/20">{service.category}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-3xl font-bold text-primary">${service.price}</span>
                <Link to="/booking" className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all">
                  Book Appointment
                </Link>
              </div>

              <div className="prose dark:prose-invert max-w-none mb-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">About This Service</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{service.fullDescription}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Treatment Steps</h3>
                  <div className="space-y-3">
                    {service.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm pt-1.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Before Treatment</h3>
                    <ul className="space-y-2">
                      {service.beforeInstructions.map((ins, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <FaCheckCircle className="text-primary mt-0.5 shrink-0" /> {ins}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">After Treatment</h3>
                    <ul className="space-y-2">
                      {service.afterInstructions.map((ins, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <FaCheckCircle className="text-secondary mt-0.5 shrink-0" /> {ins}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {similarServices.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Similar Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {similarServices.map((s) => (
                  <Link key={s.id} to={`/services/${s.id}`} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow group">
                    <span className="text-2xl">{s.icon}</span>
                    <h3 className="font-bold text-slate-800 dark:text-white mt-2 mb-1 group-hover:text-primary transition-colors">{s.name}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2">{s.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-sm text-primary font-medium">
                      Learn More <FaArrowRight size={10} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
