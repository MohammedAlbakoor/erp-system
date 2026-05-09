<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Car extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'brand_id', 'model_id', 'category_id', 'title', 'title_ar', 'slug',
        'year', 'price', 'old_price', 'currency', 'status', 'condition',
        'mileage', 'fuel_type', 'transmission', 'engine_size', 'cylinders',
        'horsepower', 'torque', 'drive_type', 'fuel_consumption',
        'exterior_color', 'interior_color', 'doors', 'seats',
        'origin_country', 'chassis_number', 'plate_number', 'internal_number',
        'description', 'description_ar', 'features',
        'is_featured', 'is_offer', 'is_published', 'show_on_homepage', 'hide_price',
        'meta_title', 'meta_description', 'meta_keywords',
        'views_count', 'inquiries_count', 'publish_at', 'sort_order',
        'video_url', 'youtube_url',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_offer' => 'boolean',
        'is_published' => 'boolean',
        'show_on_homepage' => 'boolean',
        'hide_price' => 'boolean',
        'features' => 'array',
        'publish_at' => 'datetime',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(CarBrand::class, 'brand_id');
    }

    public function carModel(): BelongsTo
    {
        return $this->belongsTo(CarModel::class, 'model_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(CarCategory::class, 'category_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(CarImage::class, 'car_id')->orderBy('sort_order');
    }

    public function mainImage()
    {
        return $this->hasOne(CarImage::class, 'car_id')->where('is_main', true);
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(CarInquiry::class, 'car_id');
    }

    public function sales(): HasMany
    {
        return $this->hasMany(CarSale::class, 'car_id');
    }

    public function getDiscountPercentageAttribute(): ?int
    {
        if ($this->old_price && $this->old_price > $this->price) {
            return (int) round((($this->old_price - $this->price) / $this->old_price) * 100);
        }
        return null;
    }

    public function getMainImageUrlAttribute(): ?string
    {
        $main = $this->images()->where('is_main', true)->first();
        return $main?->image;
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true)
            ->where(function ($q) {
                $q->whereNull('publish_at')
                    ->orWhere('publish_at', '<=', now());
            });
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOffers($query)
    {
        return $query->where('is_offer', true);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }
}
