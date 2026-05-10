import api from './api';
import type {
  HomepageData,
  CarsListResponse,
  CarDetailResponse,
  Car,
  CarBrand,
  CarModelType,
  CarCategory,
  CarServiceType,
  CarBlogPost,
  CarFaq,
  CarInquiry,
  CarCustomer,
  CarSale,
  CarSlider,
  CarTestimonial,
  ShowroomSettings,
} from '@/types/showroom';

const SHOWROOM_PREFIX = '/showroom';
const ADMIN_PREFIX = '/showroom-admin';

export const showroomApi = {
  getHomepage: () =>
    api.get<HomepageData>(`${SHOWROOM_PREFIX}/homepage`).then(r => r.data),

  getCars: (params?: Record<string, string | number | boolean>) =>
    api.get<CarsListResponse>(`${SHOWROOM_PREFIX}/cars`, { params }).then(r => r.data),

  getCarDetail: (slug: string) =>
    api.get<CarDetailResponse>(`${SHOWROOM_PREFIX}/cars/${slug}`).then(r => r.data),

  getBrands: () =>
    api.get<CarBrand[]>(`${SHOWROOM_PREFIX}/brands`).then(r => r.data),

  getServices: () =>
    api.get<{ services: CarServiceType[]; settings: ShowroomSettings }>(`${SHOWROOM_PREFIX}/services`).then(r => r.data),

  getAbout: () =>
    api.get<{ settings: ShowroomSettings; stats: Record<string, number> }>(`${SHOWROOM_PREFIX}/about`).then(r => r.data),

  getFinancing: () =>
    api.get<{ settings: ShowroomSettings }>(`${SHOWROOM_PREFIX}/financing`).then(r => r.data),

  getContact: () =>
    api.get<{ settings: ShowroomSettings; branches: Array<{ id: number; name: string; name_ar: string; address: string; phone: string; whatsapp: string; email: string; working_hours: string; is_main: boolean }> }>(`${SHOWROOM_PREFIX}/contact`).then(r => r.data),

  getFaqs: () =>
    api.get<CarFaq[]>(`${SHOWROOM_PREFIX}/faqs`).then(r => r.data),

  getBlog: (params?: Record<string, string | number>) =>
    api.get<{ data: CarBlogPost[]; current_page: number; last_page: number }>(`${SHOWROOM_PREFIX}/blog`, { params }).then(r => r.data),

  getBlogPost: (slug: string) =>
    api.get<{ post: CarBlogPost; related: CarBlogPost[] }>(`${SHOWROOM_PREFIX}/blog/${slug}`).then(r => r.data),

  getSettings: () =>
    api.get<ShowroomSettings>(`${SHOWROOM_PREFIX}/settings`).then(r => r.data),

  submitInquiry: (data: {
    car_id?: number;
    customer_name: string;
    phone: string;
    email?: string;
    city?: string;
    type: string;
    message?: string;
  }) => api.post(`${SHOWROOM_PREFIX}/inquiry`, data),

  submitContactMessage: (data: {
    name: string;
    phone?: string;
    email?: string;
    subject?: string;
    message: string;
  }) => api.post(`${SHOWROOM_PREFIX}/contact-message`, data),

  compareCars: (ids: number[]) =>
    api.post(`${SHOWROOM_PREFIX}/compare`, { ids }).then(r => r.data),
};

