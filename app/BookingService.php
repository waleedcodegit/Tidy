<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BookingService extends Model
{
    protected $table = 'booking_services';

    public function booking(){
        return $this->belongsto(Booking::class,'booking_id');
    }

    public function bookingInformation(){
        return $this->belongsto(BookingInformation::class,'booking_id');
    }
}
