<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarBrand extends Model
{
    protected $fillable = [
        'name', 'name_ar', 'logo', 'slug', 'status', 'sort_order',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function models(): HasMany
    {
        return $this->hasMany(CarModel::class, 'brand_id');
    }

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'brand_id');
    }
}
