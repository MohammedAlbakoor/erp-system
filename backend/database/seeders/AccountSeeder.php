<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    public function run(): void
    {
        $accounts = [
            ['code' => '1000', 'name' => 'Cash', 'type' => 'asset', 'balance' => 50000],
            ['code' => '1100', 'name' => 'Accounts Receivable', 'type' => 'asset', 'balance' => 25000],
            ['code' => '1200', 'name' => 'Inventory', 'type' => 'asset', 'balance' => 75000],
            ['code' => '1300', 'name' => 'Prepaid Expenses', 'type' => 'asset', 'balance' => 5000],
            ['code' => '1500', 'name' => 'Equipment', 'type' => 'asset', 'balance' => 100000],
            ['code' => '2000', 'name' => 'Accounts Payable', 'type' => 'liability', 'balance' => 15000],
            ['code' => '2100', 'name' => 'Accrued Expenses', 'type' => 'liability', 'balance' => 8000],
            ['code' => '2200', 'name' => 'Taxes Payable', 'type' => 'liability', 'balance' => 12000],
            ['code' => '2500', 'name' => 'Long-term Debt', 'type' => 'liability', 'balance' => 50000],
            ['code' => '3000', 'name' => 'Owner Equity', 'type' => 'equity', 'balance' => 170000],
            ['code' => '4000', 'name' => 'Sales Revenue', 'type' => 'revenue', 'balance' => 0],
            ['code' => '4100', 'name' => 'Service Revenue', 'type' => 'revenue', 'balance' => 0],
            ['code' => '5000', 'name' => 'Cost of Goods Sold', 'type' => 'expense', 'balance' => 0],
            ['code' => '5100', 'name' => 'Salaries Expense', 'type' => 'expense', 'balance' => 0],
            ['code' => '5200', 'name' => 'Rent Expense', 'type' => 'expense', 'balance' => 0],
            ['code' => '5300', 'name' => 'Utilities Expense', 'type' => 'expense', 'balance' => 0],
            ['code' => '5400', 'name' => 'Marketing Expense', 'type' => 'expense', 'balance' => 0],
        ];

        foreach ($accounts as $account) {
            Account::create($account);
        }
    }
}
