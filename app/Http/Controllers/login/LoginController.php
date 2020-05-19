<?php

namespace App\Http\Controllers\login;

use App\Http\Controllers\Controller;
use App\models\UserToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class LoginController extends Controller
{
    public function index()
    {
        return User::all();
    }


    public function dologin(Request $request)
    {
        $userName = $request->username;
        $userPassword = $request->password;
        $busca = User::where('user', $userName)->get();
        if (sizeof($busca) > 0) {
            if (($busca[0]->user === $userName) && Hash::check($userPassword, $busca[0]->password)) {
                $token = Str::random(80);
                $UserToken = new UserToken;
                $UserToken->token = $token;
                $UserToken->idUser = $busca[0]->id;
                $UserToken->valid = 1;
                $UserToken->save();
                return response()->json(['status_code' => '200', 'token' => $token]);
            } else {
                return response()->json(['status_code' => '201']);
            }
        }
        return response()->json(['status_code' => '202']);
    }

    public function dologout(Request $request)
    {
        file_put_contents("request.txt", $request);
        $ClientToken = $request->token;
        $Session = UserToken::where('token', $ClientToken)->first();
        if ($Session->valid) {
            $Session->valid = 0;
            $Session->save();
            return response()->json(['status_code' => '200']);
        } else {
            return response()->json(['status_code' => '201']);
        }
        return response()->json(['status_code' => '202']);;
    }
}
