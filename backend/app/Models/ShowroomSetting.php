<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowroomSetting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'group'];

    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        return $setting?->value ?? $default;
    }

    public static function set(string $key, mixed $value, ?string $type = null, ?string $group = null): void
    {
        $existing = static::where('key', $key)->first();

        $attributes = ['value' => $value];
        if ($type !== null) {
            $attributes['type'] = $type;
        } elseif (!$existing) {
            $attributes['type'] = 'text';
        }
        if ($group !== null) {
            $attributes['group'] = $group;
        } elseif (!$existing) {
            $attributes['group'] = 'general';
        }

        static::updateOrCreate(['key' => $key], $attributes);
    }
}
