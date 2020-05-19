<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    protected $table = 'colaboradors';
    protected $fillable = [
        'id','nome', 'tipo',
    ];
}
