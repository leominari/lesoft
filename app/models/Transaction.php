<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Transaction extends Model
{
    public function getAllTransactions($id)
    {
        $result = DB::select("SELECT t.id, 
        t.description,
        t.value, 
        t.created_at as createDate 
       from transactions as t
       where t.idAccount = $id ORDER BY created_at DESC");


        return $result;
    }
}
