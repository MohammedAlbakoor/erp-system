<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarSlider extends Model
{
    protected $fillable = [
        'title', 'title_ar', 'description', 'description_ar',
        'image', 'button_text', 'button_url', 'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
