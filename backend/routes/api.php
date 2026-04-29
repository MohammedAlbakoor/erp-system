<?php

use App\Http\Controllers\Api\AccountingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\InvoiceController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\PurchaseOrderController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\WarehouseController;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index']);
    Route::get('dashboard/sales-report', [DashboardController::class, 'salesReport']);
    Route::get('dashboard/revenue-chart', [DashboardController::class, 'revenueChart']);

    // Customers
    Route::apiResource('customers', CustomerController::class);

    // Suppliers
    Route::apiResource('suppliers', SupplierController::class);

    // Products
    Route::apiResource('products', ProductController::class);
    Route::post('products/{id}/adjust-stock', [ProductController::class, 'adjustStock']);
    Route::get('products-low-stock', [ProductController::class, 'lowStock']);
    Route::get('products-stock-report', [ProductController::class, 'stockReport']);

    // Warehouses
    Route::apiResource('warehouses', WarehouseController::class);

    // Invoices
    Route::apiResource('invoices', InvoiceController::class);
    Route::post('invoices/{id}/payment', [InvoiceController::class, 'recordPayment']);
    Route::get('invoices/{id}/pdf', [InvoiceController::class, 'downloadPdf']);

    // Accounting
    Route::get('accounts', [AccountingController::class, 'accounts']);
    Route::post('accounts', [AccountingController::class, 'storeAccount']);
    Route::get('journal-entries', [AccountingController::class, 'journalEntries']);
    Route::post('journal-entries', [AccountingController::class, 'storeJournalEntry']);
    Route::post('journal-entries/{id}/post', [AccountingController::class, 'postJournalEntry']);
    Route::get('reports/profit-loss', [AccountingController::class, 'profitAndLoss']);
    Route::get('reports/balance-sheet', [AccountingController::class, 'balanceSheet']);

    // Purchase Orders
    Route::apiResource('purchase-orders', PurchaseOrderController::class)->except(['update']);
    Route::post('purchase-orders/{id}/approve', [PurchaseOrderController::class, 'approve']);

    // Sales CRM
    Route::apiResource('leads', LeadController::class);
    Route::get('deals', [LeadController::class, 'deals']);
    Route::post('deals', [LeadController::class, 'storeDeal']);
    Route::put('deals/{id}', [LeadController::class, 'updateDeal']);

    // Employees / HR
    Route::apiResource('employees', EmployeeController::class)->except(['destroy']);
    Route::post('employees/{id}/check-in', [EmployeeController::class, 'checkIn']);
    Route::post('employees/{id}/check-out', [EmployeeController::class, 'checkOut']);
    Route::post('employees/{id}/leave-request', [EmployeeController::class, 'requestLeave']);
    Route::post('employees/{id}/leave/{leaveId}/approve', [EmployeeController::class, 'approveLeave']);
    Route::post('employees/{id}/leave/{leaveId}/reject', [EmployeeController::class, 'rejectLeave']);
    Route::post('employees/{id}/payroll', [EmployeeController::class, 'generatePayroll']);

    // Projects & Tasks
    Route::apiResource('projects', ProjectController::class);
    Route::get('projects/{id}/tasks', [ProjectController::class, 'tasks']);
    Route::post('projects/{id}/tasks', [ProjectController::class, 'storeTask']);
    Route::put('projects/{projectId}/tasks/{taskId}', [ProjectController::class, 'updateTask']);
    Route::delete('projects/{projectId}/tasks/{taskId}', [ProjectController::class, 'deleteTask']);
    Route::get('projects/{id}/kanban', [ProjectController::class, 'kanban']);

    // Notifications
    Route::get('notifications', function () {
        return response()->json(auth()->user()->notifications()->paginate(20));
    });
    Route::post('notifications/{id}/read', function ($id) {
        auth()->user()->notifications()->findOrFail($id)->markAsRead();
        return response()->json(['message' => 'Notification marked as read']);
    });
    Route::post('notifications/read-all', function () {
        auth()->user()->unreadNotifications->markAsRead();
        return response()->json(['message' => 'All notifications marked as read']);
    });
});
