<?php

namespace App\Http\Controllers\comercial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComercialController extends Controller
{
    public function index(Request $request){
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {
                return view('comercial.comercial');
            }
        }
        return redirect()->route('login');
    }
}
