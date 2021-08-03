<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ServiceContent extends Model
{
    protected $table = 'services_content';

    public function service() {
        return $this->belongsTo('App\Category' , 'service_id');
    }
}
