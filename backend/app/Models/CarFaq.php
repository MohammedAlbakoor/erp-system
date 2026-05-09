<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarFaq extends Model
{
    protected $fillable = [
        'question', 'question_ar', 'answer', 'answer_ar',
        'is_active', 'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
