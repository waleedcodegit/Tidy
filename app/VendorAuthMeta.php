<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VendorAuthMeta extends Model
{
    protected $table = 'vendor_auth_meta';
    protected $fillable = [
        'vendor_id',
        'token',
        'token_valid_till',
        'ip',
        'created_at',
    	'updated_at'
    ];
}
