<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServicePricing extends Model
{
    protected $table = 'service_prices';
    protected $fillable = [
        'title',
        'price',
        'cat_id',
        'created_at',
    	'updated_at'
    ];

    public function category() {
        return $this->belongsTo('App\Category' , 'cat_id');
    }

}
