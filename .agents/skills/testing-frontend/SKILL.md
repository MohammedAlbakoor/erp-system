# ERP Frontend Testing Skill

How to test the Next.js frontend of the ERP system.

## Prerequisites

- Node.js 22+ installed
- Frontend dependencies installed (`cd frontend && npm install`)
- Dev server running (`npm run dev` from `frontend/` directory, runs on port 3000)

## Devin Secrets Needed

None required for frontend-only testing. Backend testing would require database credentials.

## Auth Bypass (No Backend)

The frontend guards all dashboard routes via `DashboardLayout`, which reads from localStorage. To bypass login without a running backend:

```javascript
// Run in browser console before navigating to /dashboard
localStorage.setItem('erp_token', 'test-token-123');
localStorage.setItem('erp_user', JSON.stringify({
  id: 1,
  name: 'Admin User',
  email: 'admin@erp.com',
  role: { id: 1, name: 'Admin', permissions: {} }
}));
```

Then navigate to `http://localhost:3000/dashboard`.

## What Can Be Tested Without Backend

- **Login page**: Renders at `/login` with prefilled demo credentials
- **Dashboard**: Charts use hardcoded mock data (line, pie, bar charts all render)
- **StatCards**: All module pages show hardcoded stat values
- **Theme toggle**: Click moon/sun icon in navbar; toggles `dark` class on `<html>`
- **Sidebar**: Navigation between all 8 modules; collapse/expand toggle at bottom
- **Modals**: Open via "+ Add" buttons on each module page; close with Escape or X
- **Tab navigation**: Accounting (3 tabs), Sales (3 tabs), HR (4 tabs), Projects (2 tabs)
- **Responsive layout**: At mobile widths, sidebar hides and hamburger menu appears
- **DataTable structure**: Column headers render correctly; shows "No data found" without API

## What Requires Backend

- Login authentication (POST `/auth/login`)
- Table data population (all `usePaginatedFetch` hooks call API)
- Form submissions (create/edit/delete operations)
- Toast notifications (triggered on API success/failure)
- Kanban board (requires project task data)

## Module Pages

| Route | Module | Key Components |
|-------|--------|----------------|
| `/dashboard` | Dashboard | 4 StatCards, 3 Charts, Recent Invoices list |
| `/accounting` | Accounting | 3 tabs, Journal Entries table, Reports bar chart |
| `/inventory` | Inventory | Product DataTable, Add Product modal |
| `/sales` | Sales & CRM | 3 tabs (Customers/Leads/Invoices), New Customer modal |
| `/purchasing` | Purchasing | Supplier & PO tables, New Supplier modal |
| `/hr` | HR | 4 tabs (Employees/Attendance/Leave/Payroll) |
| `/projects` | Projects | 2 tabs (Projects/Kanban Board) |
| `/reports` | Reports | 4 charts, Export PDF/Excel buttons, date filter |

## Responsive Testing

Use Playwright CDP to emulate mobile viewport:

```python
from playwright.sync_api import sync_playwright
p = sync_playwright().start()
browser = p.chromium.connect_over_cdp('http://localhost:29229')
context = browser.contexts[0]
page = [pg for pg in context.pages if 'localhost:3000' in pg.url][0]
cdp = context.new_cdp_session(page)
cdp.send('Emulation.setDeviceMetricsOverride', {
    'width': 375, 'height': 812, 'deviceScaleFactor': 1, 'mobile': True
})
# Test mobile layout...
cdp.send('Emulation.clearDeviceMetricsOverride', {})  # Restore desktop
p.stop()
```

## State Management

- **Auth**: Zustand store reads `erp_token` and `erp_user` from localStorage
- **Theme**: Zustand store reads `erp_theme` from localStorage; toggles `dark` class on `<html>`
- **Sidebar**: Zustand store manages collapsed state; persists in component state only

## Tips

- The dev server might already be running on port 3000 from a previous session; check with `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/login`
- If port 3000 is taken, Next.js auto-selects the next available port (3001, etc.)
- Dashboard mock data is hardcoded in the page component, not fetched from API
- The sidebar collapse button is at the very bottom of the sidebar (easy to miss)
- Modal Escape-to-close is implemented via `useEffect` keydown listener in Modal.tsx
