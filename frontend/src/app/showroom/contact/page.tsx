'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { showroomApi } from '@/lib/showroomApi';

const fadeInUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    showroomApi.getContact()
      .then((data: { settings: Record<string, string> }) => setSettings(data.settings || {}))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await showroomApi.submitContactMessage(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const phone = settings['phone'] || '+966 50 123 4567';
  const email = settings['email'] || 'info@autoelite.com';
  const address = settings['address'] || 'King Fahd Road, Riyadh, Saudi Arabia';
  const workingHours = settings['working_hours'] || 'Sat-Thu: 9AM-10PM';

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
            <h1 className="text-5xl font-black text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">We&apos;re here to help. Reach out to us through any channel and our team will respond promptly.</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '📍', title: 'Visit Us', info: address, extra: workingHours },
            { icon: '📞', title: 'Call Us', info: phone, extra: 'Available during working hours' },
            { icon: '📧', title: 'Email Us', info: email, extra: 'We respond within 24 hours' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center hover:border-amber-500/30 transition-all">
              <span className="text-5xl block mb-4">{item.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-amber-400 font-semibold mb-1">{item.info}</p>
              <p className="text-gray-500 text-sm">{item.extra}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-black text-white mb-8">Send Us a Message</h2>
            {submitSuccess && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-xl mb-6">
                Message sent successfully! We will contact you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name *" required className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone Number" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
              <input type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} placeholder="Subject" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
              <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Your Message *" required rows={5} className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
              <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-amber-500/25 disabled:opacity-50">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-black text-white mb-8">Our Location</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-500/30 transition-all mb-8">
              <h3 className="text-white font-bold mb-2">{settings['showroom_name'] || 'AutoElite Motors'}</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>{address}</p>
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{phone}</p>
                <p className="flex items-center gap-2"><svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{workingHours}</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                <p className="text-sm">Google Maps will be embedded here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
