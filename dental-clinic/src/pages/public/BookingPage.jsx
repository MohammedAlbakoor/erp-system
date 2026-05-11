import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { services, doctors } from '../../data/mockData';

const steps = ['Service', 'Doctor & Date', 'Your Info', 'Confirm'];

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({
    serviceId: null, doctorId: null, date: '', time: '',
    name: '', phone: '', email: '', age: '', gender: '', notes: '', isFirstVisit: true, hasEmergency: false,
  });

  const selectedService = services.find((s) => s.id === form.serviceId);
  const selectedDoctor = doctors.find((d) => d.id === form.doctorId);

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleBook = () => {
    setBooked(true);
    toast.success('Appointment booked successfully!');
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) dates.push(d);
    }
    return dates;
  };

  if (booked) {
    return (
      <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-2xl text-center max-w-md mx-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Your appointment has been successfully scheduled. We will send you a confirmation shortly.</p>
          <div className="bg-medical-white dark:bg-slate-700 rounded-xl p-4 text-left mb-6 space-y-2">
            <p className="text-sm"><span className="font-medium text-slate-800 dark:text-white">Service:</span> <span className="text-slate-600 dark:text-slate-300">{selectedService?.name}</span></p>
            <p className="text-sm"><span className="font-medium text-slate-800 dark:text-white">Doctor:</span> <span className="text-slate-600 dark:text-slate-300">{selectedDoctor?.name}</span></p>
            <p className="text-sm"><span className="font-medium text-slate-800 dark:text-white">Date:</span> <span className="text-slate-600 dark:text-slate-300">{form.date}</span></p>
            <p className="text-sm"><span className="font-medium text-slate-800 dark:text-white">Time:</span> <span className="text-slate-600 dark:text-slate-300">{form.time}</span></p>
          </div>
          <button onClick={() => { setBooked(false); setStep(0); setForm({ serviceId: null, doctorId: null, date: '', time: '', name: '', phone: '', email: '', age: '', gender: '', notes: '', isFirstVisit: true, hasEmergency: false }); }} className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors">
            Book Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Book an Appointment</h1>
          <p className="text-slate-500 dark:text-slate-400">Schedule your visit in just a few steps.</p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i <= step ? 'gradient-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                {i < step ? <FaCheckCircle /> : i + 1}
              </div>
              <span className={`hidden sm:block ml-2 text-sm font-medium ${i <= step ? 'text-primary' : 'text-slate-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-0.5 mx-2 transition-colors ${i < step ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Select a Service</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setForm({ ...form, serviceId: service.id })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${form.serviceId === service.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.icon}</span>
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-white text-sm">{service.name}</p>
                          <p className="text-xs text-slate-500">{service.duration} &middot; ${service.price}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Select Doctor & Date</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Choose a Doctor</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {doctors.map((doctor) => (
                      <motion.button
                        key={doctor.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setForm({ ...form, doctorId: doctor.id })}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${form.doctorId === doctor.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-slate-800 dark:text-white text-sm">{doctor.name}</p>
                            <p className="text-xs text-slate-500">{doctor.specialty}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Select Date</label>
                  <div className="flex flex-wrap gap-2">
                    {generateDates().map((date) => {
                      const dateStr = date.toISOString().split('T')[0];
                      return (
                        <motion.button
                          key={dateStr}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setForm({ ...form, date: dateStr })}
                          className={`px-4 py-3 rounded-xl text-center transition-all ${form.date === dateStr ? 'gradient-primary text-white shadow-lg' : 'bg-medical-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary/10'}`}
                        >
                          <div className="text-xs font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div className="text-lg font-bold">{date.getDate()}</div>
                          <div className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                {form.date && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Select Time</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setForm({ ...form, time })}
                          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${form.time === time ? 'gradient-primary text-white shadow-lg' : 'bg-medical-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-primary/10'}`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Your Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                      <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="john@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Age</label>
                      <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                      <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.isFirstVisit} onChange={(e) => setForm({ ...form, isFirstVisit: e.target.checked })} className="w-4 h-4 rounded text-primary focus:ring-primary" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">First Visit</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.hasEmergency} onChange={(e) => setForm({ ...form, hasEmergency: e.target.checked })} className="w-4 h-4 rounded text-danger focus:ring-danger" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">Emergency Pain</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                    <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" placeholder="Any additional notes..." />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Confirm Your Booking</h2>
                <div className="bg-medical-white dark:bg-slate-700 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Service', value: selectedService?.name, icon: selectedService?.icon },
                      { label: 'Doctor', value: selectedDoctor?.name },
                      { label: 'Date', value: form.date ? new Date(form.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '' },
                      { label: 'Time', value: form.time },
                      { label: 'Patient', value: form.name },
                      { label: 'Phone', value: form.phone },
                      { label: 'First Visit', value: form.isFirstVisit ? 'Yes' : 'No' },
                      { label: 'Emergency', value: form.hasEmergency ? 'Yes' : 'No' },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="flex items-start gap-2">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 min-w-[80px]">{label}:</span>
                        <span className="text-sm text-slate-800 dark:text-white font-medium">{icon && <span className="mr-1">{icon}</span>}{value}</span>
                      </div>
                    ))}
                  </div>
                  {form.notes && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-600">
                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Notes:</span>
                      <p className="text-sm text-slate-800 dark:text-white mt-1">{form.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button onClick={prev} className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
                <FaArrowLeft /> Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={next} disabled={step === 0 && !form.serviceId} className="px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                Continue <FaArrowRight />
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBook}
                className="px-10 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 shadow-lg shadow-green-500/25 transition-all flex items-center gap-2"
              >
                <FaCheckCircle /> Confirm Booking
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
