import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

import PublicLayout from './components/public/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';

import Home from './pages/public/Home';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetail from './pages/public/ServiceDetail';
import DoctorsPage from './pages/public/DoctorsPage';
import DoctorProfile from './pages/public/DoctorProfile';
import BeforeAfterPage from './pages/public/BeforeAfterPage';
import ReviewsPage from './pages/public/ReviewsPage';
import ArticlesPage from './pages/public/ArticlesPage';
import ArticleDetail from './pages/public/ArticleDetail';
import ContactPage from './pages/public/ContactPage';
import BookingPage from './pages/public/BookingPage';

import Dashboard from './pages/admin/Dashboard';
import Patients from './pages/admin/Patients';
import PatientDetail from './pages/admin/PatientDetail';
import Appointments from './pages/admin/Appointments';
import Visits from './pages/admin/Visits';
import DentalChart from './pages/admin/DentalChart';
import TreatmentPlans from './pages/admin/TreatmentPlans';
import Prescriptions from './pages/admin/Prescriptions';
import Invoices from './pages/admin/Invoices';
import Inventory from './pages/admin/Inventory';
import Suppliers from './pages/admin/Suppliers';
import Labs from './pages/admin/Labs';
import Expenses from './pages/admin/Expenses';
import Reports from './pages/admin/Reports';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import AuditLog from './pages/admin/AuditLog';
import LoginPage from './pages/admin/LoginPage';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '12px', background: '#1e293b', color: '#f8fafc' },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/before-after" element={<BeforeAfterPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="visits" element={<Visits />} />
            <Route path="dental-chart/:patientId" element={<DentalChart />} />
            <Route path="treatment-plans" element={<TreatmentPlans />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="labs" element={<Labs />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="audit-log" element={<AuditLog />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
