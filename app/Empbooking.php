<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empbooking extends Model
{
    protected $table = 'employee_bookings';
    
    public function booking_information(){
        return $this->belongsTo(BookingInformation::class,'booking_id');
    }
    public function booking(){
        return $this->belongsTo(booking::class,'booking_id');
    }
}