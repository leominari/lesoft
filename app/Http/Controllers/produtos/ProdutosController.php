<?php

namespace App\Http\Controllers\produtos;

use App\Http\Controllers\Controller;
use App\produtos\Produtos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {
                $produtos = Produtos::all();
                // return dd($produtos);
                return view('produtos.produtos')->with(compact('produtos'));
            }
        }
        return redirect()->route('login');
    }

    public function novoProduto(Request $request)
    {
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {
                return view('produtos.novoproduto');
            }
        }
        return redirect()->route('login');
    }

    public function newProduto(Request $request)
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
