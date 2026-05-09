'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Car } from '@/types/showroom';

const demoBrands = [
  { id: 1, name: 'Toyota' }, { id: 2, name: 'Hyundai' }, { id: 3, name: 'Kia' },
  { id: 4, name: 'BMW' }, { id: 5, name: 'Mercedes-Benz' }, { id: 6, name: 'Nissan' },
  { id: 7, name: 'Honda' }, { id: 8, name: 'Lexus' }, { id: 9, name: 'Audi' },
  { id: 10, name: 'Ford' }, { id: 11, name: 'Chevrolet' }, { id: 12, name: 'Porsche' },
];

const demoCategories = [
  { id: 1, name: 'Sedan' }, { id: 2, name: 'SUV' }, { id: 3, name: 'Pickup' },
  { id: 4, name: 'Hatchback' }, { id: 5, name: 'Coupe' }, { id: 6, name: 'Van' },
  { id: 7, name: 'Luxury' }, { id: 8, name: 'Sports' },
];

const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Pearl White', 'Dark Blue', 'Burgundy', 'Green'];

const carNames = [
  'Toyota Camry 2024', 'BMW X5 2023', 'Mercedes E-Class 2024', 'Hyundai Tucson 2024',
  'Kia Sportage 2023', 'Lexus RX 2024', 'Audi Q7 2023', 'Porsche Cayenne 2024',
  'Honda CR-V 2023', 'Nissan Patrol 2024', 'Toyota Land Cruiser 2023', 'Ford Explorer 2024',
  'Chevrolet Tahoe 2023', 'BMW 5 Series 2024', 'Mercedes S-Class 2024', 'Hyundai Sonata 2023',
  'Kia K5 2024', 'Honda Accord 2023', 'Toyota Corolla 2024', 'Nissan Altima 2023',
  'Audi A6 2024', 'Lexus ES 2023', 'Ford Mustang 2024', 'Chevrolet Camaro 2023',
];

const demoCars: Car[] = carNames.map((name, i) => ({
  id: i + 1,
  brand_id: (i % 12) + 1,
  model_id: i + 1,
  category_id: (i % 8) + 1,
  title: name,
  title_ar: null,
  slug: `car-${i + 1}`,
  year: 2020 + (i % 5),
  price: 15000 + i * 5000,
  old_price: i % 4 === 0 ? (15000 + i * 5000) * 1.15 : null,
  currency: 'USD',
  status: i % 7 === 0 ? 'sold' : i % 9 === 0 ? 'reserved' : 'available' as Car['status'],
  condition: i % 3 === 0 ? 'new' : 'used' as Car['condition'],
  mileage: i % 3 === 0 ? 0 : (i + 1) * 8000,
  fuel_type: ['gasoline', 'diesel', 'hybrid', 'electric'][i % 4],
  transmission: i % 5 === 0 ? 'manual' : 'automatic',
  engine_size: `${1.6 + (i % 4) * 0.8}L`,
  cylinders: [4, 4, 6, 6, 8][i % 5],
  horsepower: `${140 + i * 20} HP`,
  torque: null, drive_type: ['FWD', 'RWD', 'AWD', '4WD'][i % 4],
  fuel_consumption: null,
  exterior_color: colors[i % colors.length],
  interior_color: 'Black',
  doors: i % 6 === 0 ? 2 : 4,
  seats: i % 5 === 0 ? 7 : 5,
  origin_country: ['Japan', 'Germany', 'South Korea', 'USA', 'UK'][i % 5],
  chassis_number: null,
  internal_number: `CAR-${1000 + i}`,
  description: null, description_ar: null,
  features: ['sunroof', 'rear_camera', 'bluetooth'],
  is_featured: i % 3 === 0,
  is_offer: i % 4 === 0,
  is_published: true,
  show_on_homepage: false,
  hide_price: false,
  meta_title: null, meta_description: null,
  views_count: (i + 1) * 100,
  inquiries_count: (i + 1) * 3,
  video_url: null, youtube_url: null,
  created_at: new Date().toISOString(),
  brand: demoBrands[i % 12] as Car['brand'],
  images: [],
}));

function CarsContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  // Filter states
  const [brandFilter, setBrandFilter] = useState(searchParams.get('brand_id') || '');
  const [conditionFilter, setConditionFilter] = useState(searchParams.get('condition') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('year_from') || '');
  const [yearTo, setYearTo] = useState(searchParams.get('year_to') || '');
  const [priceFrom, setPriceFrom] = useState(searchParams.get('price_from') || '');
  const [priceTo, setPriceTo] = useState(searchParams.get('price_to') || '');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const offersOnly = searchParams.get('offers_only') === 'true';
  const featuredOnly = searchParams.get('featured_only') === 'true';

  const whatsappNumber = '966501234567';

  let filteredCars = [...demoCars];

  if (brandFilter) filteredCars = filteredCars.filter(c => c.brand_id === Number(brandFilter));
  if (conditionFilter) filteredCars = filteredCars.filter(c => c.condition === conditionFilter);
  if (yearFrom) filteredCars = filteredCars.filter(c => c.year >= Number(yearFrom));
  if (yearTo) filteredCars = filteredCars.filter(c => c.year <= Number(yearTo));
  if (priceFrom) filteredCars = filteredCars.filter(c => c.price >= Number(priceFrom));
  if (priceTo) filteredCars = filteredCars.filter(c => c.price <= Number(priceTo));
  if (fuelType) filteredCars = filteredCars.filter(c => c.fuel_type === fuelType);
  if (transmission) filteredCars = filteredCars.filter(c => c.transmission === transmission);
  if (categoryFilter) filteredCars = filteredCars.filter(c => c.category_id === Number(categoryFilter));
  if (colorFilter) filteredCars = filteredCars.filter(c => c.exterior_color === colorFilter);
  if (offersOnly) filteredCars = filteredCars.filter(c => c.is_offer);
  if (featuredOnly) filteredCars = filteredCars.filter(c => c.is_featured);

  if (sortBy === 'price_asc') filteredCars.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price_desc') filteredCars.sort((a, b) => b.price - a.price);
  else if (sortBy === 'year_desc') filteredCars.sort((a, b) => b.year - a.year);
  else if (sortBy === 'most_viewed') filteredCars.sort((a, b) => b.views_count - a.views_count);

  const selectClass = "w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:ring-2 focus:ring-amber-500 outline-none";

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-amber-400 font-semibold text-sm tracking-widest uppercase mb-3">Our Collection</p>
            <h1 className="text-5xl font-black text-white mb-4">
              {offersOnly ? 'Special Offers' : featuredOnly ? 'Featured Cars' : conditionFilter === 'new' ? 'New Cars' : conditionFilter === 'used' ? 'Used Cars' : 'All Cars'}
            </h1>
            <p className="text-gray-400 text-lg">{filteredCars.length} vehicles found</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-72 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filters
              </h3>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Brand</label>
                <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className={selectClass}>
                  <option value="">All Brands</option>
                  {demoBrands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Body Type</label>
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className={selectClass}>
                  <option value="">All Types</option>
                  {demoCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Condition</label>
                <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} className={selectClass}>
                  <option value="">All</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Year From</label>
                  <select value={yearFrom} onChange={e => setYearFrom(e.target.value)} className={selectClass}>
                    <option value="">Any</option>
                    {Array.from({ length: 10 }, (_, i) => 2025 - i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Year To</label>
                  <select value={yearTo} onChange={e => setYearTo(e.target.value)} className={selectClass}>
                    <option value="">Any</option>
                    {Array.from({ length: 10 }, (_, i) => 2025 - i).map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Price From</label>
                  <input type="number" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} placeholder="Min" className={selectClass} />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Price To</label>
                  <input type="number" value={priceTo} onChange={e => setPriceTo(e.target.value)} placeholder="Max" className={selectClass} />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Fuel Type</label>
                <select value={fuelType} onChange={e => setFuelType(e.target.value)} className={selectClass}>
                  <option value="">All</option>
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Transmission</label>
                <select value={transmission} onChange={e => setTransmission(e.target.value)} className={selectClass}>
                  <option value="">All</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1.5 block">Color</label>
                <select value={colorFilter} onChange={e => setColorFilter(e.target.value)} className={selectClass}>
                  <option value="">All</option>
                  {colors.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <button
                onClick={() => { setBrandFilter(''); setConditionFilter(''); setYearFrom(''); setYearTo(''); setPriceFrom(''); setPriceTo(''); setFuelType(''); setTransmission(''); setCategoryFilter(''); setColorFilter(''); }}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm py-2.5 rounded-xl transition font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Cars Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-gray-900 border border-gray-800 rounded-xl p-4">
              <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden text-gray-400 hover:text-white flex items-center gap-2 text-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filters
              </button>

              <div className="flex items-center gap-3">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none">
                  <option value="latest">Latest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="year_desc">Year: Newest</option>
                  <option value="most_viewed">Most Viewed</option>
                </select>

                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Cars */}
            {filteredCars.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-20 h-20 text-gray-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-xl font-bold text-gray-400 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car, i) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" /></svg>
                      </div>
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${car.condition === 'new' ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
                          {car.condition === 'new' ? 'New' : 'Used'}
                        </span>
                        {car.is_offer && car.old_price && (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500 text-white">{Math.round(((car.old_price - car.price) / car.old_price) * 100)}% OFF</span>
                        )}
                      </div>
                      {car.status !== 'available' && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${car.status === 'sold' ? 'bg-red-600' : 'bg-amber-600'} text-white`}>{car.status === 'sold' ? 'Sold' : 'Reserved'}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <p className="text-amber-400 text-xs font-semibold mb-1">{car.brand?.name}</p>
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">{car.title}</h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-black text-amber-400">${car.price.toLocaleString()}</span>
                        {car.old_price && <span className="text-sm text-gray-500 line-through">${Math.round(car.old_price).toLocaleString()}</span>}
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs p-2.5 bg-gray-950/50 rounded-lg">
                        <div><span className="text-gray-500 block">Year</span><span className="text-white font-semibold">{car.year}</span></div>
                        <div className="border-x border-gray-800"><span className="text-gray-500 block">KM</span><span className="text-white font-semibold">{car.mileage > 0 ? `${(car.mileage / 1000).toFixed(0)}K` : 'New'}</span></div>
                        <div><span className="text-gray-500 block">Gear</span><span className="text-white font-semibold capitalize">{car.transmission === 'automatic' ? 'Auto' : 'Manual'}</span></div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/showroom/cars/${car.slug}`} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition">Details</Link>
                        <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Inquiry about: ${car.title}\nPrice: $${car.price.toLocaleString()}\nRef: ${car.internal_number}`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition">WhatsApp</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCars.map((car, i) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-amber-500/50 transition-all duration-300 flex"
                  >
                    <div className="w-64 h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0 flex items-center justify-center relative">
                      <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 17h.01M16 17h.01M3 11l1.5-5.5A2 2 0 016.44 4h11.12a2 2 0 011.94 1.5L21 11M3 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-6M3 11h18" /></svg>
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${car.condition === 'new' ? 'bg-emerald-500' : 'bg-blue-500'} text-white`}>{car.condition === 'new' ? 'New' : 'Used'}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-5 flex items-center justify-between">
                      <div>
                        <p className="text-amber-400 text-xs font-semibold">{car.brand?.name}</p>
                        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">{car.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                          <span>{car.year}</span>
                          <span>{car.mileage > 0 ? `${(car.mileage / 1000).toFixed(0)}K km` : 'New'}</span>
                          <span className="capitalize">{car.transmission}</span>
                          <span className="capitalize">{car.fuel_type}</span>
                          {car.exterior_color && <span>{car.exterior_color}</span>}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-amber-400">${car.price.toLocaleString()}</span>
                          {car.old_price && <span className="text-sm text-gray-500 line-through">${Math.round(car.old_price).toLocaleString()}</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href={`/showroom/cars/${car.slug}`} className="bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl text-center transition">Details</Link>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl text-center transition">WhatsApp</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>}>
      <CarsContent />
    </Suspense>
  );
}
