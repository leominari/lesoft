<?php

namespace App\Http\Controllers;

use App\models\Transaction;
use App\models\UserToken;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function getAccountTransactions($id, $token)
    {
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $Transaction = new Transaction;
            // file_put_contents("debug1.txt", $Transaction->getAllTransactions($id));
            return response()->json(['status_code' => 200, 'all_transactions' => $Transaction->getAllTransactions($id)]);
        } else {
            return [];
        }
    }

    public function addTransaction(Request $request)
    {
        $token = $request->token;
        $id = $request->id;
        $description = $request->description;
        $value = $request->value;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NewTransaction = new Transaction;
            $NewTransaction->idAccount = $id;
            $NewTransaction->description = $description;
            $NewTransaction->value = $value;
            if ($NewTransaction->save()) {
                return response()->json(['status_code' => 200, 'all_transactions' => $NewTransaction->getAllTransactions($id)]);
            } else {
                return response()->json(['status_code' => 500]);
            }
        } else {
            return response()->json(['status_code' => 500]);
        }
    }
}
