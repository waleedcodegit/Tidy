<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $table= 'cities';
    protected $fillable = [
        'state_id',
        'name',
        'created_at',
    	'updated_at'
    ];

    public function state_name() {
        return $this->belongsTo('App\State' , 'state_id');
    }
}
