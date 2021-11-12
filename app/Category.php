<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $fillable = [
        'type',
        'name',
        'image',
        'created_at',
    	'updated_at'
    ];
    public function subcategory() {
        return $this->hasMany(SubCategory::class);
    }
 
}
