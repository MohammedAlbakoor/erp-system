<?php

namespace App\Services;

use App\Models\Account;
use App\Models\JournalEntry;
use Illuminate\Support\Str;

class AccountingService
{
    public function createJournalEntry(array $data, array $lines): JournalEntry
    {
        $data['reference'] = $data['reference'] ?? 'JE-' . strtoupper(Str::random(8));
        $data['created_by'] = auth()->id();

        $totalDebit = collect($lines)->sum('debit');
        $totalCredit = collect($lines)->sum('credit');

        if (abs($totalDebit - $totalCredit) > 0.01) {
            throw new \Exception('Journal entry must be balanced. Debit: ' . $totalDebit . ', Credit: ' . $totalCredit);
        }

        $data['total_debit'] = $totalDebit;
        $data['total_credit'] = $totalCredit;

        $entry = JournalEntry::create($data);
        $entry->lines()->createMany($lines);

        return $entry->load('lines.account');
    }

    public function postJournalEntry(JournalEntry $entry): void
    {
        if ($entry->status !== 'draft') {
            throw new \Exception('Only draft entries can be posted');
        }

        foreach ($entry->lines as $line) {
            $account = $line->account;
            $account->balance += $line->debit - $line->credit;
            $account->save();
        }

        $entry->update(['status' => 'posted']);
    }

    public function getProfitAndLoss(string $startDate, string $endDate): array
    {
        $revenue = Account::where('type', 'revenue')
            ->whereHas('journalEntryLines.journalEntry', fn ($q) => $q->where('status', 'posted')
                ->whereBetween('date', [$startDate, $endDate]))
            ->with(['journalEntryLines' => fn ($q) => $q->whereHas('journalEntry', fn ($q2) => $q2->whereBetween('date', [$startDate, $endDate]))])
            ->get();

        $expenses = Account::where('type', 'expense')
            ->whereHas('journalEntryLines.journalEntry', fn ($q) => $q->where('status', 'posted')
                ->whereBetween('date', [$startDate, $endDate]))
            ->with(['journalEntryLines' => fn ($q) => $q->whereHas('journalEntry', fn ($q2) => $q2->whereBetween('date', [$startDate, $endDate]))])
            ->get();

        $totalRevenue = $revenue->sum(fn ($a) => $a->journalEntryLines->sum('credit') - $a->journalEntryLines->sum('debit'));
        $totalExpenses = $expenses->sum(fn ($a) => $a->journalEntryLines->sum('debit') - $a->journalEntryLines->sum('credit'));

        return [
            'period' => ['start' => $startDate, 'end' => $endDate],
            'revenue' => $revenue,
            'total_revenue' => $totalRevenue,
            'expenses' => $expenses,
            'total_expenses' => $totalExpenses,
            'net_income' => $totalRevenue - $totalExpenses,
        ];
    }

    public function getBalanceSheet(): array
    {
        $assets = Account::where('type', 'asset')->get();
        $liabilities = Account::where('type', 'liability')->get();
        $equity = Account::where('type', 'equity')->get();

        return [
            'assets' => $assets,
            'total_assets' => $assets->sum('balance'),
            'liabilities' => $liabilities,
            'total_liabilities' => $liabilities->sum('balance'),
            'equity' => $equity,
            'total_equity' => $equity->sum('balance'),
        ];
    }
}
