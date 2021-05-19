<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InsuranceCertificateCCard extends Model
{
    protected $table = "insurance_certificate_credit_cards";
    protected $fillable = [ 
        'vendor_id',				
        'credit_card_number',
        'cvc',
        'expiry_month',
        'expiry_year',
        'card_holder_name',	
        'duration_of_insu_charges',
        'status',
        'created_at',
    	'updated_at'
    ];
}
