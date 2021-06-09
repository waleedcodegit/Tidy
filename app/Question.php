<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';

    public function service() {
        return $this->belongsTo('App\Category' , 'category_id');
    }
}
