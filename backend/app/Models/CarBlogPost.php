<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarBlogPost extends Model
{
    protected $fillable = [
        'title', 'title_ar', 'slug', 'excerpt', 'excerpt_ar',
        'content', 'content_ar', 'image', 'category',
        'meta_title', 'meta_description', 'meta_keywords',
        'is_published', 'author_id', 'views_count',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
