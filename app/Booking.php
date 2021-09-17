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
}
