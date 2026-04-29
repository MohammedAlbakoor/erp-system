<?php

namespace Database\Seeders;

use App\Models\Warehouse;
use Illuminate\Database\Seeder;

class WarehouseSeeder extends Seeder
{
    public function run(): void
    {
        $warehouses = [
            ['name' => 'Main Warehouse', 'code' => 'WH-MAIN', 'address' => '123 Industrial Ave', 'city' => 'New York', 'country' => 'USA', 'manager_name' => 'John Smith', 'phone' => '+1-555-0101'],
            ['name' => 'East Distribution', 'code' => 'WH-EAST', 'address' => '456 Commerce St', 'city' => 'Boston', 'country' => 'USA', 'manager_name' => 'Jane Doe', 'phone' => '+1-555-0102'],
            ['name' => 'West Storage', 'code' => 'WH-WEST', 'address' => '789 Logistics Blvd', 'city' => 'Los Angeles', 'country' => 'USA', 'manager_name' => 'Mike Ross', 'phone' => '+1-555-0103'],
        ];

        foreach ($warehouses as $wh) {
            Warehouse::create($wh);
        }
    }
}
