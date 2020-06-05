<?php

namespace App\Http\Controllers;

use App\models\Product;
use App\models\UserToken;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request, $token)
    {
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid)
        return Product::all();
        else {
            return [];
        }
    }
    
    public function newProduct(Request $request)
    {
        file_put_contents("debug1.txt", $request);
        $token = $request->token;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NewProduct = new Product;
            $NewProduct->name = $request->name;
            $NewProduct->price = $request->price;
            $NewProduct->unity = $request->unity;
            if ($NewProduct->save())
                return response()->json(['status_code' => 200, 'all_products' => Product::all()]);
            else {
                return response()->json(['status_code' => 201]);
            }
        } else {
            return response()->json(['status_code' => 202]);
        }
    }
}
