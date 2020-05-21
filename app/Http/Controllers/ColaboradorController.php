<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\models\Colaborador;
use App\models\UserToken;
use Illuminate\Http\Request;

class ColaboradorController extends Controller
{


    public function index(Request $request, $token)
    {
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid)
        return Colaborador::all();
        else {
            return [];
        }
    }
    
    public function newColaborador(Request $request)
    {
        $token = $request->token;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NovoColaborador = new Colaborador;
            $NovoColaborador->nome = $request->nome;
            $NovoColaborador->tipo = $request->tipo;
            // file_put_contents("debug1.txt", $NovoColaborador->id);
            if ($NovoColaborador->save())
                return response()->json(['status_code' => 200, 'todos_colaboradores' => Colaborador::all()]);
            else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
