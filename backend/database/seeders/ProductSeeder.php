<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\StockLevel;
use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Laptop Pro 15"', 'sku' => 'ELEC-001', 'category_id' => 1, 'cost_price' => 800, 'selling_price' => 1299.99, 'unit' => 'pcs', 'reorder_level' => 10, 'description' => 'Professional laptop with 15-inch display'],
            ['name' => 'Wireless Mouse', 'sku' => 'ELEC-002', 'category_id' => 1, 'cost_price' => 15, 'selling_price' => 29.99, 'unit' => 'pcs', 'reorder_level' => 50, 'description' => 'Ergonomic wireless mouse'],
            ['name' => 'USB-C Hub', 'sku' => 'ELEC-003', 'category_id' => 1, 'cost_price' => 25, 'selling_price' => 49.99, 'unit' => 'pcs', 'reorder_level' => 30, 'description' => '7-port USB-C hub'],
            ['name' => 'Monitor 27"', 'sku' => 'ELEC-004', 'category_id' => 1, 'cost_price' => 250, 'selling_price' => 449.99, 'unit' => 'pcs', 'reorder_level' => 15, 'description' => '4K 27-inch monitor'],
            ['name' => 'Mechanical Keyboard', 'sku' => 'ELEC-005', 'category_id' => 1, 'cost_price' => 60, 'selling_price' => 99.99, 'unit' => 'pcs', 'reorder_level' => 25, 'description' => 'RGB mechanical keyboard'],
            ['name' => 'A4 Paper (500 sheets)', 'sku' => 'OFF-001', 'category_id' => 2, 'cost_price' => 3, 'selling_price' => 7.99, 'unit' => 'ream', 'reorder_level' => 100, 'description' => 'Premium A4 copy paper'],
            ['name' => 'Ink Cartridge Black', 'sku' => 'OFF-002', 'category_id' => 2, 'cost_price' => 15, 'selling_price' => 29.99, 'unit' => 'pcs', 'reorder_level' => 20, 'description' => 'High-yield black ink cartridge'],
            ['name' => 'Sticky Notes Pack', 'sku' => 'OFF-003', 'category_id' => 2, 'cost_price' => 2, 'selling_price' => 4.99, 'unit' => 'pack', 'reorder_level' => 50, 'description' => 'Assorted color sticky notes'],
            ['name' => 'Standing Desk', 'sku' => 'FURN-001', 'category_id' => 3, 'cost_price' => 300, 'selling_price' => 599.99, 'unit' => 'pcs', 'reorder_level' => 5, 'description' => 'Electric height-adjustable standing desk'],
            ['name' => 'Ergonomic Chair', 'sku' => 'FURN-002', 'category_id' => 3, 'cost_price' => 200, 'selling_price' => 399.99, 'unit' => 'pcs', 'reorder_level' => 8, 'description' => 'High-back ergonomic office chair'],
            ['name' => 'Filing Cabinet', 'sku' => 'FURN-003', 'category_id' => 3, 'cost_price' => 80, 'selling_price' => 149.99, 'unit' => 'pcs', 'reorder_level' => 10, 'description' => '3-drawer metal filing cabinet'],
            ['name' => 'Office 365 License', 'sku' => 'SOFT-001', 'category_id' => 4, 'cost_price' => 80, 'selling_price' => 149.99, 'unit' => 'license', 'reorder_level' => 5, 'description' => 'Annual Microsoft Office 365 Business license'],
        ];

        $warehouses = Warehouse::all();

        foreach ($products as $productData) {
            $product = Product::create($productData);

            foreach ($warehouses as $warehouse) {
                StockLevel::create([
                    'product_id' => $product->id,
                    'warehouse_id' => $warehouse->id,
                    'quantity' => rand(5, 200),
                    'reserved_quantity' => rand(0, 10),
                ]);
            }
        }
    }
}
