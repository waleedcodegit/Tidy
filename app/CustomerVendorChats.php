<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerVendorChats extends Model
{
    protected $table = 'customer_vendor_chats';

    public function customer() {
        return $this->belongsTo('App\customer' , 'customer_id');
    }
    public function booking() {
        return $this->belongsTo('App\bookings' , 'booking_id');
    }
}
