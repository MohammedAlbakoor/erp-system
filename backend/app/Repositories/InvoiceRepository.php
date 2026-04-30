<?php

namespace App\Repositories;

use App\Models\Invoice;
use Illuminate\Database\Eloquent\Builder;

class InvoiceRepository extends BaseRepository
{
    public function __construct(Invoice $model)
    {
        parent::__construct($model);
    }

    public function getOverdue(): Builder
    {
        return $this->model->where('due_date', '<', now())
            ->whereNotIn('status', ['paid', 'cancelled']);
    }

    public function getRevenueByPeriod(string $startDate, string $endDate): float
    {
        return (float) $this->model->where('status', 'paid')
            ->whereBetween('date', [$startDate, $endDate])
            ->sum('total');
    }

    protected function applyFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['customer_id'])) {
            $query->where('customer_id', $filters['customer_id']);
        }
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (!empty($filters['date_from'])) {
            $query->where('date', '>=', $filters['date_from']);
        }
        if (!empty($filters['date_to'])) {
            $query->where('date', '<=', $filters['date_to']);
        }
        return $query;
    }
}
