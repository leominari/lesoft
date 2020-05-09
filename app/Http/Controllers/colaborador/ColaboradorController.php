<?php

namespace App\Http\Controllers\colaborador;

use App\colaborador\Colaboradores;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ColaboradorController extends Controller
{


    public function index(Request $request)
    {
        $colaboradores = Colaboradores::all();
        return $colaboradores;
    }

    public function novoColaborador(Request $request)
    {
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {
                return view('colaborador.novocolaborador');
            }
        }
        return redirect()->route('login');
    }


    public function newColaborador(Request $request)
    {
        if ($request->session()->has('access')) {
            if ($request->session()->get('access') === 'admin') {

                $resultado = DB::table('colaboradores')->insert([
                    'nome' => $request->nomeColaborador,
                    'tipo' => $request->tipoColaborador,
                    // 'preco' => $request->precoProduto,
                ]);
                return redirect()->route('colab.home');
            }
        }
        return redirect()->route('login');
    }
}
