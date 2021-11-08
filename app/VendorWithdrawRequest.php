<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VendorWithdrawRequest extends Model
{
    protected $table = 'vendor_withdraw_request';
   
    public function vendorname() {
        return $this->belongsTo('App\Vendor','vendor_id');
    }
}
