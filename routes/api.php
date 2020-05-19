<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'login\LoginController@dologin')->name('login');
Route::post('/logout', 'login\LoginController@dologout')->name('logout');

Route::get('/users', 'login\LoginController@index');

// Route::get('/dologout', 'home\HomeController@dologout')->name('logout');

Route::group(['prefix' => 'colaborador'], function () {
    Route::get('/todos{token}', ['uses' => 'colaborador\ColaboradorController@index']);
    Route::post('/new', ['as' => 'colab.new', 'uses' => 'colaborador\ColaboradorController@newColaborador']);
});

Route::group(['prefix' => 'comercial'], function () {
    Route::get('/', ['as' => 'com.home', 'uses' => 'comercial\ComercialController@index']);
});


Route::group(['prefix' => 'produtos'], function () {
    Route::post('/new', ['as' => 'prod.new', 'uses' => 'produtos\ProdutosController@newProduto']);
});


Route::group(['prefix' => 'pedidos'], function () {
    Route::post('/new', ['as' => 'p.new', 'uses' => 'pedidos\PedidosController@newPedido']);
});