<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $table = 'attendance';

    protected $fillable = ['employee_id', 'date', 'check_in', 'check_out', 'hours_worked', 'status', 'notes'];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'hours_worked' => 'decimal:2',
        ];
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
