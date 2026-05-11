---
name: testing-dental-clinic
description: Test the dental clinic management website end-to-end. Use when verifying UI, booking flow, admin dashboard, or dental chart changes.
---

# Testing the Dental Clinic App

## Dev Server Setup

```bash
cd dental-clinic
npm install
npm run dev
```

- The dev server runs on port 5173 by default. If that port is in use, Vite auto-assigns the next available port (e.g., 5174). Check the terminal output for the actual URL.
- The app is a React 19 + Vite + Tailwind CSS v4 SPA with no backend — all data comes from `src/data/mockData.js`.

## Key Test Flows

### 1. Public Website
- **Homepage** (`/`): Verify header shows "DentaCare Clinic" with 7 nav links, hero tagline, stats section (15 years, 12,000+ patients, 25,000+ cases), and service cards.
- **Dark mode**: Click the sun/moon toggle in the header. Verify `<html>` gets class `dark` and background/text colors invert.
- **Booking wizard** (`/booking`): 4-step flow — select service → select doctor/date/time → fill patient info → confirm. Success shows green checkmark + toast notification.

### 2. Admin Dashboard
- Navigate to `/admin` to access the dashboard.
- **Sidebar**: Should show 16 menu items (Dashboard, Patients, Appointments, Visits, Dental Chart, Treatment Plans, Prescriptions, Invoices, Inventory, Suppliers, Laboratories, Expenses, Reports, Users, Settings, Audit Log).
- **KPI cards**: Today's Appointments, Total Patients, Revenue, Emergencies.
- **Charts**: Revenue area chart, Services pie chart, Weekly bar chart (all Recharts).

### 3. Patient Management
- Navigate to `/admin/patients`.
- First patient: John Smith, PT-001, Male, age 39, New York.

### 4. Interactive Dental Chart
- Navigate to `/admin/dental-chart/1` (John Smith's chart).
- Click a tooth (e.g., #11) to select it.
- Click a status button (e.g., "Decay") to change the tooth color.
- Verify the Chart Summary panel updates.

### 5. Admin Page Rendering
- Click through sidebar links (Invoices, Inventory, Reports, etc.) and verify each page renders without blank screens or console errors.

## Common Issues

- **MockData field mismatches**: When components reference mockData fields, verify the exact property names. For example, `auditLog` entries use `target` (not `details`), `timestamp` (not `date`/`time`), and `ip`. The `clinicInfo` object uses `workingHours.weekdays` (not `hours`).
- **Port conflicts**: If port 5173 is occupied, Vite picks the next available port. Always check terminal output.
- **Gender dropdown in booking**: The native `<select>` dropdown may need a click on the dropdown first, then a click on the option. JavaScript `change` events may not fire with programmatic selection alone.
- **Framer Motion animations**: Some elements animate in on page load. Wait briefly before asserting visibility.

## Tech Stack Reference
- React 19, Vite, Tailwind CSS v4, Framer Motion, Recharts, Zustand, React Router v6
- FDI tooth numbering system (11-28 upper, 31-48 lower)
- No backend — all mock data in `src/data/mockData.js` (1800+ lines)

## Devin Secrets Needed
None — this is a frontend-only app with no authentication or API keys required.
