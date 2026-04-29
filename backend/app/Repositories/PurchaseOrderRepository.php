<?php

namespace App\Repositories;

use App\Models\PurchaseOrder;
use Illuminate\Database\Eloquent\Builder;

class PurchaseOrderRepository extends BaseRepository
{
    public function __construct(PurchaseOrder $model)
    {
        parent::__construct($model);
    }

    protected function applyFilters(Builder $query, array $filters): Builder
    {
        if (!empty($filters['supplier_id'])) {
            $query->where('supplier_id', $filters['supplier_id']);
        }
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (!empty($filters['date_from'])) {
            $query->where('order_date', '>=', $filters['date_from']);
        }
        if (!empty($filters['date_to'])) {
            $query->where('order_date', '<=', $filters['date_to']);
        }
        return $query;
    }
}
