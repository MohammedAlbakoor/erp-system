<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('slug', 'admin')->first();
        $managerRole = Role::where('slug', 'manager')->first();
        $employeeRole = Role::where('slug', 'employee')->first();

        User::create([
            'name' => 'System Admin',
            'email' => 'admin@erp.com',
            'password' => 'password',
            'role_id' => $adminRole->id,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        User::create([
            'name' => 'Sarah Johnson',
            'email' => 'sarah@erp.com',
            'password' => 'password',
            'role_id' => $managerRole->id,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        User::create([
            'name' => 'James Wilson',
            'email' => 'james@erp.com',
            'password' => 'password',
            'role_id' => $managerRole->id,
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $employees = [
            ['name' => 'Alice Brown', 'email' => 'alice@erp.com'],
            ['name' => 'Bob Davis', 'email' => 'bob@erp.com'],
            ['name' => 'Carol Martinez', 'email' => 'carol@erp.com'],
            ['name' => 'David Lee', 'email' => 'david@erp.com'],
            ['name' => 'Emma Garcia', 'email' => 'emma@erp.com'],
            ['name' => 'Frank Miller', 'email' => 'frank@erp.com'],
            ['name' => 'Grace Taylor', 'email' => 'grace@erp.com'],
            ['name' => 'Henry Anderson', 'email' => 'henry@erp.com'],
        ];

        foreach ($employees as $emp) {
            User::create([
                'name' => $emp['name'],
                'email' => $emp['email'],
                'password' => 'password',
                'role_id' => $employeeRole->id,
                'email_verified_at' => now(),
                'is_active' => true,
            ]);
        }
    }
}
