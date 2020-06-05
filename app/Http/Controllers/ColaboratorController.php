<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\models\Colaborator;
use App\models\UserToken;
use Illuminate\Http\Request;

class ColaboratorController extends Controller
{


    public function index(Request $request, $token)
    {
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid)
        return Colaborator::all();
        else {
            return [];
        }
    }
    
    public function newColaborator(Request $request)
    {
        $token = $request->token;
        file_put_contents("debug1.txt", $request);
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NewColaborador = new Colaborator;
            $NewColaborador->name = $request->name;
            $NewColaborador->type = $request->type;
            if ($NewColaborador->save())
                return response()->json(['status_code' => 200, 'all_colaborators' => Colaborator::all()]);
            else {
                return response()->json(['status_code' => 201]);
            }
        } else {
            return response()->json(['status_code' => 202]);
        }
    }
}
