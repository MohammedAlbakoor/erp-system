'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { showroomApi } from '@/lib/showroomApi';
import type { Car, CarBrand, CarSlider, CarServiceType, CarTestimonial, HomepageData } from '@/types/showroom';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const serviceIcons: Record<string, React.ReactNode> = {
  car: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" />,
  handshake: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11l5-5m0 0l5 5m-5-5v12" />,
  calculator: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  exchange: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />,
  truck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  clipboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
  'file-text': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
};

function CarCard({ car, index, whatsappNum }: { car: Car; index: number; whatsappNum?: string }) {
  const whatsappNumber = whatsappNum || '966501234567';
  const price = Number(car.price);
  const oldPrice = car.old_price ? Number(car.old_price) : null;
  const whatsappMsg = encodeURIComponent(
    `مرحبا، أريد الاستفسار عن السيارة:\n${car.title}\nالسعر: $${price.toLocaleString()}\nرقم: ${car.internal_number || ''}`
  );

  return (
    <motion.div
      {...stagger}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" />
          </svg>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${car.condition === 'new' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
            {car.condition === 'new' ? 'New' : 'Used'}
          </span>
          {car.is_offer && oldPrice && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
              {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {car.status !== 'available' && (
          <div className="absolute top-3 right-3 z-20">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${car.status === 'sold' ? 'bg-red-600' : 'bg-amber-600'} text-white`}>
              {car.status === 'sold' ? 'Sold' : 'Reserved'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-amber-400 text-xs font-semibold mb-1">{car.brand?.name}</p>
            <h3 className="text-white font-bold text-lg leading-tight group-hover:text-amber-400 transition-colors">{car.title}</h3>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          {car.hide_price ? (
            <p className="text-amber-400 font-bold">Contact for price</p>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400">${price.toLocaleString()}</span>
              {oldPrice && (
                <span className="text-sm text-gray-500 line-through">${oldPrice.toLocaleString()}</span>
              )}
            </div>
          )}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-950/50 rounded-xl">
          <div className="text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Year</p>
            <p className="text-white text-sm font-semibold">{car.year}</p>
          </div>
          <div className="text-center border-x border-gray-800">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">KM</p>
            <p className="text-white text-sm font-semibold">{car.mileage > 0 ? `${(car.mileage / 1000).toFixed(0)}K` : 'New'}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Gear</p>
            <p className="text-white text-sm font-semibold capitalize">{car.transmission === 'automatic' ? 'Auto' : 'Manual'}</p>
          </div>
        </div>

        {/* Fuel & Color */}
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
            {car.fuel_type}
          </span>
          {car.exterior_color && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full border border-gray-600" style={{ backgroundColor: car.exterior_color.toLowerCase() }} />
              {car.exterior_color}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/showroom/cars/${car.slug}`}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold py-3 rounded-xl text-center transition-all duration-200"
          >
            Details
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-3 rounded-xl text-center transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShowroomHomePage() {
  const [searchBrand, setSearchBrand] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchPriceFrom, setSearchPriceFrom] = useState('');
  const [searchPriceTo, setSearchPriceTo] = useState('');
  const [searchCondition, setSearchCondition] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HomepageData | null>(null);

  useEffect(() => {
    showroomApi.getHomepage()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sliders = data?.sliders || [];
  const brands = data?.brands || [];
  const featuredCars = data?.featured_cars || [];
  const latestCars = data?.latest_cars || [];
  const offerCars = data?.offer_cars || [];
  const services = data?.services || [];
  const testimonials = data?.testimonials || [];
  const stats = data?.stats;
  const settings = data?.settings || {};
  const whatsappNumber = settings['whatsapp_number'] || '966501234567';

  useEffect(() => {
    const slideCount = sliders.length || 3;
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slideCount), 5000);
    return () => clearInterval(timer);
  }, [sliders.length]);

  const heroSlides = sliders.length > 0
    ? sliders.map(s => ({ title: s.title || '', titleAr: s.title_ar || '', desc: s.description || '', descAr: s.description_ar || '' }))
    : [
        { title: 'Premium Cars, Exceptional Experience', titleAr: 'سيارات فاخرة، تجربة استثنائية', desc: 'Discover our handpicked collection of premium vehicles', descAr: 'اكتشف مجموعتنا المختارة بعناية من السيارات الفاخرة' },
      ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '4rem' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mb-8"
              />
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {heroSlides[currentSlide].title}
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
                {heroSlides[currentSlide].desc}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/showroom/cars"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/30 flex items-center gap-2"
              >
                Browse Cars
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <a
                href="https://wa.me/966501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp
              </a>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-12">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-12 bg-amber-400' : 'w-6 bg-gray-600 hover:bg-gray-500'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -mt-20 z-20 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gray-900/90 backdrop-blur-2xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl"
        >
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Quick Search
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <select value={searchBrand} onChange={e => setSearchBrand(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
              <option value="">All Brands</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select value={searchYear} onChange={e => setSearchYear(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
              <option value="">All Years</option>
              {Array.from({ length: 7 }, (_, i) => 2025 - i).map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <input type="number" placeholder="Price From" value={searchPriceFrom} onChange={e => setSearchPriceFrom(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none placeholder-gray-500" />
            <input type="number" placeholder="Price To" value={searchPriceTo} onChange={e => setSearchPriceTo(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none placeholder-gray-500" />
            <select value={searchCondition} onChange={e => setSearchCondition(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            <Link
              href={`/showroom/cars?brand_id=${searchBrand}&year_from=${searchYear}&year_to=${searchYear}&price_from=${searchPriceFrom}&price_to=${searchPriceTo}&condition=${searchCondition}`}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Our Brands</p>
          <h2 className="text-4xl font-black text-white">Top Automotive Brands</h2>
        </motion.div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {brands.map((brand, i) => (
            <motion.div key={brand.id} {...stagger} transition={{ delay: i * 0.05 }}>
              <Link
                href={`/showroom/cars?brand_id=${brand.id}`}
                className="group bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gray-800 group-hover:bg-amber-500/20 rounded-xl flex items-center justify-center mb-3 transition-colors">
                  <span className="text-lg font-black text-gray-400 group-hover:text-amber-400 transition-colors">{brand.name.charAt(0)}</span>
                </div>
                <p className="text-xs font-semibold text-gray-400 group-hover:text-white transition-colors text-center">{brand.name}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div {...fadeInUp} className="flex items-end justify-between mb-12">
          <div>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Featured</p>
            <h2 className="text-4xl font-black text-white">Featured Cars</h2>
          </div>
          <Link href="/showroom/cars?featured_only=true" className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.slice(0, 4).map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* Latest Cars */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">New Arrivals</p>
              <h2 className="text-4xl font-black text-white">Latest Cars Added</h2>
            </div>
            <Link href="/showroom/cars" className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
              View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestCars.slice(0, 8).map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {offerCars.length > 0 && (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div {...fadeInUp} className="flex items-end justify-between mb-12">
          <div>
            <p className="text-red-400 font-semibold text-sm tracking-widest uppercase mb-3">Hot Deals</p>
            <h2 className="text-4xl font-black text-white">Special Offers</h2>
          </div>
          <Link href="/showroom/cars?offers_only=true" className="hidden md:flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            All Offers <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerCars.slice(0, 3).map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>
      )}

      {/* Services */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">What We Offer</p>
            <h2 className="text-4xl font-black text-white mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive automotive services to meet all your needs</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                {...stagger}
                transition={{ delay: i * 0.1 }}
                className="group bg-gray-900 border border-gray-800 hover:border-amber-500/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/20 group-hover:from-amber-500 group-hover:to-amber-600 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300">
                  <svg className="w-7 h-7 text-amber-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {serviceIcons[service.icon || 'car'] || serviceIcons.car}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
                <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors">
                  Contact Us <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Trust</p>
          <h2 className="text-4xl font-black text-white mb-4">Why Choose Us?</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: '🛡️', title: 'Guaranteed Cars', titleAr: 'سيارات مضمونة' },
            { icon: '💰', title: 'Best Prices', titleAr: 'أسعار منافسة' },
            { icon: '🔍', title: 'Full Inspection', titleAr: 'فحص شامل' },
            { icon: '👨‍💼', title: 'Expert Support', titleAr: 'خدمة عملاء' },
            { icon: '📱', title: 'Easy Booking', titleAr: 'سهولة الحجز' },
            { icon: '⭐', title: '15+ Years', titleAr: 'خبرة 15+ سنة' },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-gray-900 border border-gray-800 hover:border-amber-500/30 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Reviews</p>
            <h2 className="text-4xl font-black text-white mb-4">What Our Customers Say</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                {...stagger}
                transition={{ delay: i * 0.15 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 relative"
              >
                <div className="absolute -top-4 left-8">
                  <div className="bg-amber-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-black text-xl">&ldquo;</div>
                </div>
                <div className="flex gap-1 mb-4 mt-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} className={`w-5 h-5 ${si < t.rating ? 'text-amber-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {t.customer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.customer_name}</p>
                    <p className="text-gray-500 text-xs">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: stats ? `${stats.available_cars}+` : '0', label: 'Cars Available', labelAr: 'سيارة متوفرة' },
            { value: stats ? `${stats.sold_cars}+` : '0', label: 'Cars Sold', labelAr: 'سيارة مباعة' },
            { value: stats ? `${stats.total_cars}+` : '0', label: 'Total Cars', labelAr: 'إجمالي السيارات' },
            { value: stats ? `${stats.brands_count}+` : '0', label: 'Brands', labelAr: 'علامة تجارية' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              {...stagger}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl"
            >
              <motion.span
                className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent block mb-3"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100, delay: i * 0.1 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-gray-400 font-medium text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          {...fadeInUp}
          className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-500 rounded-3xl p-12 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Find Your Dream Car Today
            </h2>
            <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
              Browse our extensive collection or contact us directly via WhatsApp for personalized assistance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/showroom/cars" className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl">
                Browse All Cars
              </Link>
              <a href="https://wa.me/966501234567" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-xl flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
