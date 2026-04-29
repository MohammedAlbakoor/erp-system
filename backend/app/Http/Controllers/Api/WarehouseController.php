<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WarehouseController extends Controller
{
    public function index(): JsonResponse
    {
        $warehouses = Warehouse::withCount('stockLevels')->get();
        return response()->json($warehouses);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:warehouses',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'manager_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $warehouse = Warehouse::create($data);
        return response()->json($warehouse, 201);
    }

    public function show(int $id): JsonResponse
    {
        $warehouse = Warehouse::with('stockLevels.product')->findOrFail($id);
        return response()->json($warehouse);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $warehouse = Warehouse::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50|unique:warehouses,code,' . $id,
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'manager_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'is_active' => 'sometimes|boolean',
        ]);

        $warehouse->update($data);
        return response()->json($warehouse);
    }

    public function destroy(int $id): JsonResponse
    {
        Warehouse::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
