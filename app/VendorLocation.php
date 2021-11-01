<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VendorLocation extends Model
{
    protected $table = 'vendor_locations';

    public function vendor(){
        return $this->belongsTo(Vendor::class,'vendor_id');
    }
}
