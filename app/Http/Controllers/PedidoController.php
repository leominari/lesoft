<?php

namespace App\Http\Controllers;

use App\models\Pedido;
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
        $token = $request->token;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NovoPedido = new Pedido;
            $NovoPedido->ProdutoPedido($request->produtos);
            $NovoPedido->idColaborador = $request->idColaborador;
            $NovoPedido->idVendedor = $request->idVendedor;
            $NovoPedido->valor = $request->valor;
            if ($NovoPedido->save())
                return response()->json(['status_code' => '200']);
            else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
