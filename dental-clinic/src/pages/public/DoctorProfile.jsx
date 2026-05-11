import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaLanguage, FaCertificate, FaCheckCircle } from 'react-icons/fa';
import { doctors, services, reviews as allReviews } from '../../data/mockData';

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-medical-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Doctor Not Found</h1>
          <Link to="/doctors" className="text-primary hover:underline">Back to Doctors</Link>
        </div>
      </div>
    );
  }

  const doctorServices = services.filter((s) => doctor.services.includes(s.id));
  const doctorReviews = allReviews.filter((r) => r.doctorId === doctor.id);

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img src={doctor.photo} alt={doctor.name} className="w-full h-72 md:h-full object-cover" />
              </div>
              <div className="md:w-3/5 p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-1">{doctor.name}</h1>
                <p className="text-primary font-semibold mb-1">{doctor.title}</p>
                <p className="text-slate-500 dark:text-slate-400 mb-4">{doctor.specialty}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <FaStar key={i} size={16} className={i < Math.floor(doctor.rating) ? '' : 'opacity-30'} />)}</div>
                  <span className="text-sm text-slate-500">{doctor.rating} ({doctor.reviewCount} reviews)</span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">{doctor.bio}</p>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><FaCalendarAlt className="text-primary" />{doctor.experience} years</div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300"><FaLanguage className="text-primary" />{doctor.languages.join(', ')}</div>
                </div>

                <Link to="/booking" className="inline-block px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all">
                  Book with {doctor.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FaCertificate className="text-primary" /> Certifications</h2>
              <ul className="space-y-3">
                {doctor.certificates.map((cert, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <FaCheckCircle className="text-primary mt-0.5 shrink-0" /> {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Working Schedule</h2>
              <div className="space-y-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <div key={day} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{day}</span>
                    {doctor.workingDays.includes(day) ? (
                      <span className="text-sm text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-sm text-slate-400">Not Available</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Services Provided</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {doctorServices.map((s) => (
                <Link key={s.id} to={`/services/${s.id}`} className="flex items-center gap-2 p-3 rounded-xl bg-medical-white dark:bg-slate-700 hover:bg-primary/10 transition-colors">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {doctorReviews.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Patient Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctorReviews.map((review) => (
                  <div key={review.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md">
                    <div className="flex text-yellow-400 mb-2">{[...Array(5)].map((_, i) => <FaStar key={i} size={12} className={i < review.rating ? '' : 'opacity-30'} />)}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">{review.name}</span>
                      <span className="text-xs text-slate-400">{review.service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
