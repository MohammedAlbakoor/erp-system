<?php

namespace App\Http\Controllers\Api\Showroom;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\CarBlogPost;
use App\Models\CarBrand;
use App\Models\CarCategory;
use App\Models\CarContactMessage;
use App\Models\CarCustomer;
use App\Models\CarFaq;
use App\Models\CarImage;
use App\Models\CarInquiry;
use App\Models\CarModel;
use App\Models\CarSale;
use App\Models\CarService;
use App\Models\CarSlider;
use App\Models\CarTestimonial;
use App\Models\ShowroomSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminCarController extends Controller
{
    // Dashboard Stats
    public function dashboard(): JsonResponse
    {
        $stats = [
            'total_cars' => Car::count(),
            'available_cars' => Car::where('status', 'available')->count(),
            'reserved_cars' => Car::where('status', 'reserved')->count(),
            'sold_cars' => Car::where('status', 'sold')->count(),
            'new_inquiries' => CarInquiry::where('status', 'new')->count(),
            'total_inquiries' => CarInquiry::count(),
            'total_customers' => CarCustomer::count(),
            'total_messages' => CarContactMessage::count(),
            'unread_messages' => CarContactMessage::where('is_read', false)->count(),
            'total_sales' => CarSale::count(),
            'total_revenue' => CarSale::sum('final_price'),
            'monthly_sales' => CarSale::whereMonth('sale_date', now()->month)->count(),
            'monthly_revenue' => CarSale::whereMonth('sale_date', now()->month)->sum('final_price'),
        ];

        $mostViewed = Car::with(['brand', 'carModel'])->orderByDesc('views_count')->take(5)->get();
        $latestCars = Car::with(['brand', 'carModel'])->orderByDesc('created_at')->take(5)->get();
        $latestInquiries = CarInquiry::with('car')->orderByDesc('created_at')->take(5)->get();

        $carsByBrand = CarBrand::withCount('cars')->orderByDesc('cars_count')->take(10)->get();
        $carsByStatus = Car::selectRaw('status, COUNT(*) as count')->groupBy('status')->get();

        return response()->json([
            'stats' => $stats,
            'most_viewed' => $mostViewed,
            'latest_cars' => $latestCars,
            'latest_inquiries' => $latestInquiries,
            'cars_by_brand' => $carsByBrand,
            'cars_by_status' => $carsByStatus,
        ]);
    }

    // Cars CRUD
    public function carsList(Request $request): JsonResponse
    {
        $query = Car::with(['brand', 'carModel', 'category', 'images']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('internal_number', 'like', "%{$search}%");
            });
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }
        if ($request->filled('condition')) {
            $query->where('condition', $request->condition);
        }

        $cars = $query->orderByDesc('created_at')->paginate($request->get('per_page', 15));
        return response()->json($cars);
    }

    public function carStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:car_brands,id',
            'model_id' => 'required|exists:car_models,id',
            'category_id' => 'nullable|exists:car_categories,id',
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'year' => 'required|integer|min:1900|max:2030',
            'price' => 'required|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'status' => 'required|in:available,reserved,sold,archived',
            'condition' => 'required|in:new,used',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string',
            'transmission' => 'nullable|string',
            'engine_size' => 'nullable|string',
            'cylinders' => 'nullable|integer',
            'horsepower' => 'nullable|string',
            'torque' => 'nullable|string',
            'drive_type' => 'nullable|string',
            'fuel_consumption' => 'nullable|string',
            'exterior_color' => 'nullable|string',
            'interior_color' => 'nullable|string',
            'doors' => 'nullable|integer',
            'seats' => 'nullable|integer',
            'origin_country' => 'nullable|string',
            'chassis_number' => 'nullable|string',
            'plate_number' => 'nullable|string',
            'internal_number' => 'nullable|string',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'features' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_offer' => 'boolean',
            'is_published' => 'boolean',
            'show_on_homepage' => 'boolean',
            'hide_price' => 'boolean',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'video_url' => 'nullable|string',
            'youtube_url' => 'nullable|string',
            'publish_at' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title'] . '-' . uniqid());

        $car = Car::create($validated);

        return response()->json($car->load(['brand', 'carModel', 'category']), 201);
    }

    public function carShow(int $id): JsonResponse
    {
        $car = Car::with(['brand', 'carModel', 'category', 'images', 'inquiries'])->findOrFail($id);
        return response()->json($car);
    }

    public function carUpdate(Request $request, int $id): JsonResponse
    {
        $car = Car::findOrFail($id);

        $validated = $request->validate([
            'brand_id' => 'sometimes|exists:car_brands,id',
            'model_id' => 'sometimes|exists:car_models,id',
            'category_id' => 'nullable|exists:car_categories,id',
            'title' => 'sometimes|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'year' => 'sometimes|integer|min:1900|max:2030',
            'price' => 'sometimes|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'status' => 'sometimes|in:available,reserved,sold,archived',
            'condition' => 'sometimes|in:new,used',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string',
            'transmission' => 'nullable|string',
            'engine_size' => 'nullable|string',
            'cylinders' => 'nullable|integer',
            'horsepower' => 'nullable|string',
            'torque' => 'nullable|string',
            'drive_type' => 'nullable|string',
            'fuel_consumption' => 'nullable|string',
            'exterior_color' => 'nullable|string',
            'interior_color' => 'nullable|string',
            'doors' => 'nullable|integer',
            'seats' => 'nullable|integer',
            'origin_country' => 'nullable|string',
            'chassis_number' => 'nullable|string',
            'plate_number' => 'nullable|string',
            'internal_number' => 'nullable|string',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'features' => 'nullable|array',
            'is_featured' => 'boolean',
            'is_offer' => 'boolean',
            'is_published' => 'boolean',
            'show_on_homepage' => 'boolean',
            'hide_price' => 'boolean',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'video_url' => 'nullable|string',
            'youtube_url' => 'nullable|string',
            'publish_at' => 'nullable|date',
        ]);

        $car->update($validated);

        return response()->json($car->load(['brand', 'carModel', 'category', 'images']));
    }

    public function carDestroy(int $id): JsonResponse
    {
        $car = Car::findOrFail($id);
        $car->delete();
        return response()->json(['message' => 'Car deleted successfully']);
    }

    // Car Images
    public function uploadImage(Request $request, int $carId): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:5120',
            'is_main' => 'boolean',
        ]);

        $car = Car::findOrFail($carId);
        $path = $request->file('image')->store('cars', 'public');

        if ($request->boolean('is_main')) {
            $car->images()->update(['is_main' => false]);
        }

        $image = $car->images()->create([
            'image' => '/storage/' . $path,
            'is_main' => $request->boolean('is_main'),
            'sort_order' => $car->images()->count(),
        ]);

        return response()->json($image, 201);
    }

    public function deleteImage(int $imageId): JsonResponse
    {
        $image = CarImage::findOrFail($imageId);
        $image->delete();
        return response()->json(['message' => 'Image deleted']);
    }

    // Brands CRUD
    public function brandsList(): JsonResponse
    {
        $brands = CarBrand::withCount(['models', 'cars'])->orderBy('sort_order')->get();
        return response()->json($brands);
    }

    public function brandStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'name_ar' => 'nullable|string|max:100',
            'status' => 'boolean',
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        $brand = CarBrand::create($validated);
        return response()->json($brand, 201);
    }

    public function brandUpdate(Request $request, int $id): JsonResponse
    {
        $brand = CarBrand::findOrFail($id);
        $brand->update($request->only(['name', 'name_ar', 'status', 'sort_order']));
        return response()->json($brand);
    }

    public function brandDestroy(int $id): JsonResponse
    {
        CarBrand::findOrFail($id)->delete();
        return response()->json(['message' => 'Brand deleted']);
    }

    // Models CRUD
    public function modelsList(Request $request): JsonResponse
    {
        $query = CarModel::with('brand');
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }
        return response()->json($query->get());
    }

    public function modelStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:car_brands,id',
            'name' => 'required|string|max:100',
            'name_ar' => 'nullable|string|max:100',
        ]);
        $brand = CarBrand::find($validated['brand_id']);
        $validated['slug'] = Str::slug($brand->name . '-' . $validated['name']);
        $model = CarModel::create($validated);
        return response()->json($model, 201);
    }

    public function modelUpdate(Request $request, int $id): JsonResponse
    {
        $model = CarModel::findOrFail($id);
        $model->update($request->only(['name', 'name_ar', 'status', 'brand_id']));
        return response()->json($model);
    }

    public function modelDestroy(int $id): JsonResponse
    {
        CarModel::findOrFail($id)->delete();
        return response()->json(['message' => 'Model deleted']);
    }

    // Categories CRUD
    public function categoriesList(): JsonResponse
    {
        return response()->json(CarCategory::withCount('cars')->orderBy('sort_order')->get());
    }

    public function categoryStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'name_ar' => 'nullable|string|max:100',
            'icon' => 'nullable|string',
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        return response()->json(CarCategory::create($validated), 201);
    }

    public function categoryUpdate(Request $request, int $id): JsonResponse
    {
        $cat = CarCategory::findOrFail($id);
        $cat->update($request->only(['name', 'name_ar', 'icon', 'status', 'sort_order']));
        return response()->json($cat);
    }

    public function categoryDestroy(int $id): JsonResponse
    {
        CarCategory::findOrFail($id)->delete();
        return response()->json(['message' => 'Category deleted']);
    }

    // Inquiries
    public function inquiriesList(Request $request): JsonResponse
    {
        $query = CarInquiry::with(['car', 'assignedUser']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        return response()->json($query->orderByDesc('created_at')->paginate(15));
    }

    public function inquiryUpdate(Request $request, int $id): JsonResponse
    {
        $inquiry = CarInquiry::findOrFail($id);
        $inquiry->update($request->only(['status', 'assigned_to', 'notes']));
        return response()->json($inquiry);
    }

    public function inquiryDestroy(int $id): JsonResponse
    {
        CarInquiry::findOrFail($id)->delete();
        return response()->json(['message' => 'Inquiry deleted']);
    }

    // Customers CRM
    public function customersList(Request $request): JsonResponse
    {
        $query = CarCustomer::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        return response()->json($query->orderByDesc('created_at')->paginate(15));
    }

    public function customerStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'whatsapp' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'city' => 'nullable|string|max:100',
            'status' => 'nullable|in:new,interested,potential,purchased,not_interested,follow_up',
            'notes' => 'nullable|string',
        ]);
        return response()->json(CarCustomer::create($validated), 201);
    }

    public function customerUpdate(Request $request, int $id): JsonResponse
    {
        $customer = CarCustomer::findOrFail($id);
        $customer->update($request->only(['name', 'phone', 'whatsapp', 'email', 'city', 'status', 'notes', 'last_contact']));
        return response()->json($customer);
    }

    // Sales
    public function salesList(Request $request): JsonResponse
    {
        $query = CarSale::with(['car', 'customer', 'user']);

        if ($request->filled('date_from')) {
            $query->where('sale_date', '>=', $request->date_from);
        }
        if ($request->filled('date_to')) {
            $query->where('sale_date', '<=', $request->date_to);
        }

        return response()->json($query->orderByDesc('sale_date')->paginate(15));
    }

    public function saleStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'customer_id' => 'nullable|exists:car_customers,id',
            'final_price' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string',
            'sale_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();
        $sale = CarSale::create($validated);

        Car::where('id', $validated['car_id'])->update(['status' => 'sold']);

        return response()->json($sale->load(['car', 'customer']), 201);
    }

    // Sales Reports
    public function salesReports(): JsonResponse
    {
        $today = CarSale::whereDate('sale_date', today())->sum('final_price');
        $month = CarSale::whereMonth('sale_date', now()->month)->whereYear('sale_date', now()->year)->sum('final_price');
        $year = CarSale::whereYear('sale_date', now()->year)->sum('final_price');

        $monthlySales = CarSale::selectRaw('MONTH(sale_date) as month, COUNT(*) as count, SUM(final_price) as total')
            ->whereYear('sale_date', now()->year)
            ->groupBy('month')
            ->get();

        $topBrands = Car::join('car_sales', 'cars.id', '=', 'car_sales.car_id')
            ->join('car_brands', 'cars.brand_id', '=', 'car_brands.id')
            ->selectRaw('car_brands.name, COUNT(*) as count, SUM(car_sales.final_price) as total')
            ->groupBy('car_brands.name')
            ->orderByDesc('count')
            ->take(10)
            ->get();

        return response()->json([
            'today_revenue' => $today,
            'month_revenue' => $month,
            'year_revenue' => $year,
            'monthly_sales' => $monthlySales,
            'top_brands' => $topBrands,
            'total_sales_count' => CarSale::count(),
        ]);
    }

    // Sliders
    public function slidersList(): JsonResponse
    {
        return response()->json(CarSlider::orderBy('sort_order')->get());
    }

    public function sliderStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'image' => 'required|string',
            'button_text' => 'nullable|string|max:100',
            'button_url' => 'nullable|string|max:500',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);
        return response()->json(CarSlider::create($validated), 201);
    }

    public function sliderUpdate(Request $request, int $id): JsonResponse
    {
        $slider = CarSlider::findOrFail($id);
        $slider->update($request->all());
        return response()->json($slider);
    }

    public function sliderDestroy(int $id): JsonResponse
    {
        CarSlider::findOrFail($id)->delete();
        return response()->json(['message' => 'Slider deleted']);
    }

    // Testimonials
    public function testimonialsList(): JsonResponse
    {
        return response()->json(CarTestimonial::orderBy('sort_order')->get());
    }

    public function testimonialStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_name_ar' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'content' => 'required|string',
            'content_ar' => 'nullable|string',
            'is_published' => 'boolean',
        ]);
        return response()->json(CarTestimonial::create($validated), 201);
    }

    public function testimonialUpdate(Request $request, int $id): JsonResponse
    {
        $t = CarTestimonial::findOrFail($id);
        $t->update($request->all());
        return response()->json($t);
    }

    public function testimonialDestroy(int $id): JsonResponse
    {
        CarTestimonial::findOrFail($id)->delete();
        return response()->json(['message' => 'Testimonial deleted']);
    }

    // Services
    public function servicesList(): JsonResponse
    {
        return response()->json(CarService::orderBy('sort_order')->get());
    }

    public function serviceStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'icon' => 'nullable|string',
            'is_active' => 'boolean',
        ]);
        return response()->json(CarService::create($validated), 201);
    }

    public function serviceUpdate(Request $request, int $id): JsonResponse
    {
        $s = CarService::findOrFail($id);
        $s->update($request->all());
        return response()->json($s);
    }

    public function serviceDestroy(int $id): JsonResponse
    {
        CarService::findOrFail($id)->delete();
        return response()->json(['message' => 'Service deleted']);
    }

    // Blog Posts
    public function blogList(Request $request): JsonResponse
    {
        $query = CarBlogPost::with('author');
        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }
        return response()->json($query->orderByDesc('created_at')->paginate(15));
    }

    public function blogStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'content' => 'required|string',
            'content_ar' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'category' => 'nullable|string',
            'is_published' => 'boolean',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
        ]);
        $validated['slug'] = Str::slug($validated['title']);
        $validated['author_id'] = auth()->id();
        return response()->json(CarBlogPost::create($validated), 201);
    }

    public function blogUpdate(Request $request, int $id): JsonResponse
    {
        $post = CarBlogPost::findOrFail($id);
        $post->update($request->all());
        return response()->json($post);
    }

    public function blogDestroy(int $id): JsonResponse
    {
        CarBlogPost::findOrFail($id)->delete();
        return response()->json(['message' => 'Post deleted']);
    }

    // FAQs
    public function faqsList(): JsonResponse
    {
        return response()->json(CarFaq::orderBy('sort_order')->get());
    }

    public function faqStore(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'question_ar' => 'nullable|string',
            'answer' => 'required|string',
            'answer_ar' => 'nullable|string',
        ]);
        return response()->json(CarFaq::create($validated), 201);
    }

    public function faqUpdate(Request $request, int $id): JsonResponse
    {
        $faq = CarFaq::findOrFail($id);
        $faq->update($request->all());
        return response()->json($faq);
    }

    public function faqDestroy(int $id): JsonResponse
    {
        CarFaq::findOrFail($id)->delete();
        return response()->json(['message' => 'FAQ deleted']);
    }

    // Settings
    public function settingsList(): JsonResponse
    {
        $settings = ShowroomSetting::all()->groupBy('group');
        return response()->json($settings);
    }

    public function settingsUpdate(Request $request): JsonResponse
    {
        $settings = $request->validate([
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value' => 'nullable|string',
        ]);

        foreach ($settings['settings'] as $setting) {
            ShowroomSetting::set($setting['key'], $setting['value']);
        }

        return response()->json(['message' => 'Settings updated']);
    }

    // Contact Messages
    public function messagesList(Request $request): JsonResponse
    {
        $query = CarContactMessage::query();
        if ($request->boolean('unread_only')) {
            $query->where('is_read', false);
        }
        return response()->json($query->orderByDesc('created_at')->paginate(15));
    }

    public function messageRead(int $id): JsonResponse
    {
        $msg = CarContactMessage::findOrFail($id);
        $msg->update(['is_read' => true]);
        return response()->json($msg);
    }

    public function messageDestroy(int $id): JsonResponse
    {
        CarContactMessage::findOrFail($id)->delete();
        return response()->json(['message' => 'Message deleted']);
    }
}
