<?php

namespace App\Http\Controllers;

use App\models\Pedido;
use App\models\PedidoProduto;
use App\models\UserToken;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index(Request $request, $token)
    {
        // file_put_contents("debug1.txt", $token);
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid)
            return Pedido::all();
        else {
            return [];
        }
    }


    public function newProduto(Request $request)
    {
        $products = json_decode($request->products);
        $idSalesman = $request->idSalesman;
        $idClient = $request->idClient;
        $token = $request->token;
        // file_put_contents("debug1.txt", $pedido);
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {

            $NovoPedido = new Pedido;
            $NovoPedido->idColaborador = $idClient;
            $NovoPedido->idVendedor = $idSalesman;
            $NovoPedido->valor = 0.00;

            if ($NovoPedido->save()) {

                foreach ($products as $product) {
                    $NovoPedidoProduto = new PedidoProduto;
                    $NovoPedidoProduto->idProduto = $product->id;
                    $NovoPedidoProduto->idPedido = $NovoPedido->id;
                    $NovoPedidoProduto->precoProduto = $product->price;
                    $NovoPedidoProduto->quantidade = $product->quantity;
                    $NovoPedidoProduto->save();
                }
                return response()->json(['status_code' => '200', 'allorders' => Pedido::all()]);
            } else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
