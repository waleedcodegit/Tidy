<?php

namespace App;

use Categories;
use Illuminate\Database\Eloquent\Model;

class VendorServices extends Model
{
    protected $table = 'vendor_selected_services';


    public function service() {
        return $this->belongsTo(Category::class,'service_id');
    }
}

