<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceExtra extends Model
{
    protected $table = 'service_extras';
    protected $fillable = [
        'title',
        'price',
        'created_at',
    	'updated_at'
    ];
}
