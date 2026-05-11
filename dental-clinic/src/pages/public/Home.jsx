import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaTooth, FaStar, FaCalendarCheck, FaSmile, FaArrowRight } from 'react-icons/fa';
import { clinicInfo, services, doctors, reviews } from '../../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function StatCard({ icon: Icon, value, label }) {
  return (
    <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
      <Icon className="text-primary text-3xl mx-auto mb-3" />
      <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </motion.div>
  );
}

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden h-48">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute top-4 left-4 text-3xl">{service.icon}</span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-slate-800 dark:text-white mb-2">{service.name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">{service.duration}</span>
          <Link
            to={`/services/${service.id}`}
            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
          >
            Learn More <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function DoctorCard({ doctor }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden h-64">
        <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-bold text-lg">{doctor.name}</h3>
          <p className="text-sm opacity-90">{doctor.specialty}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <FaStar key={i} size={14} className={i < Math.floor(doctor.rating) ? '' : 'opacity-30'} />)}
          </div>
          <span className="text-sm text-slate-500">{doctor.rating} ({doctor.reviewCount})</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{doctor.experience} years of experience</p>
        <div className="flex gap-2">
          <Link to={`/doctors/${doctor.id}`} className="flex-1 px-4 py-2 rounded-xl border border-primary text-primary text-sm font-medium text-center hover:bg-primary hover:text-white transition-colors">
            View Profile
          </Link>
          <Link to="/booking" className="flex-1 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium text-center hover:bg-primary-dark transition-colors">
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ReviewCard({ review }) {
  return (
    <motion.div variants={fadeUp} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
      <div className="flex text-yellow-400 mb-3">
        {[...Array(5)].map((_, i) => <FaStar key={i} size={14} className={i < review.rating ? '' : 'opacity-30'} />)}
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-slate-800 dark:text-white text-sm">{review.name}</p>
          <p className="text-xs text-slate-400">{review.service}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-medical-blue via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 pt-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <FaTooth /> Professional Dental Care
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white leading-tight mb-6"
              >
                A Healthy Smile Starts with{' '}
                <span className="text-gradient">Professional Care</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg"
              >
                {clinicInfo.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/booking"
                  className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
                >
                  Book Appointment
                </Link>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600"
                  alt="Professional dental care"
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto"
                />
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-6 -left-6 glass-card rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white">
                      <FaCalendarCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">Easy Booking</p>
                      <p className="text-xs text-slate-500">Book in 30 seconds</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{clinicInfo.stats.rating}/5</p>
                      <p className="text-xs text-slate-500">Patient Rating</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="py-16 bg-white dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={FaCalendarCheck} value={`${clinicInfo.stats.yearsExperience}+`} label="Years Experience" />
            <StatCard icon={FaSmile} value={`${(clinicInfo.stats.happyPatients / 1000).toFixed(0)}K+`} label="Happy Patients" />
            <StatCard icon={FaTooth} value={`${(clinicInfo.stats.successfulCases / 1000).toFixed(0)}K+`} label="Successful Cases" />
            <StatCard icon={FaStar} value={clinicInfo.stats.rating} label="Patient Rating" />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="py-20 bg-medical-white dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">
              Comprehensive Dental Care
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              We offer a full range of dental services to keep your smile healthy and beautiful.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Services <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Doctors Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="py-20 bg-white dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Doctors</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Our experienced dental professionals are dedicated to providing you with the best care possible.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={stagger}
        className="py-20 bg-medical-blue dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">
              What Our Patients Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full animate-float-delayed" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for Your Best Smile?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Book your appointment today and take the first step towards a healthier, more beautiful smile.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="px-8 py-4 rounded-2xl bg-white text-primary font-semibold text-lg hover:bg-slate-50 shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Book Now
              </Link>
              <a
                href={`tel:${clinicInfo.phone}`}
                className="px-8 py-4 rounded-2xl border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
