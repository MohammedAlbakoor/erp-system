<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'description', 'manager_id', 'customer_id',
        'start_date', 'end_date', 'budget', 'progress', 'status', 'priority',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'budget' => 'decimal:2',
        ];
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function updateProgress(): void
    {
        $tasks = $this->tasks;
        if ($tasks->isEmpty()) {
            return;
        }
        $this->progress = (int) $tasks->avg('progress');
        $this->save();
    }
}
