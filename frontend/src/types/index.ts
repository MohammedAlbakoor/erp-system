export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  is_active: boolean;
  two_factor_enabled: boolean;
  role_id?: number;
  role?: Role;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  slug: string;
  permissions: string[];
  description?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
  expires_in: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface Account {
  id: number;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parent_id?: number;
  balance: number;
  is_active: boolean;
  description?: string;
  children?: Account[];
}

export interface JournalEntry {
  id: number;
  reference: string;
  date: string;
  description?: string;
  created_by: number;
  status: 'draft' | 'posted' | 'voided';
  total_debit: number;
  total_credit: number;
  lines: JournalEntryLine[];
  creator?: User;
}

export interface JournalEntryLine {
  id: number;
  journal_entry_id: number;
  account_id: number;
  debit: number;
  credit: number;
  description?: string;
  account?: Account;
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  status: 'active' | 'inactive';
  notes?: string;
  created_at: string;
}

export interface Supplier {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  tax_id?: string;
  payment_terms?: string;
  status: 'active' | 'inactive';
  notes?: string;
  created_at: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description?: string;
  category_id?: number;
  category?: ProductCategory;
  cost_price: number;
  selling_price: number;
  unit: string;
  reorder_level: number;
  barcode?: string;
  image?: string;
  is_active: boolean;
  stock_levels?: StockLevel[];
  total_stock?: number;
  created_at: string;
}

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  address?: string;
  city?: string;
  country?: string;
  manager_name?: string;
  phone?: string;
  is_active: boolean;
  stock_levels_count?: number;
}

export interface StockLevel {
  id: number;
  product_id: number;
  warehouse_id: number;
  quantity: number;
  reserved_quantity: number;
  warehouse?: Warehouse;
  product?: Product;
}

export interface Invoice {
  id: number;
  number: string;
  customer_id: number;
  customer?: Customer;
  sales_order_id?: number;
  date: string;
  due_date: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amount_paid: number;
  status: 'draft' | 'sent' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled';
  notes?: string;
  items?: InvoiceItem[];
  payments?: Payment[];
  creator?: User;
  created_at: string;
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  product_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  discount: number;
  tax: number;
  total: number;
  product?: Product;
}

export interface Payment {
  id: number;
  number: string;
  invoice_id: number;
  amount: number;
  payment_date: string;
  method: string;
  reference?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  notes?: string;
}

export interface Lead {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  estimated_value?: number;
  assigned_to?: number;
  assignee?: User;
  notes?: string;
  created_at: string;
}

export interface Deal {
  id: number;
  title: string;
  lead_id?: number;
  customer_id?: number;
  value: number;
  stage: 'prospecting' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  expected_close_date?: string;
  assigned_to?: number;
  lead?: Lead;
  customer?: Customer;
  assignee?: User;
  notes?: string;
}

export interface PurchaseOrder {
  id: number;
  number: string;
  supplier_id: number;
  supplier?: Supplier;
  order_date: string;
  expected_date?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'submitted' | 'approved' | 'received' | 'cancelled';
  items?: PurchaseOrderItem[];
  creator?: User;
  created_at: string;
}

export interface PurchaseOrderItem {
  id: number;
  purchase_order_id: number;
  product_id: number;
  quantity: number;
  received_quantity: number;
  unit_price: number;
  tax: number;
  total: number;
  product?: Product;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface Employee {
  id: number;
  user_id: number;
  employee_id: string;
  department_id?: number;
  position: string;
  hire_date: string;
  birth_date?: string;
  gender?: string;
  base_salary: number;
  employment_type: string;
  status: 'active' | 'on_leave' | 'terminated' | 'resigned';
  user?: User;
  department?: Department;
}

export interface Attendance {
  id: number;
  employee_id: number;
  date: string;
  check_in?: string;
  check_out?: string;
  hours_worked?: number;
  status: string;
}

export interface LeaveRequest {
  id: number;
  employee_id: number;
  leave_type_id: number;
  start_date: string;
  end_date: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
}

export interface Payroll {
  id: number;
  employee_id: number;
  period: string;
  base_salary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  tax: number;
  net_salary: number;
  status: 'draft' | 'approved' | 'paid';
  payment_date?: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  manager_id?: number;
  customer_id?: number;
  start_date: string;
  end_date?: string;
  budget?: number;
  progress: number;
  status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  manager?: User;
  customer?: Customer;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  project_id: number;
  assigned_to?: number;
  parent_id?: number;
  status: 'todo' | 'in_progress' | 'in_review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  start_date?: string;
  due_date?: string;
  estimated_hours?: number;
  actual_hours?: number;
  progress: number;
  sort_order: number;
  assignee?: User;
  subtasks?: Task[];
}

export interface DashboardStats {
  total_revenue: number;
  monthly_revenue: number;
  total_customers: number;
  total_products: number;
  pending_orders: number;
  active_projects: number;
  total_employees: number;
  overdue_invoices: number;
}

export interface Notification {
  id: string;
  type: string;
  data: Record<string, unknown>;
  read_at?: string;
  created_at: string;
}
