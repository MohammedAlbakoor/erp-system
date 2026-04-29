<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\SupplierRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function __construct(
        private SupplierRepository $supplierRepository,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $suppliers = $this->supplierRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($suppliers);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'tax_id' => 'nullable|string|max:50',
            'payment_terms' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $supplier = $this->supplierRepository->create($data);
        return response()->json($supplier, 201);
    }

    public function show(int $id): JsonResponse
    {
        $supplier = $this->supplierRepository->findOrFail($id, ['purchaseOrders']);
        return response()->json($supplier);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'tax_id' => 'nullable|string|max:50',
            'payment_terms' => 'nullable|string|max:100',
            'status' => 'sometimes|in:active,inactive',
            'notes' => 'nullable|string',
        ]);

        $supplier = $this->supplierRepository->update($id, $data);
        return response()->json($supplier);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->supplierRepository->delete($id);
        return response()->json(null, 204);
    }
}
