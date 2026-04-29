<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private ProductRepository $productRepository,
        private InventoryService $inventoryService,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'category_id', 'is_active']);
        $products = $this->productRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($products);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:product_categories,id',
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'unit' => 'nullable|string|max:20',
            'reorder_level' => 'nullable|integer|min:0',
            'barcode' => 'nullable|string|max:100',
        ]);

        $product = $this->productRepository->create($data);
        return response()->json($product, 201);
    }

    public function show(int $id): JsonResponse
    {
        $product = $this->productRepository->findOrFail($id, ['category', 'stockLevels.warehouse', 'batches']);
        return response()->json($product);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'sku' => 'sometimes|string|max:100|unique:products,sku,' . $id,
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:product_categories,id',
            'cost_price' => 'sometimes|numeric|min:0',
            'selling_price' => 'sometimes|numeric|min:0',
            'unit' => 'nullable|string|max:20',
            'reorder_level' => 'nullable|integer|min:0',
            'barcode' => 'nullable|string|max:100',
            'is_active' => 'sometimes|boolean',
        ]);

        $product = $this->productRepository->update($id, $data);
        return response()->json($product);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->productRepository->delete($id);
        return response()->json(null, 204);
    }

    public function adjustStock(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'type' => 'required|in:in,out,adjustment',
            'quantity' => 'required|integer|min:1',
            'reference' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $movement = $this->inventoryService->adjustStock(
            $id, $data['warehouse_id'], $data['type'], $data['quantity'],
            $data['reference'] ?? null, $data['notes'] ?? null
        );

        return response()->json($movement, 201);
    }

    public function lowStock(): JsonResponse
    {
        $products = $this->productRepository->getLowStockProducts();
        return response()->json($products);
    }

    public function stockReport(): JsonResponse
    {
        return response()->json($this->inventoryService->getStockReport());
    }
}
