<?php

namespace App\Http\Controllers;

use App\models\Order;
use App\models\OrderProduct;
use App\models\UserToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request, $token)
    {
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $Order = new Order;
            return $Order->getAllOrders();
        } else {
            return [];
        }
    }


    public function newOrder(Request $request)
    {

        $products = json_decode($request->products);
        $idSalesman = $request->idSalesman;
        $idClient = $request->idClient;
        $token = $request->token;
        $Auth = UserToken::where('token', $token)->first();
        if($request->idAccount){
            file_put_contents("debug1.txt", 'salve');
        }
        if ($Auth->valid) {

            $NewOrder = new Order;
            $NewOrder->idColaborator = $idClient;
            $NewOrder->idSalesman = $idSalesman;

            if ($NewOrder->save()) {

                foreach ($products as $product) {
                    $NewOrderProduct = new OrderProduct;
                    $NewOrderProduct->idProduct = $product->key;
                    $NewOrderProduct->idOrder = $NewOrder->id;
                    $NewOrderProduct->productPrice = $product->price;
                    $NewOrderProduct->quantity = $product->quantity;
                    $NewOrderProduct->save();
                }
                return response()->json(['status_code' => 200, 'all_orders' => $NewOrder->getAllOrders(), 'new_order'=> $NewOrder]);
            } else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
