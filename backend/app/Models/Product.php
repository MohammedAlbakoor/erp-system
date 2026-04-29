<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'sku', 'description', 'category_id', 'cost_price',
        'selling_price', 'unit', 'reorder_level', 'barcode', 'image', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'cost_price' => 'decimal:2',
            'selling_price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function stockLevels()
    {
        return $this->hasMany(StockLevel::class);
    }

    public function warehouses()
    {
        return $this->belongsToMany(Warehouse::class, 'stock_levels')->withPivot('quantity', 'reserved_quantity');
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function batches()
    {
        return $this->hasMany(Batch::class);
    }

    public function purchaseOrderItems()
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    public function getTotalStockAttribute(): int
    {
        return $this->stockLevels->sum('quantity');
    }

    public function isLowStock(): bool
    {
        return $this->total_stock <= $this->reorder_level;
    }
}
