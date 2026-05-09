'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/showroom', label: 'Home', labelAr: 'الرئيسية' },
  { href: '/showroom/cars', label: 'Cars', labelAr: 'السيارات' },
  { href: '/showroom/cars?condition=new', label: 'New Cars', labelAr: 'سيارات جديدة' },
  { href: '/showroom/cars?condition=used', label: 'Used Cars', labelAr: 'سيارات مستعملة' },
  { href: '/showroom/cars?offers_only=true', label: 'Special Offers', labelAr: 'العروض الخاصة' },
  { href: '/showroom/about', label: 'About Us', labelAr: 'من نحن' },
  { href: '/showroom/services', label: 'Services', labelAr: 'خدماتنا' },
  { href: '/showroom/financing', label: 'Financing', labelAr: 'التمويل' },
  { href: '/showroom/contact', label: 'Contact', labelAr: 'تواصل معنا' },
];

export default function ShowroomLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('ar');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = lang === 'ar';
  const whatsappNumber = '966501234567';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-gray-950 text-white ${isRtl ? 'font-arabic' : ''}`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-black text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={`tel:+${whatsappNumber}`} className="flex items-center gap-1 hover:text-gray-800 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="font-semibold">+966 50 123 4567</span>
            </a>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{isRtl ? 'السبت - الخميس: 9 ص - 10 م' : 'Sat-Thu: 9AM-10PM'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {['facebook', 'twitter', 'instagram', 'youtube'].map(social => (
                <a key={social} href="#" className="hover:text-gray-800 transition" aria-label={social}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
            <button
              onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="bg-black/20 px-3 py-0.5 rounded-full text-xs font-bold hover:bg-black/30 transition"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-amber-500/5 border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/showroom" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/30 to-amber-600/30 rounded-xl blur group-hover:blur-md transition-all" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                  AutoElite
                </h1>
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Motors</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-amber-400 rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {isRtl ? link.labelAr : link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {isRtl ? 'واتساب' : 'WhatsApp'}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all"
                  >
                    {isRtl ? link.labelAr : link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-400/40 transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">1</span>
      </a>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link href="/showroom" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                  AutoElite Motors
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {isRtl
                  ? 'معرض سيارات متميز بخبرة تزيد عن 15 عامًا. نقدم أفضل السيارات المختارة بعناية.'
                  : 'Premium car showroom with 15+ years of experience. Offering handpicked quality vehicles.'
                }
              </p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram', 'youtube', 'tiktok'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-black transition-all duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-amber-400 font-bold text-lg mb-6">{isRtl ? 'روابط سريعة' : 'Quick Links'}</h3>
              <ul className="space-y-3">
                {[
                  { href: '/showroom/cars', label: isRtl ? 'جميع السيارات' : 'All Cars' },
                  { href: '/showroom/cars?condition=new', label: isRtl ? 'سيارات جديدة' : 'New Cars' },
                  { href: '/showroom/cars?condition=used', label: isRtl ? 'سيارات مستعملة' : 'Used Cars' },
                  { href: '/showroom/cars?offers_only=true', label: isRtl ? 'العروض' : 'Offers' },
                  { href: '/showroom/financing', label: isRtl ? 'التمويل والتقسيط' : 'Financing' },
                  { href: '/showroom/blog', label: isRtl ? 'المدونة' : 'Blog' },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-amber-400 font-bold text-lg mb-6">{isRtl ? 'خدماتنا' : 'Our Services'}</h3>
              <ul className="space-y-3">
                {(isRtl
                  ? ['بيع السيارات', 'شراء السيارات', 'تبديل السيارات', 'التمويل والتقسيط', 'فحص السيارات', 'شحن السيارات']
                  : ['Car Sales', 'Car Purchase', 'Car Trade-In', 'Financing', 'Car Inspection', 'Car Shipping']
                ).map(service => (
                  <li key={service}>
                    <Link href="/showroom/services" className="text-gray-400 hover:text-amber-400 text-sm transition-colors flex items-center gap-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-amber-400 font-bold text-lg mb-6">{isRtl ? 'تواصل معنا' : 'Contact Us'}</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {isRtl ? 'طريق الملك فهد، الرياض' : 'King Fahd Road, Riyadh'}
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href="tel:+966501234567" className="hover:text-amber-400 transition">+966 50 123 4567</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:info@autoelite.com" className="hover:text-amber-400 transition">info@autoelite.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {isRtl ? 'السبت-الخميس: 9ص-10م' : 'Sat-Thu: 9AM-10PM'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} AutoElite Motors. {isRtl ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="/login" className="hover:text-amber-400 transition">{isRtl ? 'لوحة التحكم' : 'Admin Panel'}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
