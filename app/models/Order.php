<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    public function getAllOrders()
    {
        $result = DB::select('SELECT o.id, 
        c.name as Client,
        s.name as Salesman, 
        o.created_at as createDate, 
        (SELECT SUM((op.productPrice * op.quantity)) 
           from order_products as op 
           where o.id = op.idOrder) as price 
       from orders as o, 
            colaborators as c, 
            colaborators as s 
       where c.id = o.idColaborator AND 
             s.id = o.idSalesman');


        return $result;
    }
}
