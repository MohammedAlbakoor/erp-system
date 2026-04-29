<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;
use App\Repositories\PurchaseOrderRepository;
use App\Services\PurchaseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseOrderController extends Controller
{
    public function __construct(
        private PurchaseOrderRepository $purchaseOrderRepository,
        private PurchaseService $purchaseService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['supplier_id', 'status', 'date_from', 'date_to']);
        $orders = $this->purchaseOrderRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($orders);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'order_date' => 'required|date',
            'expected_date' => 'nullable|date|after_or_equal:order_date',
            'tax' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.tax' => 'nullable|numeric|min:0',
        ]);

        $items = $data['items'];
        unset($data['items']);

        $po = $this->purchaseService->createPurchaseOrder($data, $items);
        return response()->json($po, 201);
    }

    public function show(int $id): JsonResponse
    {
        $po = $this->purchaseOrderRepository->findOrFail($id, ['items.product', 'supplier', 'creator', 'receipts']);
        return response()->json($po);
    }

    public function approve(int $id): JsonResponse
    {
        $po = PurchaseOrder::findOrFail($id);
        $this->purchaseService->approvePurchaseOrder($po);
        return response()->json($po->fresh());
    }

    public function destroy(int $id): JsonResponse
    {
        $this->purchaseOrderRepository->delete($id);
        return response()->json(null, 204);
    }
}
