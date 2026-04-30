<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['name' => 'Acme Corporation', 'email' => 'contact@acme.com', 'phone' => '+1-555-1001', 'company' => 'Acme Corp', 'address' => '100 Main St', 'city' => 'San Francisco', 'state' => 'CA', 'country' => 'USA', 'postal_code' => '94102', 'tax_id' => 'US-12345'],
            ['name' => 'TechStart Inc', 'email' => 'info@techstart.io', 'phone' => '+1-555-1002', 'company' => 'TechStart', 'address' => '200 Innovation Way', 'city' => 'Austin', 'state' => 'TX', 'country' => 'USA', 'postal_code' => '73301', 'tax_id' => 'US-12346'],
            ['name' => 'Global Solutions', 'email' => 'sales@globalsol.com', 'phone' => '+1-555-1003', 'company' => 'Global Solutions LLC', 'address' => '300 Business Pkwy', 'city' => 'Chicago', 'state' => 'IL', 'country' => 'USA', 'postal_code' => '60601', 'tax_id' => 'US-12347'],
            ['name' => 'Peak Performance', 'email' => 'hello@peakperf.com', 'phone' => '+1-555-1004', 'company' => 'Peak Performance Ltd', 'address' => '400 Summit Dr', 'city' => 'Denver', 'state' => 'CO', 'country' => 'USA', 'postal_code' => '80201', 'tax_id' => 'US-12348'],
            ['name' => 'Digital Dynamics', 'email' => 'team@digidyn.co', 'phone' => '+1-555-1005', 'company' => 'Digital Dynamics', 'address' => '500 Tech Blvd', 'city' => 'Seattle', 'state' => 'WA', 'country' => 'USA', 'postal_code' => '98101', 'tax_id' => 'US-12349'],
            ['name' => 'Bright Futures LLC', 'email' => 'admin@brightfutures.com', 'phone' => '+1-555-1006', 'company' => 'Bright Futures', 'address' => '600 Prospect Ave', 'city' => 'Miami', 'state' => 'FL', 'country' => 'USA', 'postal_code' => '33101', 'tax_id' => 'US-12350'],
            ['name' => 'Nordic Systems', 'email' => 'info@nordicsys.eu', 'phone' => '+44-20-7946001', 'company' => 'Nordic Systems AB', 'address' => '10 King St', 'city' => 'London', 'country' => 'UK', 'postal_code' => 'SW1A 1AA', 'tax_id' => 'GB-98765'],
            ['name' => 'Eastern Markets', 'email' => 'trade@easternmkt.sg', 'phone' => '+65-6789-0001', 'company' => 'Eastern Markets Pte', 'address' => '1 Raffles Place', 'city' => 'Singapore', 'country' => 'Singapore', 'postal_code' => '048616', 'tax_id' => 'SG-54321'],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
