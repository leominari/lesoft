<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Colaborator extends Model
{
    protected $fillable = [
        'id','name', 'type',
    ];
}
