<?php

namespace App\Http\Controllers\login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;

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
        file_put_contents("batata1.txt", $request);
        if (sizeof($busca) > 0) {
            if (($busca[0]->user === $userName) && Hash::check($userPassword, $busca[0]->password)) {
                // $token = User::where()
                return response()->json(['status_code'=>'200','token' => $busca[0]->api_token, 'user_id' => $busca[0]->id]);
            } else {
                return response()->json(['status_code'=>'201']);
            }
        }
        return response()->json(['status_code'=>'202']);;
    }

    public function dologout(Request $request)
    {
        $token = $request->token;
        $busca = User::where('token', $token)->get();
        if (sizeof($busca) > 0) {
            if ($busca[0]->user === $token) {
                // $token = User::where()
                return response()->json(['status_code'=>'200','token' => $busca[0]->api_token, 'user_id' => $busca[0]->id]);
            } else {
                return response()->json(['status_code'=>'201']);
            }
        }
        return response()->json(['status_code'=>'202']);;
    }
}
