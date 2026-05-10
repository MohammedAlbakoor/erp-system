<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarBlogPost;
use App\Models\CarBranch;
use App\Models\CarBrand;
use App\Models\CarCategory;
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
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CarShowroomSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedBrands();
        $this->seedCategories();
        $this->seedCars();
        $this->seedSliders();
        $this->seedServices();
        $this->seedTestimonials();
        $this->seedFaqs();
        $this->seedSettings();
        $this->seedBranches();
        $this->seedBlogPosts();
        $this->seedCustomersAndInquiries();
    }

    private function seedBrands(): void
    {
        $brands = [
            ['name' => 'Toyota', 'name_ar' => 'تويوتا', 'models' => ['Camry', 'Corolla', 'Land Cruiser', 'RAV4', 'Hilux', 'Yaris', 'Avalon', 'Supra']],
            ['name' => 'Hyundai', 'name_ar' => 'هيونداي', 'models' => ['Elantra', 'Tucson', 'Sonata', 'Santa Fe', 'Accent', 'Creta', 'Palisade']],
            ['name' => 'Kia', 'name_ar' => 'كيا', 'models' => ['Sportage', 'Cerato', 'Sorento', 'Seltos', 'K5', 'Carnival', 'Telluride']],
            ['name' => 'BMW', 'name_ar' => 'بي ام دبليو', 'models' => ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M4']],
            ['name' => 'Mercedes-Benz', 'name_ar' => 'مرسيدس بنز', 'models' => ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'AMG GT']],
            ['name' => 'Nissan', 'name_ar' => 'نيسان', 'models' => ['Altima', 'Patrol', 'X-Trail', 'Sentra', 'Kicks', 'Pathfinder']],
            ['name' => 'Honda', 'name_ar' => 'هوندا', 'models' => ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot']],
            ['name' => 'Lexus', 'name_ar' => 'لكزس', 'models' => ['ES', 'IS', 'RX', 'LX', 'NX', 'GX']],
            ['name' => 'Audi', 'name_ar' => 'أودي', 'models' => ['A4', 'A6', 'A8', 'Q5', 'Q7', 'Q8', 'RS6']],
            ['name' => 'Ford', 'name_ar' => 'فورد', 'models' => ['Mustang', 'Explorer', 'F-150', 'Edge', 'Bronco']],
            ['name' => 'Chevrolet', 'name_ar' => 'شيفروليه', 'models' => ['Camaro', 'Tahoe', 'Silverado', 'Malibu', 'Traverse']],
            ['name' => 'Porsche', 'name_ar' => 'بورشه', 'models' => ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan']],
        ];

        foreach ($brands as $i => $brandData) {
            $brand = CarBrand::create([
                'name' => $brandData['name'],
                'name_ar' => $brandData['name_ar'],
                'slug' => Str::slug($brandData['name']),
                'status' => true,
                'sort_order' => $i,
            ]);

            foreach ($brandData['models'] as $modelName) {
                CarModel::create([
                    'brand_id' => $brand->id,
                    'name' => $modelName,
                    'slug' => Str::slug($brandData['name'] . '-' . $modelName),
                    'status' => true,
                ]);
            }
        }
    }

    private function seedCategories(): void
    {
        $categories = [
            ['name' => 'Sedan', 'name_ar' => 'سيدان', 'icon' => 'sedan'],
            ['name' => 'SUV', 'name_ar' => 'دفع رباعي', 'icon' => 'suv'],
            ['name' => 'Pickup', 'name_ar' => 'بيك أب', 'icon' => 'pickup'],
            ['name' => 'Hatchback', 'name_ar' => 'هاتشباك', 'icon' => 'hatchback'],
            ['name' => 'Coupe', 'name_ar' => 'كوبيه', 'icon' => 'coupe'],
            ['name' => 'Van', 'name_ar' => 'فان', 'icon' => 'van'],
            ['name' => 'Luxury', 'name_ar' => 'فاخرة', 'icon' => 'luxury'],
            ['name' => 'Sports', 'name_ar' => 'رياضية', 'icon' => 'sports'],
        ];

        foreach ($categories as $i => $cat) {
            CarCategory::create([
                'name' => $cat['name'],
                'name_ar' => $cat['name_ar'],
                'slug' => Str::slug($cat['name']),
                'icon' => $cat['icon'],
                'sort_order' => $i,
            ]);
        }
    }

    private function seedCars(): void
    {
        $colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Pearl White', 'Dark Blue', 'Burgundy', 'Green'];
        $interiorColors = ['Black', 'Beige', 'Brown', 'Tan', 'Gray', 'Red'];
        $fuelTypes = ['gasoline', 'diesel', 'electric', 'hybrid'];
        $transmissions = ['automatic', 'manual'];
        $driveTypes = ['FWD', 'RWD', 'AWD', '4WD'];
        $countries = ['Japan', 'South Korea', 'Germany', 'USA', 'UK'];

        $featuresList = [
            'sunroof', 'rear_camera', 'parking_sensors', 'touchscreen', 'bluetooth',
            'navigation', 'apple_carplay', 'android_auto', 'leather_seats', 'cruise_control',
            'keyless_entry', 'remote_start', 'led_lights', 'alloy_wheels', 'abs', 'airbags',
            'blind_spot_monitor', 'lane_assist', 'heated_seats', 'cooled_seats',
            'electric_seats', 'electric_mirrors', 'electric_windows', 'rear_ac',
        ];

        $brands = CarBrand::with('models')->get();

        $carData = [];
        $carId = 1;

        foreach ($brands as $brand) {
            foreach ($brand->models->take(3) as $model) {
                $year = rand(2019, 2025);
                $price = rand(15, 120) * 1000;
                $isOffer = rand(0, 4) === 0;
                $oldPrice = $isOffer ? $price + rand(2, 15) * 1000 : null;
                $condition = rand(0, 3) === 0 ? 'new' : 'used';
                $mileage = $condition === 'new' ? 0 : rand(5000, 150000);
                $statuses = ['available', 'available', 'available', 'reserved', 'sold'];
                $status = $statuses[array_rand($statuses)];
                $selectedFeatures = array_slice($featuresList, 0, rand(8, count($featuresList)));
                shuffle($selectedFeatures);

                $categoryMap = [
                    'Camry' => 1, 'Corolla' => 1, 'Elantra' => 1, 'Sonata' => 1, 'Civic' => 1, 'Accord' => 1,
                    'Land Cruiser' => 2, 'RAV4' => 2, 'Tucson' => 2, 'Santa Fe' => 2, 'Sportage' => 2, 'X-Trail' => 2, 'CR-V' => 2,
                    'Hilux' => 3, 'F-150' => 3, 'Silverado' => 3,
                    'Yaris' => 4,
                    'Supra' => 5, 'Camaro' => 5, 'M4' => 5, 'Mustang' => 5,
                    'Carnival' => 6,
                    'S-Class' => 7, '7 Series' => 7, 'A8' => 7, 'LX' => 7, 'Panamera' => 7,
                    '911' => 8, 'AMG GT' => 8, 'RS6' => 8, 'Taycan' => 8,
                ];
                $categoryId = $categoryMap[$model->name] ?? rand(1, 2);

                $car = Car::create([
                    'brand_id' => $brand->id,
                    'model_id' => $model->id,
                    'category_id' => $categoryId,
                    'title' => $brand->name . ' ' . $model->name . ' ' . $year,
                    'title_ar' => $brand->name_ar . ' ' . $model->name . ' ' . $year,
                    'slug' => Str::slug($brand->name . '-' . $model->name . '-' . $year . '-' . $carId),
                    'year' => $year,
                    'price' => $price,
                    'old_price' => $oldPrice,
                    'currency' => 'USD',
                    'status' => $status,
                    'condition' => $condition,
                    'mileage' => $mileage,
                    'fuel_type' => $fuelTypes[array_rand($fuelTypes)],
                    'transmission' => $transmissions[array_rand($transmissions)],
                    'engine_size' => rand(12, 60) / 10 . 'L',
                    'cylinders' => [4, 4, 6, 6, 8][array_rand([4, 4, 6, 6, 8])],
                    'horsepower' => rand(120, 500) . ' HP',
                    'torque' => rand(150, 600) . ' Nm',
                    'drive_type' => $driveTypes[array_rand($driveTypes)],
                    'fuel_consumption' => rand(5, 18) . ' L/100km',
                    'exterior_color' => $colors[array_rand($colors)],
                    'interior_color' => $interiorColors[array_rand($interiorColors)],
                    'doors' => [2, 4, 4, 4, 5][array_rand([2, 4, 4, 4, 5])],
                    'seats' => [2, 5, 5, 5, 7][array_rand([2, 5, 5, 5, 7])],
                    'origin_country' => $countries[array_rand($countries)],
                    'internal_number' => 'CAR-' . str_pad($carId, 4, '0', STR_PAD_LEFT),
                    'description' => "This {$brand->name} {$model->name} {$year} is in excellent condition. Fully inspected and certified by our expert team. Comes with comprehensive warranty and after-sale service.",
                    'description_ar' => "هذه {$brand->name_ar} {$model->name} {$year} في حالة ممتازة. تم فحصها بالكامل واعتمادها من قبل فريق الخبراء لدينا. تأتي مع ضمان شامل وخدمة ما بعد البيع.",
                    'features' => array_slice($selectedFeatures, 0, rand(8, 16)),
                    'is_featured' => rand(0, 3) === 0,
                    'is_offer' => $isOffer,
                    'is_published' => true,
                    'show_on_homepage' => rand(0, 2) === 0,
                    'views_count' => rand(10, 5000),
                    'inquiries_count' => rand(0, 50),
                    'sort_order' => $carId,
                ]);

                // Create images for car
                for ($img = 1; $img <= rand(3, 6); $img++) {
                    CarImage::create([
                        'car_id' => $car->id,
                        'image' => '/images/cars/placeholder-' . rand(1, 10) . '.jpg',
                        'alt_text' => $car->title,
                        'is_main' => $img === 1,
                        'sort_order' => $img,
                    ]);
                }

                $carId++;
            }
        }
    }

    private function seedSliders(): void
    {
        $sliders = [
            [
                'title' => 'Premium Cars, Exceptional Experience',
                'title_ar' => 'سيارات فاخرة، تجربة استثنائية',
                'description' => 'Discover our handpicked collection of premium vehicles',
                'description_ar' => 'اكتشف مجموعتنا المختارة بعناية من السيارات الفاخرة',
                'button_text' => 'Browse Cars',
                'button_url' => '/cars',
            ],
            [
                'title' => 'Special Offers This Month',
                'title_ar' => 'عروض خاصة هذا الشهر',
                'description' => 'Get up to 20% off on selected vehicles',
                'description_ar' => 'احصل على خصم يصل إلى 20% على سيارات مختارة',
                'button_text' => 'View Offers',
                'button_url' => '/cars?offers=true',
            ],
            [
                'title' => 'Financing Made Easy',
                'title_ar' => 'تمويل سهل وميسر',
                'description' => 'Flexible financing options to suit your budget',
                'description_ar' => 'خيارات تمويل مرنة تناسب ميزانيتك',
                'button_text' => 'Learn More',
                'button_url' => '/financing',
            ],
        ];

        foreach ($sliders as $i => $slider) {
            CarSlider::create(array_merge($slider, [
                'image' => '/images/sliders/slider-' . ($i + 1) . '.jpg',
                'is_active' => true,
                'sort_order' => $i,
            ]));
        }
    }

    private function seedServices(): void
    {
        $services = [
            ['title' => 'Car Sales', 'title_ar' => 'بيع السيارات', 'icon' => 'car', 'description' => 'Wide selection of new and used vehicles with competitive pricing.', 'description_ar' => 'تشكيلة واسعة من السيارات الجديدة والمستعملة بأسعار منافسة.'],
            ['title' => 'Car Purchase', 'title_ar' => 'شراء السيارات', 'icon' => 'handshake', 'description' => 'We buy your car at the best market price with instant evaluation.', 'description_ar' => 'نشتري سيارتك بأفضل سعر في السوق مع تقييم فوري.'],
            ['title' => 'Car Trade-In', 'title_ar' => 'تبديل السيارات', 'icon' => 'exchange', 'description' => 'Trade your current car for a newer model with easy process.', 'description_ar' => 'بدّل سيارتك الحالية بموديل أحدث بإجراءات سهلة.'],
            ['title' => 'Financing & Installments', 'title_ar' => 'التمويل والتقسيط', 'icon' => 'calculator', 'description' => 'Flexible financing plans with competitive interest rates.', 'description_ar' => 'خطط تمويل مرنة بأسعار فائدة تنافسية.'],
            ['title' => 'Car Inspection', 'title_ar' => 'فحص السيارات', 'icon' => 'search', 'description' => 'Comprehensive 200+ point inspection for every vehicle.', 'description_ar' => 'فحص شامل من 200+ نقطة لكل سيارة.'],
            ['title' => 'Car Shipping', 'title_ar' => 'شحن السيارات', 'icon' => 'truck', 'description' => 'Safe and reliable car shipping to any destination.', 'description_ar' => 'شحن آمن وموثوق للسيارات إلى أي وجهة.'],
            ['title' => 'Vehicle Registration', 'title_ar' => 'تسجيل المركبات', 'icon' => 'file-text', 'description' => 'Complete registration and ownership transfer services.', 'description_ar' => 'خدمات تسجيل ونقل ملكية كاملة.'],
            ['title' => 'Insurance', 'title_ar' => 'التأمين', 'icon' => 'shield', 'description' => 'Comprehensive insurance options for your vehicle.', 'description_ar' => 'خيارات تأمين شاملة لسيارتك.'],
            ['title' => 'Car Import', 'title_ar' => 'استيراد السيارات', 'icon' => 'globe', 'description' => 'Import your dream car from anywhere in the world.', 'description_ar' => 'استورد سيارة أحلامك من أي مكان في العالم.'],
            ['title' => 'Car Evaluation', 'title_ar' => 'تقييم السيارات', 'icon' => 'clipboard', 'description' => 'Professional car evaluation service with market analysis.', 'description_ar' => 'خدمة تقييم احترافية للسيارات مع تحليل السوق.'],
        ];

        foreach ($services as $i => $service) {
            CarService::create(array_merge($service, [
                'is_active' => true,
                'sort_order' => $i,
            ]));
        }
    }

    private function seedTestimonials(): void
    {
        $testimonials = [
            ['customer_name' => 'Ahmed Al-Hassan', 'customer_name_ar' => 'أحمد الحسن', 'rating' => 5, 'content' => 'Excellent service and great selection of cars. I found my dream car at a very competitive price. The team was very professional and helpful throughout the process.', 'content_ar' => 'خدمة ممتازة وتشكيلة رائعة من السيارات. وجدت سيارة أحلامي بسعر تنافسي جدًا. كان الفريق محترفًا ومتعاونًا طوال العملية.'],
            ['customer_name' => 'Mohammed Al-Rashid', 'customer_name_ar' => 'محمد الراشد', 'rating' => 5, 'content' => 'I bought my Toyota Land Cruiser from this showroom and I am very satisfied. The car was in perfect condition and the price was fair.', 'content_ar' => 'اشتريت تويوتا لاند كروزر من هذا المعرض وأنا راضٍ جدًا. السيارة كانت بحالة ممتازة والسعر كان عادلاً.'],
            ['customer_name' => 'Sara Al-Mahmoud', 'customer_name_ar' => 'سارة المحمود', 'rating' => 4, 'content' => 'The financing options were very flexible and the process was smooth. I would definitely recommend this showroom to anyone looking for a car.', 'content_ar' => 'خيارات التمويل كانت مرنة جدًا والعملية كانت سلسة. أوصي بشدة بهذا المعرض لأي شخص يبحث عن سيارة.'],
            ['customer_name' => 'Khalid Al-Omar', 'customer_name_ar' => 'خالد العمر', 'rating' => 5, 'content' => 'Best car showroom in the city! They have a wide variety of cars and the customer service is top-notch. Very transparent with pricing.', 'content_ar' => 'أفضل معرض سيارات في المدينة! لديهم تشكيلة واسعة والخدمة ممتازة. شفافية عالية في الأسعار.'],
            ['customer_name' => 'Fatima Al-Zahra', 'customer_name_ar' => 'فاطمة الزهراء', 'rating' => 5, 'content' => 'I traded my old car for a new one and the process was incredibly easy. The valuation was fair and the new car is amazing!', 'content_ar' => 'بدّلت سيارتي القديمة بسيارة جديدة وكانت العملية سهلة للغاية. التقييم كان عادلاً والسيارة الجديدة رائعة!'],
            ['customer_name' => 'Omar Al-Sayed', 'customer_name_ar' => 'عمر السيد', 'rating' => 4, 'content' => 'Professional inspection report was provided before purchase. Gives you confidence in the quality of the car.', 'content_ar' => 'تم تقديم تقرير فحص احترافي قبل الشراء. يعطيك ثقة في جودة السيارة.'],
        ];

        foreach ($testimonials as $i => $t) {
            CarTestimonial::create(array_merge($t, [
                'is_published' => true,
                'sort_order' => $i,
            ]));
        }
    }

    private function seedFaqs(): void
    {
        $faqs = [
            ['question' => 'Are the cars inspected?', 'question_ar' => 'هل السيارات مفحوصة؟', 'answer' => 'Yes, every car goes through a comprehensive 200+ point inspection by our certified technicians before being listed for sale.', 'answer_ar' => 'نعم، كل سيارة تخضع لفحص شامل من 200+ نقطة من قبل فنيين معتمدين قبل عرضها للبيع.'],
            ['question' => 'Do you offer financing?', 'question_ar' => 'هل يوجد تقسيط؟', 'answer' => 'Yes, we offer flexible financing options with competitive interest rates. Contact us for more details about our financing plans.', 'answer_ar' => 'نعم، نقدم خيارات تمويل مرنة بأسعار فائدة تنافسية. تواصل معنا لمزيد من التفاصيل حول خطط التمويل.'],
            ['question' => 'Can I test drive a car?', 'question_ar' => 'هل يمكن تجربة السيارة؟', 'answer' => 'Absolutely! We encourage test drives. Simply contact us via WhatsApp to schedule your test drive appointment.', 'answer_ar' => 'بالتأكيد! نشجع على تجربة القيادة. تواصل معنا عبر واتساب لحجز موعد تجربة القيادة.'],
            ['question' => 'Can I reserve a car?', 'question_ar' => 'هل يمكن حجز السيارة؟', 'answer' => 'Yes, you can reserve any available car by contacting us through WhatsApp. A small deposit may be required to hold the reservation.', 'answer_ar' => 'نعم، يمكنك حجز أي سيارة متاحة عن طريق التواصل معنا عبر واتساب. قد يُطلب عربون بسيط لتثبيت الحجز.'],
            ['question' => 'Is there a warranty?', 'question_ar' => 'هل يوجد ضمان؟', 'answer' => 'New cars come with manufacturer warranty. Used cars may include extended warranty options depending on the vehicle condition and age.', 'answer_ar' => 'السيارات الجديدة تأتي مع ضمان الشركة المصنعة. السيارات المستعملة قد تتضمن خيارات ضمان ممتد حسب حالة وعمر السيارة.'],
            ['question' => 'Can you ship the car to another city?', 'question_ar' => 'هل يمكن شحن السيارة لمدينة أخرى؟', 'answer' => 'Yes, we provide car shipping services to any city. Contact us for a shipping quote based on your location.', 'answer_ar' => 'نعم، نوفر خدمات شحن السيارات لأي مدينة. تواصل معنا للحصول على عرض سعر الشحن حسب موقعك.'],
            ['question' => 'Do you buy used cars?', 'question_ar' => 'هل تشترون السيارات المستعملة؟', 'answer' => 'Yes, we buy used cars at competitive market prices. Bring your car for a free evaluation and get an instant offer.', 'answer_ar' => 'نعم، نشتري السيارات المستعملة بأسعار سوقية تنافسية. أحضر سيارتك لتقييم مجاني واحصل على عرض فوري.'],
        ];

        foreach ($faqs as $i => $faq) {
            CarFaq::create(array_merge($faq, [
                'is_active' => true,
                'sort_order' => $i,
            ]));
        }
    }

    private function seedSettings(): void
    {
        $settings = [
            ['key' => 'showroom_name', 'value' => 'AutoElite Motors', 'group' => 'general'],
            ['key' => 'showroom_name_ar', 'value' => 'أوتو إيليت موتورز', 'group' => 'general'],
            ['key' => 'showroom_description', 'value' => 'Premium Car Showroom - Your destination for quality vehicles', 'group' => 'general'],
            ['key' => 'showroom_description_ar', 'value' => 'معرض سيارات فاخر - وجهتك للسيارات المتميزة', 'group' => 'general'],
            ['key' => 'phone', 'value' => '+966501234567', 'group' => 'contact'],
            ['key' => 'whatsapp', 'value' => '+966501234567', 'group' => 'contact'],
            ['key' => 'email', 'value' => 'info@autoelite.com', 'group' => 'contact'],
            ['key' => 'address', 'value' => 'King Fahd Road, Riyadh, Saudi Arabia', 'group' => 'contact'],
            ['key' => 'address_ar', 'value' => 'طريق الملك فهد، الرياض، المملكة العربية السعودية', 'group' => 'contact'],
            ['key' => 'working_hours', 'value' => 'Sat-Thu: 9:00 AM - 10:00 PM | Fri: 4:00 PM - 10:00 PM', 'group' => 'contact'],
            ['key' => 'working_hours_ar', 'value' => 'السبت-الخميس: 9:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م', 'group' => 'contact'],
            ['key' => 'google_maps_url', 'value' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sar!2ssa!4v1', 'group' => 'contact'],
            ['key' => 'facebook', 'value' => 'https://facebook.com/autoelite', 'group' => 'social'],
            ['key' => 'twitter', 'value' => 'https://twitter.com/autoelite', 'group' => 'social'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/autoelite', 'group' => 'social'],
            ['key' => 'youtube', 'value' => 'https://youtube.com/autoelite', 'group' => 'social'],
            ['key' => 'tiktok', 'value' => 'https://tiktok.com/@autoelite', 'group' => 'social'],
            ['key' => 'snapchat', 'value' => 'https://snapchat.com/add/autoelite', 'group' => 'social'],
            ['key' => 'default_currency', 'value' => 'USD', 'group' => 'general'],
            ['key' => 'years_of_experience', 'value' => '15', 'group' => 'general'],
            ['key' => 'about_text', 'value' => 'AutoElite Motors is a premier car showroom with over 15 years of experience in the automotive industry. We specialize in offering a wide range of new and pre-owned vehicles, carefully selected and thoroughly inspected to ensure the highest quality for our customers.', 'group' => 'about'],
            ['key' => 'about_text_ar', 'value' => 'أوتو إيليت موتورز معرض سيارات متميز بخبرة تزيد عن 15 عامًا في صناعة السيارات. نتخصص في تقديم مجموعة واسعة من السيارات الجديدة والمستعملة، المختارة بعناية والمفحوصة بدقة لضمان أعلى جودة لعملائنا.', 'group' => 'about'],
            ['key' => 'vision', 'value' => 'To be the most trusted car showroom in the region, setting the standard for quality and customer satisfaction.', 'group' => 'about'],
            ['key' => 'vision_ar', 'value' => 'أن نكون معرض السيارات الأكثر ثقة في المنطقة، ونضع معيارًا للجودة ورضا العملاء.', 'group' => 'about'],
            ['key' => 'mission', 'value' => 'Providing premium vehicles with transparent pricing, exceptional service, and a seamless buying experience for every customer.', 'group' => 'about'],
            ['key' => 'mission_ar', 'value' => 'تقديم سيارات متميزة بأسعار شفافة وخدمة استثنائية وتجربة شراء سلسة لكل عميل.', 'group' => 'about'],
            ['key' => 'meta_title', 'value' => 'AutoElite Motors - Premium Car Showroom', 'group' => 'seo'],
            ['key' => 'meta_description', 'value' => 'Discover premium new and used cars at AutoElite Motors. Wide selection, competitive prices, flexible financing, and exceptional service.', 'group' => 'seo'],
            ['key' => 'financing_terms', 'value' => 'Financing available for up to 60 months with competitive interest rates starting from 3.5%. Down payment as low as 20%. Subject to credit approval.', 'group' => 'financing'],
            ['key' => 'financing_terms_ar', 'value' => 'تمويل متاح لمدة تصل إلى 60 شهرًا بأسعار فائدة تنافسية تبدأ من 3.5%. دفعة أولى تبدأ من 20%. يخضع لموافقة الائتمان.', 'group' => 'financing'],
            ['key' => 'financing_documents', 'value' => 'National ID, Salary certificate, Bank statement (last 3 months), Employment letter', 'group' => 'financing'],
            ['key' => 'financing_documents_ar', 'value' => 'الهوية الوطنية، شهادة الراتب، كشف حساب بنكي (آخر 3 أشهر)، خطاب تعريف من جهة العمل', 'group' => 'financing'],
        ];

        foreach ($settings as $s) {
            ShowroomSetting::create(array_merge($s, ['type' => 'text']));
        }
    }

    private function seedBranches(): void
    {
        CarBranch::create([
            'name' => 'Main Branch - Riyadh',
            'name_ar' => 'الفرع الرئيسي - الرياض',
            'address' => 'King Fahd Road, Al Olaya District, Riyadh',
            'phone' => '+966501234567',
            'whatsapp' => '+966501234567',
            'email' => 'riyadh@autoelite.com',
            'working_hours' => 'Sat-Thu: 9AM-10PM, Fri: 4PM-10PM',
            'is_main' => true,
            'is_active' => true,
        ]);

        CarBranch::create([
            'name' => 'Jeddah Branch',
            'name_ar' => 'فرع جدة',
            'address' => 'Tahlia Street, Jeddah',
            'phone' => '+966507654321',
            'whatsapp' => '+966507654321',
            'email' => 'jeddah@autoelite.com',
            'working_hours' => 'Sat-Thu: 9AM-10PM, Fri: 4PM-10PM',
            'is_main' => false,
            'is_active' => true,
        ]);
    }

    private function seedBlogPosts(): void
    {
        $posts = [
            ['title' => 'Top 10 Best Economy Cars in 2025', 'title_ar' => 'أفضل 10 سيارات اقتصادية في 2025', 'category' => 'guides', 'content' => '<p>Looking for an economical car? Here are our top picks for fuel-efficient vehicles in 2025...</p><h2>1. Toyota Corolla</h2><p>The Toyota Corolla continues to be one of the most reliable and fuel-efficient sedans on the market.</p><h2>2. Hyundai Elantra</h2><p>The redesigned Elantra offers stunning looks and excellent fuel economy.</p>'],
            ['title' => 'Tips Before Buying a Used Car', 'title_ar' => 'نصائح قبل شراء سيارة مستعملة', 'category' => 'tips', 'content' => '<p>Buying a used car can save you a lot of money, but it requires careful inspection. Here are essential tips...</p><h2>Check the Vehicle History</h2><p>Always request a vehicle history report to check for accidents and maintenance records.</p>'],
            ['title' => 'Manual vs Automatic Transmission', 'title_ar' => 'الفرق بين القير العادي والأوتوماتيك', 'category' => 'guides', 'content' => '<p>The debate between manual and automatic transmissions continues. Let us help you decide...</p>'],
            ['title' => 'How to Inspect a Car Before Purchase', 'title_ar' => 'كيف تفحص السيارة قبل الشراء', 'category' => 'tips', 'content' => '<p>A thorough inspection can save you from costly surprises down the road...</p>'],
            ['title' => 'Best SUVs for Families in 2025', 'title_ar' => 'أفضل سيارات SUV للعائلات في 2025', 'category' => 'guides', 'content' => '<p>Family SUVs offer the perfect blend of space, safety, and comfort...</p>'],
        ];

        foreach ($posts as $post) {
            CarBlogPost::create([
                'title' => $post['title'],
                'title_ar' => $post['title_ar'],
                'slug' => Str::slug($post['title']),
                'excerpt' => substr(strip_tags($post['content']), 0, 200),
                'content' => $post['content'],
                'category' => $post['category'],
                'is_published' => true,
                'views_count' => rand(50, 2000),
                'author_id' => 1,
            ]);
        }
    }

    private function seedCustomersAndInquiries(): void
    {
        $customers = [
            ['name' => 'Abdullah Mohammed', 'phone' => '+966501111111', 'city' => 'Riyadh', 'status' => 'interested'],
            ['name' => 'Nasser Al-Harbi', 'phone' => '+966502222222', 'city' => 'Jeddah', 'status' => 'purchased'],
            ['name' => 'Layla Ahmad', 'phone' => '+966503333333', 'city' => 'Dammam', 'status' => 'new'],
            ['name' => 'Sultan Al-Otaibi', 'phone' => '+966504444444', 'city' => 'Riyadh', 'status' => 'potential'],
            ['name' => 'Mariam Hassan', 'phone' => '+966505555555', 'city' => 'Mecca', 'status' => 'follow_up'],
        ];

        foreach ($customers as $c) {
            CarCustomer::create($c);
        }

        $cars = Car::take(5)->get();
        foreach ($cars as $car) {
            CarInquiry::create([
                'car_id' => $car->id,
                'customer_name' => $customers[array_rand($customers)]['name'],
                'phone' => '+9665' . rand(10000000, 99999999),
                'city' => ['Riyadh', 'Jeddah', 'Dammam'][rand(0, 2)],
                'type' => ['inquiry', 'booking', 'test_drive', 'financing'][rand(0, 3)],
                'status' => 'new',
            ]);
        }
    }
}
