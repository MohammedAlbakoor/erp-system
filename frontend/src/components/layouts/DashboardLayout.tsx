'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { ToastProvider } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();
  const { setTheme } = useThemeStore();
  const router = useRouter();

  useEffect(() => {
    loadUser();
    const saved = localStorage.getItem('erp_theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme(true);
    }
  }, [loadUser, setTheme]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <ToastProvider />
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="page-enter">{children}</div>
        </main>
        <footer className="border-t border-[var(--border-color)] bg-[var(--card-bg)] px-6 py-3">
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>&copy; {new Date().getFullYear()} ERP Enterprise. All rights reserved.</span>
            <span>v1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
