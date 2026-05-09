import api from './api';
import type {
  HomepageData,
  CarsListResponse,
  CarDetailResponse,
  CarBrand,
  CarServiceType,
  CarBlogPost,
  CarFaq,
  ShowroomSettings,
} from '@/types/showroom';

const SHOWROOM_PREFIX = '/showroom';

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
