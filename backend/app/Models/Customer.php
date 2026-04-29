<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'company', 'address', 'city',
        'state', 'country', 'postal_code', 'tax_id', 'status', 'notes',
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function salesOrders()
    {
        return $this->hasMany(SalesOrder::class);
    }

    public function quotations()
    {
        return $this->hasMany(Quotation::class);
    }

    public function deals()
    {
        return $this->hasMany(Deal::class);
    }

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
