'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { use } from 'react';
import { showroomApi } from '@/lib/showroomApi';
import type { Car, CarDetailResponse } from '@/types/showroom';

const featureLabels: Record<string, string> = {
  sunroof: 'Sunroof', rear_camera: 'Rear Camera', parking_sensors: 'Parking Sensors',
  touchscreen: 'Touchscreen', bluetooth: 'Bluetooth', navigation: 'Navigation',
  apple_carplay: 'Apple CarPlay', android_auto: 'Android Auto', leather_seats: 'Leather Seats',
  cruise_control: 'Cruise Control', keyless_entry: 'Keyless Entry', remote_start: 'Remote Start',
  led_lights: 'LED Lights', alloy_wheels: 'Alloy Wheels', abs: 'ABS', airbags: 'Airbags',
  blind_spot_monitor: 'Blind Spot Monitor', lane_assist: 'Lane Assist',
  heated_seats: 'Heated Seats', cooled_seats: 'Cooled Seats',
  electric_seats: 'Electric Seats', electric_mirrors: 'Electric Mirrors',
  electric_windows: 'Electric Windows', rear_ac: 'Rear AC',
};

export default function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [activeTab, setActiveTab] = useState('specs');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarDetailResponse | null>(null);
  const [inquiryForm, setInquiryForm] = useState({ customer_name: '', phone: '', email: '', city: '', type: 'inquiry', message: '' });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    showroomApi.getCarDetail(slug)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Car not found</h2>
          <Link href="/showroom/cars" className="text-amber-400 hover:text-amber-300">Back to Cars</Link>
        </div>
      </div>
    );
  }

  const car = data.car;
  const similarCars = data.similar_cars;
  const settings = data.settings;
  const whatsappNumber = settings?.whatsapp_number || '966501234567';
  const price = Number(car.price);
  const oldPrice = car.old_price ? Number(car.old_price) : null;

  const whatsappMsg = encodeURIComponent(
    `مرحبا، أريد الاستفسار عن السيارة التالية:\n\nالسيارة: ${car.title}\nالسعر: $${price.toLocaleString()}\nرقم السيارة: ${car.internal_number}\nرابط السيارة: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nهل السيارة ما زالت متوفرة؟`
  );

  const handleInquirySubmit = async () => {
    setInquirySubmitting(true);
    try {
      await showroomApi.submitInquiry({ ...inquiryForm, car_id: car.id });
      setInquirySuccess(true);
      setTimeout(() => { setShowInquiryModal(false); setInquirySuccess(false); }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setInquirySubmitting(false);
    }
  };

  const tabs = [
    { id: 'specs', label: 'Technical Specs' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'interior', label: 'Interior' },
    { id: 'safety', label: 'Safety' },
    { id: 'description', label: 'Description' },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/showroom" className="hover:text-amber-400 transition">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <Link href="/showroom/cars" className="hover:text-amber-400 transition">Cars</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-amber-400">{car.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden h-[500px] flex items-center justify-center relative">
                <svg className="w-32 h-32 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" />
                </svg>

                {/* Status badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${car.condition === 'new' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
                    {car.condition === 'new' ? 'New' : 'Used'}
                  </span>
                  {car.is_offer && oldPrice && (
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-red-500 text-white animate-pulse">
                      {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* View count */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-300 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  {car.views_count} views
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`w-20 h-16 bg-gray-800 rounded-xl border-2 transition-all ${selectedImageIndex === i ? 'border-amber-500' : 'border-gray-700 hover:border-gray-500'} flex items-center justify-center`}
                  >
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
              <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-2xl p-1 overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mt-4">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Engine', value: car.engine_size },
                      { label: 'Cylinders', value: car.cylinders },
                      { label: 'Fuel Type', value: car.fuel_type },
                      { label: 'Transmission', value: car.transmission },
                      { label: 'Drive Type', value: car.drive_type },
                      { label: 'Horsepower', value: car.horsepower },
                      { label: 'Torque', value: car.torque },
                      { label: 'Fuel Consumption', value: car.fuel_consumption },
                      { label: 'Mileage', value: car.mileage > 0 ? `${car.mileage.toLocaleString()} km` : 'New' },
                      { label: 'Origin Country', value: car.origin_country },
                      { label: 'Doors', value: car.doors },
                      { label: 'Seats', value: car.seats },
                    ].map(spec => (
                      <div key={spec.label} className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{spec.label}</span>
                        <span className="text-white font-semibold capitalize">{spec.value || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'exterior' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div><span className="text-xs text-gray-500 block mb-1">Exterior Color</span><span className="text-white font-semibold">{car.exterior_color}</span></div>
                    {car.features?.filter(f => ['led_lights', 'alloy_wheels', 'sunroof', 'parking_sensors', 'rear_camera', 'electric_mirrors', 'electric_windows'].includes(f)).map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-white">{featureLabels[f] || f}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'interior' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div><span className="text-xs text-gray-500 block mb-1">Interior Color</span><span className="text-white font-semibold">{car.interior_color}</span></div>
                    <div><span className="text-xs text-gray-500 block mb-1">Seats</span><span className="text-white font-semibold">{car.seats}</span></div>
                    {car.features?.filter(f => ['touchscreen', 'bluetooth', 'navigation', 'apple_carplay', 'android_auto', 'leather_seats', 'heated_seats', 'cooled_seats', 'electric_seats', 'rear_ac'].includes(f)).map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-white">{featureLabels[f] || f}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'safety' && (
                  <div className="grid grid-cols-2 gap-6">
                    {car.features?.filter(f => ['abs', 'airbags', 'blind_spot_monitor', 'lane_assist', 'cruise_control', 'keyless_entry', 'remote_start'].includes(f)).map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-white">{featureLabels[f] || f}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'description' && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">{car.description}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">All Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {car.features?.map(feature => (
                  <div key={feature} className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-gray-300">{featureLabels[feature] || feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-amber-400 text-sm font-semibold">{car.brand?.name}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400 text-sm">{car.car_model?.name}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400 text-sm">{car.year}</span>
                </div>

                <h1 className="text-2xl font-black text-white mb-4">{car.title}</h1>

                <div className="mb-6">
                  {oldPrice && (
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-gray-500 line-through text-lg">${oldPrice.toLocaleString()}</span>
                      <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                        Save ${(oldPrice - price).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <span className="text-4xl font-black bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                    ${price.toLocaleString()}
                  </span>
                </div>

                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-bold ${car.status === 'available' ? 'bg-green-500/20 text-green-400' : car.status === 'reserved' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                  {car.status === 'available' ? 'Available' : car.status === 'reserved' ? 'Reserved' : 'Sold'}
                </div>
              </div>

              {/* Quick Specs */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Specs</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Brand', value: car.brand?.name, icon: '🏢' },
                    { label: 'Model', value: car.car_model?.name, icon: '🚗' },
                    { label: 'Year', value: car.year, icon: '📅' },
                    { label: 'Condition', value: car.condition === 'new' ? 'New' : 'Used', icon: '✨' },
                    { label: 'Mileage', value: car.mileage > 0 ? `${car.mileage.toLocaleString()} km` : 'New', icon: '📏' },
                    { label: 'Fuel', value: car.fuel_type, icon: '⛽' },
                    { label: 'Transmission', value: car.transmission, icon: '⚙️' },
                    { label: 'Color', value: car.exterior_color, icon: '🎨' },
                    { label: 'Origin', value: car.origin_country, icon: '🌍' },
                    { label: 'Ref #', value: car.internal_number, icon: '🔢' },
                  ].map(spec => (
                    <div key={spec.label} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                      <span className="text-gray-400 text-sm flex items-center gap-2">
                        <span>{spec.icon}</span> {spec.label}
                      </span>
                      <span className="text-white font-semibold text-sm capitalize">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Book via WhatsApp
                </a>
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Inquire About This Car
                </button>
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all border border-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call Directly
                </a>
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-xl text-sm font-medium border border-gray-700 transition flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Favorite
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-xl text-sm font-medium border border-gray-700 transition flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    Share
                  </button>
                  <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-xl text-sm font-medium border border-gray-700 transition flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                    Print
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Cars */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <h2 className="text-3xl font-black text-white mb-8">Similar Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarCars.map(sc => (
              <Link
                key={sc.id}
                href={`/showroom/cars/${sc.slug}`}
                className="group bg-gray-900 border border-gray-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" /></svg>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold group-hover:text-amber-400 transition">{sc.title}</h3>
                  <p className="text-amber-400 font-black text-lg mt-1">${Number(sc.price).toLocaleString()}</p>
                  <div className="flex gap-3 text-xs text-gray-400 mt-2">
                    <span>{sc.year}</span>
                    <span>{sc.mileage > 0 ? `${(sc.mileage / 1000).toFixed(0)}K km` : 'New'}</span>
                    <span className="capitalize">{sc.transmission}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setShowInquiryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-3xl p-8 w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Inquiry Form</h3>
                <button onClick={() => setShowInquiryModal(false)} className="text-gray-400 hover:text-white p-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <p className="text-amber-400 font-semibold">{car.title}</p>
                <p className="text-gray-400 text-sm">Ref: {car.internal_number} | ${price.toLocaleString()}</p>
              </div>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowInquiryModal(false); window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, '_blank'); }}>
                <input type="text" placeholder="Your Name *" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
                <input type="tel" placeholder="Phone Number *" required className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
                <input type="text" placeholder="City" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
                <select className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-300 outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="inquiry">Inquiry</option>
                  <option value="booking">Booking</option>
                  <option value="test_drive">Test Drive</option>
                  <option value="financing">Financing</option>
                </select>
                <textarea placeholder="Notes" rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
                <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Send & Open WhatsApp
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
