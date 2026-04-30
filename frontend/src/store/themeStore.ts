import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setTheme: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggle: () =>
    set((state) => {
      const newDark = !state.isDark;
      if (typeof window !== 'undefined') {
        localStorage.setItem('erp_theme', newDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDark);
      }
      return { isDark: newDark };
    }),
  setTheme: (dark: boolean) => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', dark);
    }
    set({ isDark: dark });
  },
}));
