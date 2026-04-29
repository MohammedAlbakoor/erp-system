<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Full system access',
                'permissions' => json_encode([
                    'users.view', 'users.create', 'users.edit', 'users.delete',
                    'customers.view', 'customers.create', 'customers.edit', 'customers.delete',
                    'products.view', 'products.create', 'products.edit', 'products.delete',
                    'invoices.view', 'invoices.create', 'invoices.edit', 'invoices.delete',
                    'accounting.view', 'accounting.create', 'accounting.edit',
                    'hr.view', 'hr.create', 'hr.edit', 'hr.delete',
                    'projects.view', 'projects.create', 'projects.edit', 'projects.delete',
                    'reports.view', 'reports.export',
                    'settings.view', 'settings.edit',
                ]),
            ],
            [
                'name' => 'Manager',
                'slug' => 'manager',
                'description' => 'Department management access',
                'permissions' => json_encode([
                    'customers.view', 'customers.create', 'customers.edit',
                    'products.view', 'products.create', 'products.edit',
                    'invoices.view', 'invoices.create', 'invoices.edit',
                    'accounting.view',
                    'hr.view', 'hr.edit',
                    'projects.view', 'projects.create', 'projects.edit',
                    'reports.view', 'reports.export',
                ]),
            ],
            [
                'name' => 'Employee',
                'slug' => 'employee',
                'description' => 'Standard employee access',
                'permissions' => json_encode([
                    'customers.view',
                    'products.view',
                    'invoices.view',
                    'projects.view',
                    'hr.view',
                ]),
            ],
            [
                'name' => 'Customer',
                'slug' => 'customer',
                'description' => 'Customer portal access',
                'permissions' => json_encode([
                    'invoices.view',
                    'products.view',
                ]),
            ],
            [
                'name' => 'Supplier',
                'slug' => 'supplier',
                'description' => 'Supplier portal access',
                'permissions' => json_encode([
                    'products.view',
                ]),
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
