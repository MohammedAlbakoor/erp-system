<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarCustomer extends Model
{
    protected $fillable = [
        'name', 'phone', 'whatsapp', 'email', 'city',
        'status', 'notes', 'last_contact',
    ];

    protected $casts = [
        'last_contact' => 'datetime',
    ];

    public function sales(): HasMany
    {
        return $this->hasMany(CarSale::class, 'customer_id');
    }
}
