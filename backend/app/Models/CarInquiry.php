<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarInquiry extends Model
{
    protected $table = 'car_inquiries';

    protected $fillable = [
        'car_id', 'customer_name', 'phone', 'email', 'city',
        'type', 'message', 'status', 'assigned_to', 'notes',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
