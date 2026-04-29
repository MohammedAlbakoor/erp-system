<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\JournalEntry;
use App\Services\AccountingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccountingController extends Controller
{
    public function __construct(
        private AccountingService $accountingService,
    ) {}

    public function accounts(Request $request): JsonResponse
    {
        $accounts = Account::with('children')
            ->when($request->type, fn ($q, $type) => $q->where('type', $type))
            ->whereNull('parent_id')
            ->get();
        return response()->json($accounts);
    }

    public function storeAccount(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => 'required|string|unique:accounts',
            'name' => 'required|string|max:255',
            'type' => 'required|in:asset,liability,equity,revenue,expense',
            'parent_id' => 'nullable|exists:accounts,id',
            'description' => 'nullable|string',
        ]);

        $account = Account::create($data);
        return response()->json($account, 201);
    }

    public function journalEntries(Request $request): JsonResponse
    {
        $entries = JournalEntry::with('lines.account', 'creator')
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate($request->get('per_page', 15));
        return response()->json($entries);
    }

    public function storeJournalEntry(Request $request): JsonResponse
    {
        $data = $request->validate([
            'date' => 'required|date',
            'description' => 'nullable|string',
            'reference' => 'nullable|string|unique:journal_entries',
            'lines' => 'required|array|min:2',
            'lines.*.account_id' => 'required|exists:accounts,id',
            'lines.*.debit' => 'required|numeric|min:0',
            'lines.*.credit' => 'required|numeric|min:0',
            'lines.*.description' => 'nullable|string',
        ]);

        $lines = $data['lines'];
        unset($data['lines']);

        $entry = $this->accountingService->createJournalEntry($data, $lines);
        return response()->json($entry, 201);
    }

    public function postJournalEntry(int $id): JsonResponse
    {
        $entry = JournalEntry::findOrFail($id);
        $this->accountingService->postJournalEntry($entry);
        return response()->json($entry->fresh());
    }

    public function profitAndLoss(Request $request): JsonResponse
    {
        $startDate = $request->get('start_date', now()->startOfYear()->toDateString());
        $endDate = $request->get('end_date', now()->toDateString());

        return response()->json($this->accountingService->getProfitAndLoss($startDate, $endDate));
    }

    public function balanceSheet(): JsonResponse
    {
        return response()->json($this->accountingService->getBalanceSheet());
    }
}
