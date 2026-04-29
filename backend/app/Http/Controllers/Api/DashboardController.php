<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        private ReportService $reportService,
    ) {}

    public function index(): JsonResponse
    {
        return response()->json($this->reportService->getDashboardStats());
    }

    public function salesReport(Request $request): JsonResponse
    {
        $startDate = $request->get('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->get('end_date', now()->toDateString());

        return response()->json($this->reportService->getSalesReport($startDate, $endDate));
    }

    public function revenueChart(Request $request): JsonResponse
    {
        $period = $request->get('period', 'monthly');
        return response()->json($this->reportService->getRevenueChart($period));
    }
}
