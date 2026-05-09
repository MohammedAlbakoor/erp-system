<?php

namespace App\Http\Controllers\Api\Showroom;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\CarBlogPost;
use App\Models\CarBrand;
use App\Models\CarCategory;
use App\Models\CarContactMessage;
use App\Models\CarFaq;
use App\Models\CarInquiry;
use App\Models\CarService;
use App\Models\CarSlider;
use App\Models\CarTestimonial;
use App\Models\ShowroomSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicCarController extends Controller
{
    public function homepage(): JsonResponse
    {
        $featuredCars = Car::published()->featured()->available()
            ->with(['brand', 'carModel', 'images'])
            ->orderBy('sort_order')
            ->take(8)
            ->get();

        $latestCars = Car::published()
            ->with(['brand', 'carModel', 'images'])
            ->orderByDesc('created_at')
            ->take(8)
            ->get();

        $offerCars = Car::published()->offers()->available()
            ->with(['brand', 'carModel', 'images'])
            ->take(6)
            ->get();

        $sliders = CarSlider::where('is_active', true)->orderBy('sort_order')->get();
        $services = CarService::where('is_active', true)->orderBy('sort_order')->take(6)->get();
        $testimonials = CarTestimonial::where('is_published', true)->orderBy('sort_order')->get();
        $brands = CarBrand::where('status', true)->orderBy('sort_order')->get();
        $categories = CarCategory::where('status', true)->orderBy('sort_order')->get();

        $stats = [
            'total_cars' => Car::published()->count(),
            'available_cars' => Car::published()->available()->count(),
            'sold_cars' => Car::where('status', 'sold')->count(),
            'brands_count' => CarBrand::where('status', true)->count(),
        ];

        $settings = ShowroomSetting::all()->pluck('value', 'key');

        return response()->json([
            'sliders' => $sliders,
            'featured_cars' => $featuredCars,
            'latest_cars' => $latestCars,
            'offer_cars' => $offerCars,
            'services' => $services,
            'testimonials' => $testimonials,
            'brands' => $brands,
            'categories' => $categories,
            'stats' => $stats,
            'settings' => $settings,
        ]);
    }

    public function cars(Request $request): JsonResponse
    {
        $query = Car::published()->with(['brand', 'carModel', 'category', 'images']);

        // Filters
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }
        if ($request->filled('model_id')) {
            $query->where('model_id', $request->model_id);
        }
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        if ($request->filled('year_from')) {
            $query->where('year', '>=', $request->year_from);
        }
        if ($request->filled('year_to')) {
            $query->where('year', '<=', $request->year_to);
        }
        if ($request->filled('price_from')) {
            $query->where('price', '>=', $request->price_from);
        }
        if ($request->filled('price_to')) {
            $query->where('price', '<=', $request->price_to);
        }
        if ($request->filled('condition')) {
            $query->where('condition', $request->condition);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('fuel_type')) {
            $query->where('fuel_type', $request->fuel_type);
        }
        if ($request->filled('transmission')) {
            $query->where('transmission', $request->transmission);
        }
        if ($request->filled('exterior_color')) {
            $query->where('exterior_color', $request->exterior_color);
        }
        if ($request->filled('doors')) {
            $query->where('doors', $request->doors);
        }
        if ($request->filled('seats')) {
            $query->where('seats', $request->seats);
        }
        if ($request->filled('mileage_max')) {
            $query->where('mileage', '<=', $request->mileage_max);
        }
        if ($request->filled('origin_country')) {
            $query->where('origin_country', $request->origin_country);
        }
        if ($request->boolean('featured_only')) {
            $query->featured();
        }
        if ($request->boolean('offers_only')) {
            $query->offers();
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title_ar', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('brand', fn($b) => $b->where('name', 'like', "%{$search}%"));
            });
        }

        // Sorting
        $sortBy = $request->get('sort', 'latest');
        $query = match ($sortBy) {
            'price_asc' => $query->orderBy('price', 'asc'),
            'price_desc' => $query->orderBy('price', 'desc'),
            'year_desc' => $query->orderBy('year', 'desc'),
            'most_viewed' => $query->orderBy('views_count', 'desc'),
            'most_inquired' => $query->orderBy('inquiries_count', 'desc'),
            default => $query->orderBy('created_at', 'desc'),
        };

        $perPage = min($request->get('per_page', 12), 50);
        $cars = $query->paginate($perPage);

        $brands = CarBrand::where('status', true)->withCount('cars')->orderBy('sort_order')->get();
        $categories = CarCategory::where('status', true)->orderBy('sort_order')->get();

        return response()->json([
            'cars' => $cars,
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    public function carDetail(string $slug): JsonResponse
    {
        $car = Car::where('slug', $slug)
            ->published()
            ->with(['brand', 'carModel', 'category', 'images'])
            ->firstOrFail();

        $car->increment('views_count');

        $similarCars = Car::published()->available()
            ->where('id', '!=', $car->id)
            ->where(function ($q) use ($car) {
                $q->where('brand_id', $car->brand_id)
                    ->orWhere('category_id', $car->category_id)
                    ->orWhereBetween('price', [$car->price * 0.8, $car->price * 1.2]);
            })
            ->with(['brand', 'carModel', 'images'])
            ->take(4)
            ->get();

        $settings = ShowroomSetting::all()->pluck('value', 'key');

        return response()->json([
            'car' => $car,
            'similar_cars' => $similarCars,
            'settings' => $settings,
        ]);
    }

    public function inquiry(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'car_id' => 'nullable|exists:cars,id',
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'city' => 'nullable|string|max:100',
            'type' => 'required|in:inquiry,booking,test_drive,financing',
            'message' => 'nullable|string|max:1000',
        ]);

        $inquiry = CarInquiry::create($validated);

        if (!empty($validated['car_id'])) {
            Car::where('id', $validated['car_id'])->increment('inquiries_count');
        }

        return response()->json([
            'message' => 'Inquiry submitted successfully',
            'inquiry' => $inquiry,
        ], 201);
    }

    public function contactMessage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        CarContactMessage::create($validated);

        return response()->json(['message' => 'Message sent successfully'], 201);
    }

    public function brands(): JsonResponse
    {
        $brands = CarBrand::where('status', true)
            ->with(['models' => fn($q) => $q->where('status', true)])
            ->withCount('cars')
            ->orderBy('sort_order')
            ->get();

        return response()->json($brands);
    }

    public function services(): JsonResponse
    {
        $services = CarService::where('is_active', true)->orderBy('sort_order')->get();
        $settings = ShowroomSetting::all()->pluck('value', 'key');

        return response()->json(['services' => $services, 'settings' => $settings]);
    }

    public function about(): JsonResponse
    {
        $settings = ShowroomSetting::all()->pluck('value', 'key');
        $stats = [
            'total_cars' => Car::published()->count(),
            'sold_cars' => Car::where('status', 'sold')->count(),
            'customers' => \App\Models\CarCustomer::count(),
        ];

        return response()->json(['settings' => $settings, 'stats' => $stats]);
    }

    public function financing(): JsonResponse
    {
        $settings = ShowroomSetting::whereIn('group', ['financing', 'contact', 'general'])
            ->get()->pluck('value', 'key');

        return response()->json(['settings' => $settings]);
    }

    public function contact(): JsonResponse
    {
        $settings = ShowroomSetting::whereIn('group', ['contact', 'social', 'general'])
            ->get()->pluck('value', 'key');
        $branches = \App\Models\CarBranch::where('is_active', true)->get();

        return response()->json(['settings' => $settings, 'branches' => $branches]);
    }

    public function faqs(): JsonResponse
    {
        $faqs = CarFaq::where('is_active', true)->orderBy('sort_order')->get();
        return response()->json($faqs);
    }

    public function blog(Request $request): JsonResponse
    {
        $query = CarBlogPost::where('is_published', true)->with('author');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $posts = $query->orderByDesc('created_at')->paginate(10);
        return response()->json($posts);
    }

    public function blogPost(string $slug): JsonResponse
    {
        $post = CarBlogPost::where('slug', $slug)->where('is_published', true)->firstOrFail();
        $post->increment('views_count');

        $related = CarBlogPost::where('is_published', true)
            ->where('id', '!=', $post->id)
            ->where('category', $post->category)
            ->take(3)
            ->get();

        return response()->json(['post' => $post, 'related' => $related]);
    }

    public function compare(Request $request): JsonResponse
    {
        $ids = $request->get('ids', []);
        if (!is_array($ids) || count($ids) < 2 || count($ids) > 4) {
            return response()->json(['message' => 'Select 2-4 cars to compare'], 422);
        }

        $cars = Car::whereIn('id', $ids)
            ->with(['brand', 'carModel', 'category', 'images'])
            ->get();

        return response()->json($cars);
    }

    public function settings(): JsonResponse
    {
        $settings = ShowroomSetting::all()->pluck('value', 'key');
        return response()->json($settings);
    }
}
