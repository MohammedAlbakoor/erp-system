'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--card-bg)',
          color: 'var(--foreground)',
          border: '1px solid var(--border-color)',
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        },
        success: {
          iconTheme: { primary: '#22c55e', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
        },
      }}
    />
  );
}
