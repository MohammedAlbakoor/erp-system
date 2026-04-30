<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'company', 'source', 'status',
        'estimated_value', 'assigned_to', 'notes',
    ];

    protected function casts(): array
    {
        return ['estimated_value' => 'decimal:2'];
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }
}
