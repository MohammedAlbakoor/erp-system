<?php

use App\Http\Controllers\Api\AccountingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Showroom\AdminCarController;
use App\Http\Controllers\Api\Showroom\PublicCarController;
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

// ============================================
// Car Showroom Public Routes (No Auth Required)
// ============================================
Route::prefix('showroom')->group(function () {
    Route::get('homepage', [PublicCarController::class, 'homepage']);
    Route::get('cars', [PublicCarController::class, 'cars']);
    Route::get('cars/{slug}', [PublicCarController::class, 'carDetail']);
    Route::get('brands', [PublicCarController::class, 'brands']);
    Route::get('services', [PublicCarController::class, 'services']);
    Route::get('about', [PublicCarController::class, 'about']);
    Route::get('financing', [PublicCarController::class, 'financing']);
    Route::get('contact', [PublicCarController::class, 'contact']);
    Route::get('faqs', [PublicCarController::class, 'faqs']);
    Route::get('blog', [PublicCarController::class, 'blog']);
    Route::get('blog/{slug}', [PublicCarController::class, 'blogPost']);
    Route::get('settings', [PublicCarController::class, 'settings']);
    Route::post('inquiry', [PublicCarController::class, 'inquiry']);
    Route::post('contact-message', [PublicCarController::class, 'contactMessage']);
    Route::post('compare', [PublicCarController::class, 'compare']);
});

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

    // ============================================
    // Car Showroom Admin Routes
    // ============================================
    Route::prefix('showroom-admin')->group(function () {
        Route::get('dashboard', [AdminCarController::class, 'dashboard']);

        // Cars CRUD
        Route::get('cars', [AdminCarController::class, 'carsList']);
        Route::post('cars', [AdminCarController::class, 'carStore']);
        Route::get('cars/{id}', [AdminCarController::class, 'carShow']);
        Route::put('cars/{id}', [AdminCarController::class, 'carUpdate']);
        Route::delete('cars/{id}', [AdminCarController::class, 'carDestroy']);
        Route::post('cars/{id}/images', [AdminCarController::class, 'uploadImage']);
        Route::delete('images/{id}', [AdminCarController::class, 'deleteImage']);

        // Brands
        Route::get('brands', [AdminCarController::class, 'brandsList']);
        Route::post('brands', [AdminCarController::class, 'brandStore']);
        Route::put('brands/{id}', [AdminCarController::class, 'brandUpdate']);
        Route::delete('brands/{id}', [AdminCarController::class, 'brandDestroy']);

        // Models
        Route::get('models', [AdminCarController::class, 'modelsList']);
        Route::post('models', [AdminCarController::class, 'modelStore']);
        Route::put('models/{id}', [AdminCarController::class, 'modelUpdate']);
        Route::delete('models/{id}', [AdminCarController::class, 'modelDestroy']);

        // Categories
        Route::get('categories', [AdminCarController::class, 'categoriesList']);
        Route::post('categories', [AdminCarController::class, 'categoryStore']);
        Route::put('categories/{id}', [AdminCarController::class, 'categoryUpdate']);
        Route::delete('categories/{id}', [AdminCarController::class, 'categoryDestroy']);

        // Inquiries
        Route::get('inquiries', [AdminCarController::class, 'inquiriesList']);
        Route::put('inquiries/{id}', [AdminCarController::class, 'inquiryUpdate']);
        Route::delete('inquiries/{id}', [AdminCarController::class, 'inquiryDestroy']);

        // Customers CRM
        Route::get('customers', [AdminCarController::class, 'customersList']);
        Route::post('customers', [AdminCarController::class, 'customerStore']);
        Route::put('customers/{id}', [AdminCarController::class, 'customerUpdate']);

        // Sales
        Route::get('sales', [AdminCarController::class, 'salesList']);
        Route::post('sales', [AdminCarController::class, 'saleStore']);
        Route::get('sales/reports', [AdminCarController::class, 'salesReports']);

        // Sliders
        Route::get('sliders', [AdminCarController::class, 'slidersList']);
        Route::post('sliders', [AdminCarController::class, 'sliderStore']);
        Route::put('sliders/{id}', [AdminCarController::class, 'sliderUpdate']);
        Route::delete('sliders/{id}', [AdminCarController::class, 'sliderDestroy']);

        // Testimonials
        Route::get('testimonials', [AdminCarController::class, 'testimonialsList']);
        Route::post('testimonials', [AdminCarController::class, 'testimonialStore']);
        Route::put('testimonials/{id}', [AdminCarController::class, 'testimonialUpdate']);
        Route::delete('testimonials/{id}', [AdminCarController::class, 'testimonialDestroy']);

        // Services
        Route::get('services', [AdminCarController::class, 'servicesList']);
        Route::post('services', [AdminCarController::class, 'serviceStore']);
        Route::put('services/{id}', [AdminCarController::class, 'serviceUpdate']);
        Route::delete('services/{id}', [AdminCarController::class, 'serviceDestroy']);

        // Blog
        Route::get('blog', [AdminCarController::class, 'blogList']);
        Route::post('blog', [AdminCarController::class, 'blogStore']);
        Route::put('blog/{id}', [AdminCarController::class, 'blogUpdate']);
        Route::delete('blog/{id}', [AdminCarController::class, 'blogDestroy']);

        // FAQs
        Route::get('faqs', [AdminCarController::class, 'faqsList']);
        Route::post('faqs', [AdminCarController::class, 'faqStore']);
        Route::put('faqs/{id}', [AdminCarController::class, 'faqUpdate']);
        Route::delete('faqs/{id}', [AdminCarController::class, 'faqDestroy']);

        // Settings
        Route::get('settings', [AdminCarController::class, 'settingsList']);
        Route::post('settings', [AdminCarController::class, 'settingsUpdate']);

        // Messages
        Route::get('messages', [AdminCarController::class, 'messagesList']);
        Route::put('messages/{id}/read', [AdminCarController::class, 'messageRead']);
        Route::delete('messages/{id}', [AdminCarController::class, 'messageDestroy']);
    });

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
