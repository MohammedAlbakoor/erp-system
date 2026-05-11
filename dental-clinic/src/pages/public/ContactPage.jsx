import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { clinicInfo } from '../../data/mockData';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Get in Touch</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">Contact Us</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Have a question or want to book an appointment? We would love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-6">
            {[
              { icon: FiPhone, label: 'Phone', value: clinicInfo.phone, href: `tel:${clinicInfo.phone}` },
              { icon: FaWhatsapp, label: 'WhatsApp', value: clinicInfo.phone, href: `https://wa.me/${clinicInfo.whatsapp}` },
              { icon: FiMail, label: 'Email', value: clinicInfo.email, href: `mailto:${clinicInfo.email}` },
              { icon: FiMapPin, label: 'Address', value: clinicInfo.address },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0"><Icon size={20} /></div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">{value}</a>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0"><FiClock size={20} /></div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">Working Hours</p>
                  <p className="text-sm text-slate-500 mt-1">Mon-Fri: {clinicInfo.workingHours.weekdays}</p>
                  <p className="text-sm text-slate-500">Saturday: {clinicInfo.workingHours.saturday}</p>
                  <p className="text-sm text-slate-500">Sunday: {clinicInfo.workingHours.sunday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-md">
              <p className="font-semibold text-slate-800 dark:text-white text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-medical-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Appointment inquiry" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2">
                  <FiSend /> Send Message
                </button>
              </form>
            </div>

            <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.99!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzAwLjAiTiA3M8KwNTknMjQuMCJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Clinic Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
