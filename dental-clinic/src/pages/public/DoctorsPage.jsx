import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaLanguage } from 'react-icons/fa';
import { doctors } from '../../data/mockData';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) };

export default function DoctorsPage() {
  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Team</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">Meet Our Expert Doctors</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Our team of experienced dental professionals is dedicated to providing you with the highest quality care in a comfortable environment.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {doctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={i}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-2/5 relative overflow-hidden">
                  <img src={doctor.photo} alt={doctor.name} className="w-full h-64 md:h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 to-transparent" />
                </div>
                <div className="md:w-3/5 p-6">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{doctor.name}</h2>
                  <p className="text-primary font-medium text-sm mb-1">{doctor.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{doctor.specialty}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, j) => <FaStar key={j} size={12} className={j < Math.floor(doctor.rating) ? '' : 'opacity-30'} />)}
                    </div>
                    <span className="text-xs text-slate-500">{doctor.rating} ({doctor.reviewCount} reviews)</span>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                    <p className="flex items-center gap-2"><FaCalendarAlt className="text-primary" /> {doctor.experience} years experience</p>
                    <p className="flex items-center gap-2"><FaLanguage className="text-primary" /> {doctor.languages.join(', ')}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {doctor.certificates.slice(0, 2).map((cert, j) => (
                      <span key={j} className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs">{cert}</span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/doctors/${doctor.id}`} className="flex-1 px-4 py-2.5 rounded-xl border border-primary text-primary text-sm font-medium text-center hover:bg-primary hover:text-white transition-colors">
                      View Profile
                    </Link>
                    <Link to="/booking" className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium text-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