// Admin API
export const adminApi = {
  getDashboard: () =>
    api.get<{
      stats: Record<string, number>;
      most_viewed: Car[];
      latest_cars: Car[];
      latest_inquiries: (CarInquiry & { car?: Car })[];
      cars_by_brand: (CarBrand & { cars_count: number })[];
      cars_by_status: { status: string; count: number }[];
    }>(`${ADMIN_PREFIX}/dashboard`).then(r => r.data),

  // Cars
  getCarsList: (params?: Record<string, string | number>) =>
    api.get<{ data: Car[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/cars`, { params }).then(r => r.data),
  getCar: (id: number) =>
    api.get<Car>(`${ADMIN_PREFIX}/cars/${id}`).then(r => r.data),
  createCar: (data: FormData) =>
    api.post<Car>(`${ADMIN_PREFIX}/cars`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  updateCar: (id: number, data: Record<string, unknown>) =>
    api.put<Car>(`${ADMIN_PREFIX}/cars/${id}`, data).then(r => r.data),
  deleteCar: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/cars/${id}`),
  uploadCarImage: (carId: number, data: FormData) =>
    api.post(`${ADMIN_PREFIX}/cars/${carId}/images`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteCarImage: (imageId: number) =>
    api.delete(`${ADMIN_PREFIX}/images/${imageId}`),

  // Brands
  getBrands: (params?: Record<string, string | number>) =>
    api.get<{ data: CarBrand[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/brands`, { params }).then(r => r.data),
  createBrand: (data: FormData) =>
    api.post(`${ADMIN_PREFIX}/brands`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateBrand: (id: number, data: FormData) =>
    api.put(`${ADMIN_PREFIX}/brands/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteBrand: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/brands/${id}`),

  // Models
  getModels: (params?: Record<string, string | number>) =>
    api.get<{ data: CarModelType[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/models`, { params }).then(r => r.data),
  createModel: (data: Record<string, unknown>) =>
    api.post(`${ADMIN_PREFIX}/models`, data),
  updateModel: (id: number, data: Record<string, unknown>) =>
    api.put(`${ADMIN_PREFIX}/models/${id}`, data),
  deleteModel: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/models/${id}`),

  // Categories
  getCategories: (params?: Record<string, string | number>) =>
    api.get<{ data: CarCategory[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/categories`, { params }).then(r => r.data),
  createCategory: (data: Record<string, unknown>) =>
    api.post(`${ADMIN_PREFIX}/categories`, data),
  updateCategory: (id: number, data: Record<string, unknown>) =>
    api.put(`${ADMIN_PREFIX}/categories/${id}`, data),
  deleteCategory: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/categories/${id}`),

  // Inquiries
  getInquiries: (params?: Record<string, string | number>) =>
    api.get<{ data: CarInquiry[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/inquiries`, { params }).then(r => r.data),
  updateInquiry: (id: number, data: Record<string, unknown>) =>
    api.put(`${ADMIN_PREFIX}/inquiries/${id}`, data),
  deleteInquiry: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/inquiries/${id}`),

  // Customers
  getCustomers: (params?: Record<string, string | number>) =>
    api.get<{ data: CarCustomer[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/customers`, { params }).then(r => r.data),
  createCustomer: (data: Record<string, unknown>) =>
    api.post(`${ADMIN_PREFIX}/customers`, data),
  updateCustomer: (id: number, data: Record<string, unknown>) =>
    api.put(`${ADMIN_PREFIX}/customers/${id}`, data),

  // Sales
  getSales: (params?: Record<string, string | number>) =>
    api.get<{ data: CarSale[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/sales`, { params }).then(r => r.data),
  createSale: (data: Record<string, unknown>) =>
    api.post(`${ADMIN_PREFIX}/sales`, data),
  getSalesReports: () =>
    api.get(`${ADMIN_PREFIX}/sales/reports`).then(r => r.data),

  // Sliders
  getSliders: () =>
    api.get<CarSlider[]>(`${ADMIN_PREFIX}/sliders`).then(r => r.data),
  createSlider: (data: FormData) =>
    api.post(`${ADMIN_PREFIX}/sliders`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateSlider: (id: number, data: FormData) =>
    api.put(`${ADMIN_PREFIX}/sliders/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteSlider: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/sliders/${id}`),

  // Testimonials
  getTestimonials: () =>
    api.get<CarTestimonial[]>(`${ADMIN_PREFIX}/testimonials`).then(r => r.data),
  createTestimonial: (data: Record<string, unknown>) =>
    api.post(`${ADMIN_PREFIX}/testimonials`, data),
  updateTestimonial: (id: number, data: Record<string, unknown>) =>
    api.put(`${ADMIN_PREFIX}/testimonials/${id}`, data),
  deleteTestimonial: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/testimonials/${id}`),

  // Services
  getServices: () =>
    api.get<CarServiceType[]>(`${ADMIN_PREFIX}/services`).then(r => r.data),
  createService: (data: FormData) =>
    api.post(`${ADMIN_PREFIX}/services`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateService: (id: number, data: FormData) =>
    api.put(`${ADMIN_PREFIX}/services/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteService: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/services/${id}`),

  // Blog
  getBlogList: (params?: Record<string, string | number>) =>
    api.get<{ data: CarBlogPost[]; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/blog`, { params }).then(r => r.data),
  createBlogPost: (data: FormData) =>
    api.post(`${ADMIN_PREFIX}/blog`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateBlogPost: (id: number, data: FormData) =>
    api.put(`${ADMIN_PREFIX}/blog/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteBlogPost: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/blog/${id}`),

  // FAQs
  getFaqs: () =>
    api.get<CarFaq[]>(`${ADMIN_PREFIX}/faqs`).then(r => r.data),
  createFaq: (data: Record<string, unknown>) =>
    api.post(`${ADMIN_PREFIX}/faqs`, data),
  updateFaq: (id: number, data: Record<string, unknown>) =>
    api.put(`${ADMIN_PREFIX}/faqs/${id}`, data),
  deleteFaq: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/faqs/${id}`),

  // Settings
  getSettings: () =>
    api.get<ShowroomSettings>(`${ADMIN_PREFIX}/settings`).then(r => r.data),
  updateSettings: (data: Record<string, string>) =>
    api.post(`${ADMIN_PREFIX}/settings`, data),

  // Messages
  getMessages: (params?: Record<string, string | number>) =>
    api.get<{ data: Array<{ id: number; name: string; phone: string; email: string; subject: string; message: string; is_read: boolean; created_at: string }>; current_page: number; last_page: number; total: number }>(`${ADMIN_PREFIX}/messages`, { params }).then(r => r.data),
  markMessageRead: (id: number) =>
    api.put(`${ADMIN_PREFIX}/messages/${id}/read`),
  deleteMessage: (id: number) =>
    api.delete(`${ADMIN_PREFIX}/messages/${id}`),
};
