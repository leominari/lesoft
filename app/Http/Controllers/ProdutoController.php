<?php

namespace App\Http\Controllers;

use App\models\Produto;
use App\models\UserToken;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index(Request $request, $token)
    {
        // file_put_contents("debug1.txt", $token);
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid)
            return Produto::all();
        else {
            return [];
        }
    }

    public function newProduto(Request $request)
    {
        $token = $request->token;
        $Auth = UserToken::where('token', $token)->first();
        if ($Auth->valid) {
            $NovoProduto = new Produto;
            $NovoProduto->nome = $request->nome;
            $NovoProduto->preco = $request->preco;
            $NovoProduto->unidade = $request->unidade;
            if ($NovoProduto->save())
                return response()->json(['status_code' => '200']);
            else {
                return response()->json(['status_code' => '201']);
            }
        } else {
            return response()->json(['status_code' => '202']);
        }
    }
}
