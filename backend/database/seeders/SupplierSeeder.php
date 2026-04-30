<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            ['name' => 'MegaTech Supply', 'email' => 'orders@megatech.com', 'phone' => '+1-555-2001', 'company' => 'MegaTech Supply Co', 'address' => '1000 Supply Chain Rd', 'city' => 'Shenzhen', 'country' => 'China', 'payment_terms' => 'Net 30'],
            ['name' => 'Office World', 'email' => 'wholesale@officeworld.com', 'phone' => '+1-555-2002', 'company' => 'Office World Inc', 'address' => '2000 Wholesale Ave', 'city' => 'Dallas', 'state' => 'TX', 'country' => 'USA', 'payment_terms' => 'Net 15'],
            ['name' => 'Quality Furniture Co', 'email' => 'sales@qualityfurn.com', 'phone' => '+1-555-2003', 'company' => 'Quality Furniture Co', 'address' => '3000 Craftsman Way', 'city' => 'Portland', 'state' => 'OR', 'country' => 'USA', 'payment_terms' => 'Net 45'],
            ['name' => 'TechParts Direct', 'email' => 'parts@techparts.com', 'phone' => '+886-2-27001234', 'company' => 'TechParts Direct Ltd', 'address' => '88 Tech Park', 'city' => 'Taipei', 'country' => 'Taiwan', 'payment_terms' => 'Net 30'],
            ['name' => 'EuroSupply GmbH', 'email' => 'kontakt@eurosupply.de', 'phone' => '+49-89-12345678', 'company' => 'EuroSupply GmbH', 'address' => '50 Industriestraße', 'city' => 'Munich', 'country' => 'Germany', 'payment_terms' => 'Net 60'],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}
