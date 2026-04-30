<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CustomerRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function __construct(
        private CustomerRepository $customerRepository,
    ) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'status']);
        $customers = $this->customerRepository->paginate($request->get('per_page', 15), $filters);
        return response()->json($customers);
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
            'notes' => 'nullable|string',
        ]);

        $customer = $this->customerRepository->create($data);
        return response()->json($customer, 201);
    }

    public function show(int $id): JsonResponse
    {
        $customer = $this->customerRepository->findOrFail($id, ['invoices', 'salesOrders']);
        return response()->json($customer);
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
            'status' => 'sometimes|in:active,inactive',
            'notes' => 'nullable|string',
        ]);

        $customer = $this->customerRepository->update($id, $data);
        return response()->json($customer);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->customerRepository->delete($id);
        return response()->json(null, 204);
    }
}
