<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VendorQuote extends Model
{
    protected $table = 'vendor_quotes';

    public function vendor() {
        return $this->belongsTo('App\Vendor','vendor_id');
    }

}
