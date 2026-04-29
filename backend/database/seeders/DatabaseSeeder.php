<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            DepartmentSeeder::class,
            LeaveTypeSeeder::class,
            AccountSeeder::class,
            WarehouseSeeder::class,
            ProductCategorySeeder::class,
            ProductSeeder::class,
            CustomerSeeder::class,
            SupplierSeeder::class,
            EmployeeSeeder::class,
            ProjectSeeder::class,
        ]);
    }
}
