<?php

namespace App\Http\Controllers;

use App\models\Bill2;
use App\models\UserToken;
use Illuminate\Http\Request;

class Bill2Controller extends Controller
{

    public function getAll($token){
        $Auth = UserToken::where('token', $token)->first();
        if($Auth->valid){
            return response()->json(['status_code' => 200, 'all_bill2' => Bill2::all()]);
        }
        return response()->json(['status_code' => 201, 'all_bill2' => []]);
    }

    public function getById($id, $token){
        return 'foi koroi';
    }

    public function newBill2(Request $request){
        $token = $request->token;
        $date = $request->date;
        $description = $request->description;
        $value = $request->value;
        $type= $request->type;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NewBill2 = new Bill2;
            $NewBill2->value = $value;
            $NewBill2->description = $description;
            $NewBill2->date = $date;
            $NewBill2->type = $type;
            $NewBill2->save();
            if ($NewBill2->save())
                return response()->json(['status_code' => 200, 'all_bill2' => Bill2::all()]);
            else {
                return response()->json(['status_code' => 201]);
            }

            return $NewBill2;
        }
        else{
            return 'error';
        }

    }
}
