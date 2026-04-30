<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\Employee;
use App\Models\Invoice;
use App\Models\Product;
use App\Models\Project;
use App\Models\SalesOrder;
use Illuminate\Support\Facades\DB;

class ReportService
{
    public function getDashboardStats(): array
    {
        $currentMonth = now()->startOfMonth();
        $lastMonth = now()->subMonth()->startOfMonth();

        return [
            'total_revenue' => Invoice::where('status', 'paid')->sum('total'),
            'monthly_revenue' => Invoice::where('status', 'paid')
                ->where('date', '>=', $currentMonth)->sum('total'),
            'total_customers' => Customer::count(),
            'total_products' => Product::count(),
            'pending_orders' => SalesOrder::where('status', 'pending')->count(),
            'active_projects' => Project::where('status', 'in_progress')->count(),
            'total_employees' => Employee::where('status', 'active')->count(),
            'overdue_invoices' => Invoice::where('due_date', '<', now())
                ->whereNotIn('status', ['paid', 'cancelled'])->count(),
        ];
    }

    public function getSalesReport(string $startDate, string $endDate): array
    {
        $dailySales = Invoice::where('status', 'paid')
            ->whereBetween('date', [$startDate, $endDate])
            ->select(DB::raw('DATE(date) as day'), DB::raw('SUM(total) as total'), DB::raw('COUNT(*) as count'))
            ->groupBy('day')
            ->orderBy('day')
            ->get();

        $topCustomers = Customer::withSum(['invoices' => fn ($q) => $q->where('status', 'paid')
            ->whereBetween('date', [$startDate, $endDate])], 'total')
            ->orderByDesc('invoices_sum_total')
            ->limit(10)
            ->get();

        $topProducts = Product::withSum(['purchaseOrderItems' => fn ($q) => $q->whereHas('purchaseOrder',
            fn ($q2) => $q2->whereBetween('order_date', [$startDate, $endDate]))], 'quantity')
            ->orderByDesc('purchase_order_items_sum_quantity')
            ->limit(10)
            ->get();

        return [
            'daily_sales' => $dailySales,
            'top_customers' => $topCustomers,
            'top_products' => $topProducts,
            'total_sales' => $dailySales->sum('total'),
            'total_orders' => $dailySales->sum('count'),
        ];
    }

    public function getRevenueChart(string $period = 'monthly'): array
    {
        $query = Invoice::where('status', 'paid');

        if ($period === 'monthly') {
            return $query->select(
                DB::raw("DATE_FORMAT(date, '%Y-%m') as period"),
                DB::raw('SUM(total) as total')
            )->groupBy('period')->orderBy('period')->get()->toArray();
        }

        return $query->select(
            DB::raw('DATE(date) as period'),
            DB::raw('SUM(total) as total')
        )->groupBy('period')->orderBy('period')->get()->toArray();
    }
}
