<?php

namespace App\Services;

use App\Models\Product;
use App\Models\StockLevel;
use App\Models\StockMovement;
use App\Notifications\LowStockNotification;
use App\Repositories\ProductRepository;

class InventoryService
{
    public function __construct(
        private ProductRepository $productRepository,
    ) {}

    public function adjustStock(int $productId, int $warehouseId, string $type, int $quantity, ?string $reference = null, ?string $notes = null): StockMovement
    {
        $stockLevel = StockLevel::firstOrCreate(
            ['product_id' => $productId, 'warehouse_id' => $warehouseId],
            ['quantity' => 0, 'reserved_quantity' => 0]
        );

        if ($type === 'in') {
            $stockLevel->increment('quantity', $quantity);
        } elseif ($type === 'out') {
            if ($stockLevel->quantity < $quantity) {
                throw new \Exception('Insufficient stock');
            }
            $stockLevel->decrement('quantity', $quantity);
        } elseif ($type === 'adjustment') {
            $stockLevel->quantity = $quantity;
            $stockLevel->save();
        }

        $movement = StockMovement::create([
            'product_id' => $productId,
            'warehouse_id' => $warehouseId,
            'type' => $type,
            'quantity' => $quantity,
            'reference' => $reference,
            'notes' => $notes,
            'created_by' => auth()->id(),
        ]);

        $this->checkLowStock($productId);

        return $movement;
    }

    public function transferStock(int $productId, int $fromWarehouseId, int $toWarehouseId, int $quantity): void
    {
        $this->adjustStock($productId, $fromWarehouseId, 'out', $quantity, 'Transfer');
        $this->adjustStock($productId, $toWarehouseId, 'in', $quantity, 'Transfer');
    }

    private function checkLowStock(int $productId): void
    {
        $product = Product::with('stockLevels')->find($productId);

        if ($product && $product->isLowStock()) {
            $admins = \App\Models\User::whereHas('role', fn ($q) => $q->where('slug', 'admin'))->get();
            foreach ($admins as $admin) {
                $admin->notify(new LowStockNotification($product));
            }
        }
    }

    public function getStockReport(): array
    {
        $products = Product::with(['stockLevels.warehouse', 'category'])->get();

        return [
            'total_products' => $products->count(),
            'low_stock_count' => $products->filter(fn ($p) => $p->isLowStock())->count(),
            'total_value' => $products->sum(fn ($p) => $p->total_stock * (float) $p->cost_price),
            'products' => $products,
        ];
    }
}
