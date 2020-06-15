<?php

namespace App\Http\Controllers;

use App\models\Account;
use App\models\UserToken;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index(Request $request, $token)
    {
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            return response()->json(Account::all());
        } else {
            return response()->json([]);
        }
    }

    public function newAccount(Request $request)
    {
        $token = $request->token;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NewAccount = new Account;
            $NewAccount->name = $request->name;
            if ($NewAccount->save())
                return response()->json(['status_code' => 200, 'all_accounts' => Account::all()]);
            else {
                return response()->json(['status_code' => 201]);
            }
        } else {
            return response()->json(['status_code' => 202]);
        }
    }
}
