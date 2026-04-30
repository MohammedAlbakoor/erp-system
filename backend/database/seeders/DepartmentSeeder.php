<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        $departments = [
            ['name' => 'Engineering', 'code' => 'ENG', 'description' => 'Software development and engineering'],
            ['name' => 'Sales', 'code' => 'SAL', 'description' => 'Sales and business development'],
            ['name' => 'Marketing', 'code' => 'MKT', 'description' => 'Marketing and communications'],
            ['name' => 'Human Resources', 'code' => 'HR', 'description' => 'Human resources and recruitment'],
            ['name' => 'Finance', 'code' => 'FIN', 'description' => 'Finance and accounting'],
            ['name' => 'Operations', 'code' => 'OPS', 'description' => 'Operations and logistics'],
            ['name' => 'Customer Support', 'code' => 'SUP', 'description' => 'Customer service and support'],
        ];

        foreach ($departments as $dept) {
            Department::create($dept);
        }
    }
}
