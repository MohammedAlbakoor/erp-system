<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles_custom';

    protected $fillable = ['name', 'slug', 'permissions', 'description'];

    protected function casts(): array
    {
        return ['permissions' => 'array'];
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function hasPermission(string $permission): bool
    {
        $permissions = $this->permissions ?? [];
        return in_array($permission, $permissions);
    }
}
