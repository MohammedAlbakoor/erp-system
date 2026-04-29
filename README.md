# ERP Enterprise System

A complete enterprise-grade ERP system built with **Laravel 11** backend and **Next.js 16 + React 19** frontend.

## Architecture

### Backend (Laravel 11)
- **Pattern**: Service-Repository pattern
- **Auth**: JWT-based authentication with role-based access control
- **Database**: MySQL/PostgreSQL with 10 migrations, 31 models
- **Modules**: Accounting, Inventory, Sales & CRM, Purchasing, HR, Projects, Reports

### Frontend (Next.js 16)
- **Framework**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand for global state management
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

## Project Structure

```
erp-system/
├── backend/                   # Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/Api/   # 12 API controllers
│   │   ├── Models/                 # 31 Eloquent models
│   │   ├── Services/               # 7 business logic services
│   │   ├── Repositories/           # 8 data access repositories
│   │   ├── Notifications/          # Email/DB notifications
│   │   └── Http/Requests/          # Form request validation
│   ├── database/
│   │   ├── migrations/            # 10 migration files
│   │   └── seeders/               # 12 seeders with realistic data
│   └── routes/api.php             # RESTful API routes
│
├── frontend/                  # Next.js 16 App
│   └── src/
│       ├── app/                   # App Router pages
│       │   ├── login/             # Authentication
│       │   ├── dashboard/         # KPI dashboard
│       │   ├── accounting/        # Journal entries, P&L
│       │   ├── inventory/         # Products, stock
│       │   ├── sales/             # Customers, leads, invoices
│       │   ├── purchasing/        # POs, suppliers
│       │   ├── hr/                # Employees, payroll
│       │   ├── projects/          # Projects, Kanban
│       │   └── reports/           # Analytics & charts
│       ├── components/
│       │   ├── ui/                # Reusable components
│       │   └── layouts/           # Sidebar, Navbar, DashboardLayout
│       ├── store/                 # Zustand stores
│       ├── hooks/                 # Custom React hooks
│       ├── lib/                   # API client (Axios)
│       └── types/                 # TypeScript interfaces
```

## Quick Start

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
# Configure database in .env
php artisan migrate --seed
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
npm run dev
```

### Demo Credentials
- **Admin**: admin@erp.com / password
- **Manager**: sarah@erp.com / password
- **Employee**: alice@erp.com / password

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Register
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Current user

### Modules
- `GET /api/v1/dashboard` - Dashboard statistics
- `CRUD /api/v1/customers` - Customer management
- `CRUD /api/v1/suppliers` - Supplier management
- `CRUD /api/v1/products` - Product management
- `CRUD /api/v1/warehouses` - Warehouse management
- `CRUD /api/v1/invoices` - Invoice management
- `CRUD /api/v1/purchase-orders` - Purchase orders
- `CRUD /api/v1/leads` - Lead management
- `CRUD /api/v1/employees` - Employee management
- `CRUD /api/v1/projects` - Project management
- `GET /api/v1/accounts` - Chart of accounts
- `CRUD /api/v1/journal-entries` - Journal entries
- `GET /api/v1/reports/profit-loss` - P&L report
- `GET /api/v1/reports/balance-sheet` - Balance sheet

## Features

- **Dark/Light Theme** toggle with smooth transitions
- **Responsive Design** for desktop, tablet, and mobile
- **Skeleton Loading** placeholders
- **Page Animations** (fade/slide transitions)
- **Role-based Access Control** (Admin, Manager, Employee, Customer, Supplier)
- **PDF Export** for invoices
- **Interactive Charts** (Line, Bar, Pie)
- **Kanban Board** for project task management
- **Toast Notifications** for user feedback
- **Global Search** with live filtering
- **Collapsible Sidebar** with mobile hamburger menu

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Backend | Laravel 11, PHP 8.3 |
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Charts | Recharts |
| Animation | Framer Motion |
| Auth | JWT (tymon/jwt-auth) |
| PDF | Barryvdh/laravel-dompdf |
| Database | MySQL/PostgreSQL |
