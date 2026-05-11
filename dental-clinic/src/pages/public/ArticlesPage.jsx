import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import { articles } from '../../data/mockData';

export default function ArticlesPage() {
  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Blog</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mt-2 mb-4">Dental Health Articles</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Stay informed about dental health with our expert articles and tips.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-48">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">{article.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><FaClock /> {article.readTime}</span>
                  <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">{article.excerpt}</p>
                <Link to={`/articles/${article.id}`} className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                  Read More &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
