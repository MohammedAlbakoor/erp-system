<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $fillable = ['name', 'code', 'head_id', 'description'];

    public function head()
    {
        return $this->belongsTo(User::class, 'head_id');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
