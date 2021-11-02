<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $table = 'bookings';

    public function service() {
        return $this->belongsTo('App\Category' , 'service_id');
    }
    public function sub_service() {
        return $this->belongsTo('App\SubCategory' , 'sub_service_id');
    }
    public function information() {
        return $this->hasOne('App\BookingInformation');
    }
    public function booking_services() {
        return $this->hasMany('App\BookingService');
    }
    public function vendor() {
        return $this->belongsTo('App\Vendor','vendor_id');
    }
}
