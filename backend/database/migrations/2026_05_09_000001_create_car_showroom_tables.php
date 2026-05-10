<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Car Brands
        Schema::create('car_brands', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('logo')->nullable();
            $table->string('slug')->unique();
            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Car Models
        Schema::create('car_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('car_brands')->cascadeOnDelete();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('slug')->unique();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        // Car Categories (body types)
        Schema::create('car_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->boolean('status')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Cars
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained('car_brands')->cascadeOnDelete();
            $table->foreignId('model_id')->constrained('car_models')->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('car_categories')->nullOnDelete();
            $table->string('title');
            $table->string('title_ar')->nullable();
            $table->string('slug')->unique();
            $table->year('year');
            $table->decimal('price', 12, 2);
            $table->decimal('old_price', 12, 2)->nullable();
            $table->string('currency', 10)->default('USD');
            $table->enum('status', ['available', 'reserved', 'sold', 'archived'])->default('available');
            $table->enum('condition', ['new', 'used'])->default('used');
            $table->integer('mileage')->default(0);
            $table->string('fuel_type')->default('gasoline');
            $table->string('transmission')->default('automatic');
            $table->string('engine_size')->nullable();
            $table->integer('cylinders')->nullable();
            $table->string('horsepower')->nullable();
            $table->string('torque')->nullable();
            $table->string('drive_type')->nullable();
            $table->string('fuel_consumption')->nullable();
            $table->string('exterior_color')->nullable();
            $table->string('interior_color')->nullable();
            $table->integer('doors')->default(4);
            $table->integer('seats')->default(5);
            $table->string('origin_country')->nullable();
            $table->string('chassis_number')->nullable();
            $table->string('plate_number')->nullable();
            $table->string('internal_number')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();

            // Features (JSON)
            $table->json('features')->nullable();

            // Flags
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_offer')->default(false);
            $table->boolean('is_published')->default(true);
            $table->boolean('show_on_homepage')->default(false);
            $table->boolean('hide_price')->default(false);

            // SEO
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            // Stats
            $table->unsignedInteger('views_count')->default(0);
            $table->unsignedInteger('inquiries_count')->default(0);

            // Scheduling
            $table->timestamp('publish_at')->nullable();
            $table->integer('sort_order')->default(0);

            // Video
            $table->string('video_url')->nullable();
            $table->string('youtube_url')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['brand_id', 'model_id']);
            $table->index('status');
            $table->index('condition');
            $table->index('year');
            $table->index('price');
            $table->index('is_featured');
            $table->index('is_offer');
        });

        // Car Images
        Schema::create('car_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained('cars')->cascadeOnDelete();
            $table->string('image');
            $table->string('alt_text')->nullable();
            $table->boolean('is_main')->default(false);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Car Inquiries
        Schema::create('car_inquiries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->nullable()->constrained('cars')->nullOnDelete();
            $table->string('customer_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('city')->nullable();
            $table->enum('type', ['inquiry', 'booking', 'test_drive', 'financing'])->default('inquiry');
            $table->text('message')->nullable();
            $table->enum('status', ['new', 'contacted', 'interested', 'not_interested', 'booked', 'sold', 'cancelled'])->default('new');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Car Customers CRM
        Schema::create('car_customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->string('city')->nullable();
            $table->enum('status', ['new', 'interested', 'potential', 'purchased', 'not_interested', 'follow_up'])->default('new');
            $table->text('notes')->nullable();
            $table->timestamp('last_contact')->nullable();
            $table->timestamps();
        });

        // Car Sales
        Schema::create('car_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained('cars')->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained('car_customers')->nullOnDelete();
            $table->decimal('final_price', 12, 2);
            $table->string('payment_method')->nullable();
            $table->date('sale_date');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamps();
        });

        // Sliders / Banners
        Schema::create('car_sliders', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('title_ar')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('image');
            $table->string('button_text')->nullable();
            $table->string('button_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Testimonials
        Schema::create('car_testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('customer_name_ar')->nullable();
            $table->string('customer_image')->nullable();
            $table->tinyInteger('rating')->default(5);
            $table->text('content');
            $table->text('content_ar')->nullable();
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Services
        Schema::create('car_services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_ar')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('icon')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Blog Posts
        Schema::create('car_blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('title_ar')->nullable();
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->text('excerpt_ar')->nullable();
            $table->longText('content');
            $table->longText('content_ar')->nullable();
            $table->string('image')->nullable();
            $table->string('category')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->boolean('is_published')->default(false);
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedInteger('views_count')->default(0);
            $table->timestamps();
        });

        // FAQ
        Schema::create('car_faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->string('question_ar')->nullable();
            $table->text('answer');
            $table->text('answer_ar')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Showroom Settings
        Schema::create('showroom_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('text');
            $table->string('group')->default('general');
            $table->timestamps();
        });

        // Contact Messages
        Schema::create('car_contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        // Car Favorites (session-based)
        Schema::create('car_favorites', function (Blueprint $table) {
            $table->id();
            $table->string('session_id');
            $table->foreignId('car_id')->constrained('cars')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['session_id', 'car_id']);
        });

        // Car Comparisons (session-based)
        Schema::create('car_comparisons', function (Blueprint $table) {
            $table->id();
            $table->string('session_id');
            $table->foreignId('car_id')->constrained('cars')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['session_id', 'car_id']);
        });

        // Activity Log for admin
        Schema::create('car_activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('action');
            $table->string('model_type')->nullable();
            $table->unsignedBigInteger('model_id')->nullable();
            $table->text('description')->nullable();
            $table->json('properties')->nullable();
            $table->timestamps();
        });

        // Branches
        Schema::create('car_branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->string('map_url')->nullable();
            $table->text('working_hours')->nullable();
            $table->boolean('is_main')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Notifications
        Schema::create('car_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('type');
            $table->string('title');
            $table->text('message')->nullable();
            $table->json('data')->nullable();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('car_notifications');
        Schema::dropIfExists('car_branches');
        Schema::dropIfExists('car_activity_logs');
        Schema::dropIfExists('car_comparisons');
        Schema::dropIfExists('car_favorites');
        Schema::dropIfExists('car_contact_messages');
        Schema::dropIfExists('showroom_settings');
        Schema::dropIfExists('car_faqs');
        Schema::dropIfExists('car_blog_posts');
        Schema::dropIfExists('car_services');
        Schema::dropIfExists('car_testimonials');
        Schema::dropIfExists('car_sliders');
        Schema::dropIfExists('car_sales');
        Schema::dropIfExists('car_customers');
        Schema::dropIfExists('car_inquiries');
        Schema::dropIfExists('car_images');
        Schema::dropIfExists('cars');
        Schema::dropIfExists('car_categories');
        Schema::dropIfExists('car_models');
        Schema::dropIfExists('car_brands');
    }
};
