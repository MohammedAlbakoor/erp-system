import { useState } from 'react';
import { motion } from 'framer-motion';
import { beforeAfterCases, doctors } from '../../data/mockData';

function ComparisonSlider({ beforeImage, afterImage }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative overflow-hidden rounded-2xl h-64 cursor-col-resize select-none" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setPosition(((e.clientX - rect.left) / rect.width) * 100); }} onTouchMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setPosition(((e.touches[0].clientX - rect.left) / rect.width) * 100); }}>
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: '100%' }} />
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <span className="text-slate-600 text-xs font-bold">&#x2194;</span>
        </div>
      </div>
      <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 text-white text-xs font-medium">Before</span>
      <span className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 text-white text-xs font-medium">After</span>
    </div>
  );
}

export default function BeforeAfterPage() {
  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Results</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">Before & After Gallery</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">See the amazing transformations achieved by our dental team. Drag the slider to compare.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterCases.map((item, i) => {
            const doctor = doctors.find((d) => d.id === item.doctorId);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <ComparisonSlider beforeImage={item.beforeImage} afterImage={item.afterImage} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{item.category}</span>
                    <span className="text-xs text-slate-400">{item.duration}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">{item.treatment}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{item.doctorNotes}</p>
                  {doctor && <p className="text-xs text-slate-400">Treated by: {doctor.name}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
