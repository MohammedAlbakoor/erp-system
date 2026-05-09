export interface CarBrand {
  id: number;
  name: string;
  name_ar: string | null;
  logo: string | null;
  slug: string;
  status: boolean;
  sort_order: number;
  models?: CarModelType[];
  cars_count?: number;
}

export interface CarModelType {
  id: number;
  brand_id: number;
  name: string;
  name_ar: string | null;
  slug: string;
  status: boolean;
  brand?: CarBrand;
}

export interface CarCategory {
  id: number;
  name: string;
  name_ar: string | null;
  slug: string;
  icon: string | null;
  status: boolean;
  sort_order: number;
  cars_count?: number;
}

export interface CarImage {
  id: number;
  car_id: number;
  image: string;
  alt_text: string | null;
  is_main: boolean;
  sort_order: number;
}

export interface Car {
  id: number;
  brand_id: number;
  model_id: number;
  category_id: number | null;
  title: string;
  title_ar: string | null;
  slug: string;
  year: number;
  price: number;
  old_price: number | null;
  currency: string;
  status: 'available' | 'reserved' | 'sold' | 'archived';
  condition: 'new' | 'used';
  mileage: number;
  fuel_type: string;
  transmission: string;
  engine_size: string | null;
  cylinders: number | null;
  horsepower: string | null;
  torque: string | null;
  drive_type: string | null;
  fuel_consumption: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  doors: number;
  seats: number;
  origin_country: string | null;
  chassis_number: string | null;
  internal_number: string | null;
  description: string | null;
  description_ar: string | null;
  features: string[] | null;
  is_featured: boolean;
  is_offer: boolean;
  is_published: boolean;
  show_on_homepage: boolean;
  hide_price: boolean;
  meta_title: string | null;
  meta_description: string | null;
  views_count: number;
  inquiries_count: number;
  video_url: string | null;
  youtube_url: string | null;
  created_at: string;
  brand?: CarBrand;
  car_model?: CarModelType;
  category?: CarCategory;
  images?: CarImage[];
  discount_percentage?: number | null;
}

export interface CarSlider {
  id: number;
  title: string | null;
  title_ar: string | null;
  description: string | null;
  description_ar: string | null;
  image: string;
  button_text: string | null;
  button_url: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface CarTestimonial {
  id: number;
  customer_name: string;
  customer_name_ar: string | null;
  customer_image: string | null;
  rating: number;
  content: string;
  content_ar: string | null;
  is_published: boolean;
}

export interface CarServiceType {
  id: number;
  title: string;
  title_ar: string | null;
  description: string | null;
  description_ar: string | null;
  icon: string | null;
  image: string | null;
  is_active: boolean;
}

export interface CarInquiry {
  id: number;
  car_id: number | null;
  customer_name: string;
  phone: string;
  email: string | null;
  city: string | null;
  type: 'inquiry' | 'booking' | 'test_drive' | 'financing';
  message: string | null;
  status: string;
  car?: Car;
}

export interface CarBlogPost {
  id: number;
  title: string;
  title_ar: string | null;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  category: string | null;
  is_published: boolean;
  views_count: number;
  created_at: string;
}

export interface CarFaq {
  id: number;
  question: string;
  question_ar: string | null;
  answer: string;
  answer_ar: string | null;
}

export interface CarCustomer {
  id: number;
  name: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  city: string | null;
  status: string;
  notes: string | null;
  last_contact: string | null;
}

export interface CarSale {
  id: number;
  car_id: number;
  customer_id: number | null;
  final_price: number;
  payment_method: string | null;
  sale_date: string;
  notes: string | null;
  car?: Car;
  customer?: CarCustomer;
}

export interface ShowroomSettings {
  [key: string]: string;
}

export interface HomepageData {
  sliders: CarSlider[];
  featured_cars: Car[];
  latest_cars: Car[];
  offer_cars: Car[];
  services: CarServiceType[];
  testimonials: CarTestimonial[];
  brands: CarBrand[];
  categories: CarCategory[];
  stats: {
    total_cars: number;
    available_cars: number;
    sold_cars: number;
    brands_count: number;
  };
  settings: ShowroomSettings;
}

export interface CarsListResponse {
  cars: {
    data: Car[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  brands: CarBrand[];
  categories: CarCategory[];
}

export interface CarDetailResponse {
  car: Car;
  similar_cars: Car[];
  settings: ShowroomSettings;
}
