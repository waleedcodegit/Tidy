<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $table = 'vendors';
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'address',
        'phone',
        'dob',
        'australian_business_number',
        'type_of_business',
        'business_name',
        'company_name',
        'expiry_date_ins',
        'trading',
        'insurance_certificate_type',
        'insurance_certificate',
        'status',
        'created_at',
    	'updated_at'	
    ];

    public function insurance_detail() {
        return $this->hasOne(InsuranceCertificateCCard::class);
    }
    public function vendor_doc() {
        return $this->hasMany(VendorDocuments::class);
    }
    public function vendor_servicess() {
        return $this->hasMany(VendorServices::class);
    }
    
    
}
