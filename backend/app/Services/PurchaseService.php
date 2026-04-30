<?php

namespace App\Services;

use App\Models\PurchaseOrder;
use App\Repositories\PurchaseOrderRepository;
use Illuminate\Support\Str;

class PurchaseService
{
    public function __construct(
        private PurchaseOrderRepository $purchaseOrderRepository,
    ) {}

    public function createPurchaseOrder(array $data, array $items): PurchaseOrder
    {
        $data['number'] = $this->generatePONumber();
        $data['created_by'] = auth()->id();

        $subtotal = 0;
        foreach ($items as &$item) {
            $item['total'] = ($item['quantity'] * $item['unit_price']) + ($item['tax'] ?? 0);
            $subtotal += $item['total'];
        }

        $data['subtotal'] = $subtotal;
        $data['total'] = $subtotal - ($data['discount'] ?? 0) + ($data['tax'] ?? 0);

        $po = $this->purchaseOrderRepository->create($data);
        $po->items()->createMany($items);

        return $po->load('items.product', 'supplier');
    }

    public function approvePurchaseOrder(PurchaseOrder $po): void
    {
        if ($po->status !== 'submitted') {
            throw new \Exception('Only submitted purchase orders can be approved');
        }

        $po->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
        ]);
    }

    private function generatePONumber(): string
    {
        $latest = PurchaseOrder::orderBy('id', 'desc')->first();
        $number = $latest ? intval(substr($latest->number, 3)) + 1 : 1;
        return 'PO-' . str_pad($number, 6, '0', STR_PAD_LEFT);
    }
}
