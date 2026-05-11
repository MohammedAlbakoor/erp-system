import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaTag, FaArrowLeft } from 'react-icons/fa';
import { articles } from '../../data/mockData';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-medical-white dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Article Not Found</h1>
          <Link to="/articles" className="text-primary hover:underline">Back to Articles</Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div className="pt-24 pb-20 bg-medical-white dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark mb-6">
            <FaArrowLeft /> Back to Articles
          </Link>

          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <img src={article.image} alt={article.title} className="w-full h-64 md:h-80 object-cover" />
            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{article.category}</span>
                <span className="flex items-center gap-1"><FaClock /> {article.readTime}</span>
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">{article.title}</h1>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{article.excerpt}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{article.content}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">Regular dental care is essential for maintaining optimal oral health. Our team at DentaCare Clinic is always here to help you with any dental concerns. Do not hesitate to book an appointment or contact us for more information.</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">Remember, prevention is always better than treatment. Maintaining good oral hygiene habits, eating a balanced diet, and visiting your dentist regularly are the best ways to keep your smile healthy for life.</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                {article.keywords.map((kw) => (
                  <span key={kw} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs flex items-center gap-1">
                    <FaTag size={10} /> {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((a) => (
                  <Link key={a.id} to={`/articles/${a.id}`} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                    <img src={a.image} alt={a.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform" />
                    <div className="p-4">
                      <h3 className="font-bold text-sm text-slate-800 dark:text-white group-hover:text-primary transition-colors line-clamp-2">{a.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{a.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
