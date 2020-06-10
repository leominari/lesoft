<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DebugController extends Controller
{
    public function index()
    {
        $result = DB::select('SELECT o.id, 
        c.name as Client,
        s.name as Salesman, 
        o.created_at as createDate, 
        (SELECT (op.productPrice * op.quantity) 
           from order_products as op 
           where o.id = op.idOrder) as price 
       from orders as o, 
            colaborators as c, 
            colaborators as s 
       where c.id = o.idColaborator AND 
             s.id = o.idSalesman');
        return view('welcome', ['debug' => $result]);
    }
}
