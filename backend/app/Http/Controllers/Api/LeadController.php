<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Deal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $leads = Lead::with('assignee')
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate($request->get('per_page', 15));
        return response()->json($leads);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:100',
            'estimated_value' => 'nullable|numeric|min:0',
            'assigned_to' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $lead = Lead::create($data);
        return response()->json($lead, 201);
    }

    public function show(int $id): JsonResponse
    {
        $lead = Lead::with('assignee', 'deals')->findOrFail($id);
        return response()->json($lead);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $lead = Lead::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:100',
            'status' => 'sometimes|in:new,contacted,qualified,converted,lost',
            'estimated_value' => 'nullable|numeric|min:0',
            'assigned_to' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $lead->update($data);
        return response()->json($lead);
    }

    public function destroy(int $id): JsonResponse
    {
        Lead::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    public function deals(Request $request): JsonResponse
    {
        $deals = Deal::with('lead', 'customer', 'assignee')
            ->when($request->stage, fn ($q, $s) => $q->where('stage', $s))
            ->latest()
            ->paginate($request->get('per_page', 15));
        return response()->json($deals);
    }

    public function storeDeal(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'lead_id' => 'nullable|exists:leads,id',
            'customer_id' => 'nullable|exists:customers,id',
            'value' => 'required|numeric|min:0',
            'stage' => 'nullable|in:prospecting,proposal,negotiation,closed_won,closed_lost',
            'expected_close_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $deal = Deal::create($data);
        return response()->json($deal, 201);
    }

    public function updateDeal(Request $request, int $id): JsonResponse
    {
        $deal = Deal::findOrFail($id);
        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'value' => 'sometimes|numeric|min:0',
            'stage' => 'sometimes|in:prospecting,proposal,negotiation,closed_won,closed_lost',
            'expected_close_date' => 'nullable|date',
            'assigned_to' => 'nullable|exists:users,id',
            'notes' => 'nullable|string',
        ]);

        $deal->update($data);
        return response()->json($deal);
    }
}
