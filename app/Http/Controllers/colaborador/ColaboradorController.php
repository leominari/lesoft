<?php

namespace App\Http\Controllers\colaborador;

use App\Http\Controllers\Controller;
use App\models\Colaborador;
use App\models\UserToken;
use Illuminate\Http\Request;

class ColaboradorController extends Controller
{


    public function index(Request $request, $token)
    {
        // file_put_contents("debug1.txt", $token);
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
            if ($NovoColaborador->save())
                return response()->json(['status_code' => '200']);
            else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
