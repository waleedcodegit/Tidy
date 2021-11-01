<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VendorBookingRequest extends Model
{
    protected $table = 'vendor_booking_requests';

    public function booking_information(){
        return $this->belongsTo(BookingInformation::class,'booking_id');
    }
    public function booking(){
        return $this->belongsTo(booking::class,'booking_id');
    }
}
