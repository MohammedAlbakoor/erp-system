import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useStore from '../../store/useStore';

export default function AdminLayout() {
  const { sidebarOpen } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <Topbar />
        <main className="p-4 md:p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
