<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable = ['name', 'code', 'address', 'city', 'country', 'manager_name', 'phone', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function stockLevels()
    {
        return $this->hasMany(StockLevel::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'stock_levels')->withPivot('quantity', 'reserved_quantity');
    }
}
