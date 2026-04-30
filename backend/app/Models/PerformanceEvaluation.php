<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceEvaluation extends Model
{
    protected $fillable = [
        'employee_id', 'evaluator_id', 'period', 'score', 'criteria_scores',
        'strengths', 'weaknesses', 'goals', 'comments', 'status',
    ];

    protected function casts(): array
    {
        return ['criteria_scores' => 'array'];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function evaluator()
    {
        return $this->belongsTo(User::class, 'evaluator_id');
    }
}
