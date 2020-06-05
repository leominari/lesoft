<?php

namespace App\Http\Controllers;

use App\models\Order;
use App\models\OrderProduct;
use App\models\UserToken;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request, $token)
    {
        // file_put_contents("debug1.txt", $token);
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid)
            return Order::all();
        else {
            return [];
        }
    }


    public function newOrder(Request $request)
    {

        $products = json_decode($request->products);
        $idSalesman = $request->idSalesman;
        $idClient = $request->idClient;
        $price = $request->price;
        $token = $request->token;
        // file_put_contents("debug1.txt", $request);
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {

            $NewOrder = new Order;
            $NewOrder->idColaborator = $idClient;
            $NewOrder->idSalesman = $idSalesman;
            $NewOrder->price = $price;

            if ($NewOrder->save()) {

                foreach ($products as $product) {
                    $NewOrderProduct = new OrderProduct;
                    $NewOrderProduct->idProduct = $product->id;
                    $NewOrderProduct->idOrder = $NewOrder->id;
                    $NewOrderProduct->productPrice = $product->price;
                    $NewOrderProduct->quantity = $product->quantity;
                    $NewOrderProduct->save();
                }
                return response()->json(['status_code' => 200, 'all_orders' => Order::all()]);
            } else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
