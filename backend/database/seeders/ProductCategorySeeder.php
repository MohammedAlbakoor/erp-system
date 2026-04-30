<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Electronics', 'slug' => 'electronics', 'description' => 'Electronic devices and accessories'],
            ['name' => 'Office Supplies', 'slug' => 'office-supplies', 'description' => 'Office equipment and supplies'],
            ['name' => 'Furniture', 'slug' => 'furniture', 'description' => 'Office and commercial furniture'],
            ['name' => 'Software', 'slug' => 'software', 'description' => 'Software licenses and subscriptions'],
            ['name' => 'Raw Materials', 'slug' => 'raw-materials', 'description' => 'Production raw materials'],
        ];

        foreach ($categories as $cat) {
            ProductCategory::create($cat);
        }
    }
}
