<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarModel extends Model
{
    protected $table = 'car_models';

    protected $fillable = [
        'brand_id', 'name', 'name_ar', 'slug', 'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(CarBrand::class, 'brand_id');
    }

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'model_id');
    }
}
