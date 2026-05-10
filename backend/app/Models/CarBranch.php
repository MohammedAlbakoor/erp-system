<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarBranch extends Model
{
    protected $table = 'car_branches';

    protected $fillable = [
        'name', 'name_ar', 'address', 'phone', 'whatsapp',
        'email', 'map_url', 'working_hours', 'is_main', 'is_active',
    ];

    protected $casts = [
        'is_main' => 'boolean',
        'is_active' => 'boolean',
    ];
}
