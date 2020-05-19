<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class UserToken extends Model
{
    protected $fillable = [
        'id', 'token', 'idUser', 'valid',
    ];
    protected $table = 'user_tokens';
}
