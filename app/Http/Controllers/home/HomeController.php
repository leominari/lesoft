<?php

namespace App\Http\Controllers\home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function autenticate()
    {
        if ($this->request->session()->has('access')) {
            if ($this->request->session()->get('access') === 'admin') {
                return true;
            }
        }
        return false;
    }


    public function index(Request $request)
    {
        $this->request = $request;
        if ($this->autenticate()) {
            $oloco = 5;
            return view('home', compact('oloco'));
        }
        return redirect()->route('login');
    }

    public function dologout(Request $request)
    {
        if ($request->session()->has('access')) {
            $request->session()->flush();
            return redirect()->route('login');
        }
    }
}
