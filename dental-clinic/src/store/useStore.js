import { create } from 'zustand';

const useStore = create((set) => ({
  darkMode: false,
  sidebarOpen: true,
  language: 'en',
  currentUser: { id: 1, name: 'Dr. Sarah Johnson', role: 'Admin', avatar: 'SJ' },

  toggleDarkMode: () => set((state) => {
    const newMode = !state.darkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { darkMode: newMode };
  }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setLanguage: (lang) => set({ language: lang }),
  setCurrentUser: (user) => set({ currentUser: user }),

  notifications: [
    { id: 1, type: 'appointment', message: 'New appointment request from Emily Davis', time: '5 min ago', read: false },
    { id: 2, type: 'payment', message: 'Payment received: $120 from John Smith', time: '15 min ago', read: false },
    { id: 3, type: 'emergency', message: 'Emergency patient: James Brown - severe pain', time: '30 min ago', read: false },
    { id: 4, type: 'inventory', message: 'Low stock alert: Whitening Gel 35%', time: '1 hour ago', read: true },
    { id: 5, type: 'followup', message: 'Follow-up due: Robert Williams', time: '2 hours ago', read: true },
  ],
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),
  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),
}));

export default useStore;
