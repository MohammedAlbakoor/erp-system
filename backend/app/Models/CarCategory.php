<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarCategory extends Model
{
    protected $fillable = [
        'name', 'name_ar', 'slug', 'icon', 'status', 'sort_order',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function cars(): HasMany
    {
        return $this->hasMany(Car::class, 'category_id');
    }
}
