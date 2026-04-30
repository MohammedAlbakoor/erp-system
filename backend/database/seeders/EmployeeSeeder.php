<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('email', '!=', 'admin@erp.com')->get();
        $departments = Department::all();
        $positions = ['Senior Developer', 'Sales Manager', 'Marketing Specialist', 'HR Coordinator', 'Financial Analyst', 'Operations Manager', 'Support Lead', 'Junior Developer', 'Sales Rep', 'Data Analyst'];

        $counter = 1;
        foreach ($users as $user) {
            Employee::create([
                'user_id' => $user->id,
                'employee_id' => 'EMP-' . str_pad($counter, 4, '0', STR_PAD_LEFT),
                'department_id' => $departments->random()->id,
                'position' => $positions[array_rand($positions)],
                'hire_date' => now()->subMonths(rand(1, 36)),
                'birth_date' => now()->subYears(rand(25, 50)),
                'gender' => ['male', 'female'][rand(0, 1)],
                'base_salary' => rand(40, 120) * 1000,
                'employment_type' => 'full_time',
                'status' => 'active',
            ]);
            $counter++;
        }
    }
}
