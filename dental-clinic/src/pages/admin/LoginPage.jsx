import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import useStore from '../../store/useStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useStore();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter email and password'); return; }
    setCurrentUser({ name: 'Dr. Ahmed Al-Rashid', role: 'Admin', avatar: 'AA' });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-medical-white to-secondary/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/5" />
        <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-secondary/5" />
        <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-accent/5" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative z-10">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-slate-700/50 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
              <FaTooth className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">DentaCare</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to your dashboard</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@dentacare.com" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded-md text-primary border-slate-300 focus:ring-primary" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
            </div>

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25 transition-colors">
              Sign In
            </motion.button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">Demo: Use any email/password to login</p>
        </div>
      </motion.div>
    </div>
  );
}
