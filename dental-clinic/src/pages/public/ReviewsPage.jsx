import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { reviews } from '../../data/mockData';

export default function ReviewsPage() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Testimonials</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">Patient Reviews</h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl font-bold text-slate-800 dark:text-white">{avgRating}</span>
            <div>
              <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <FaStar key={i} size={20} className={i < Math.round(avgRating) ? '' : 'opacity-30'} />)}</div>
              <p className="text-sm text-slate-500">{reviews.length} reviews</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-yellow-400">{[...Array(5)].map((_, j) => <FaStar key={j} size={14} className={j < review.rating ? '' : 'opacity-30'} />)}</div>
                <span className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-white text-sm">{review.name}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">{review.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
