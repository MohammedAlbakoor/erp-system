<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarTestimonial extends Model
{
    protected $fillable = [
        'customer_name', 'customer_name_ar', 'customer_image',
        'rating', 'content', 'content_ar', 'is_published', 'sort_order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
