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

    public function newColaborador(Request $request)
    {
        file_put_contents("batata1.txt", $request);
        return 'salve';
        // $resultado = DB::table('colaboradores')->insert([
        //     'nome' => $request->nomeColaborador,
        //     'tipo' => $request->tipoColaborador,
        // ]);
    }
}
