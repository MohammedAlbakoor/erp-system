<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarSale extends Model
{
    protected $fillable = [
        'car_id', 'customer_id', 'final_price', 'payment_method',
        'sale_date', 'user_id', 'notes', 'attachments',
    ];

    protected $casts = [
        'final_price' => 'decimal:2',
        'sale_date' => 'date',
        'attachments' => 'array',
    ];

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(CarCustomer::class, 'customer_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
