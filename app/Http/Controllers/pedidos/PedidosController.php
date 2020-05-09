<?php

namespace App\Http\Controllers\pedidos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PedidosController extends Controller
{
    public function index(Request $request){
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {
                return view('pedidos.pedidos');
            }
        }
        return redirect()->route('login');
    }

    public function novoPedido(Request $request)
    {
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {
                return view('pedidos.novopedido');
            }
        }
        return redirect()->route('login');
    }

    public function newPedido(Request $request)
    {
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {

                $resultado = DB::table('produtos')->insert([
                    'nome' => $request->nomeProduto,
                    'unidade' => $request->unidadeProduto,
                    'preco' => $request->precoProduto,
                ]);
                return redirect()->route('prod.home');
            }
        }
        return redirect()->route('login');
    }
}
