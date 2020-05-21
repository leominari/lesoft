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

Route::post('/login', 'LoginController@dologin')->name('login');
Route::post('/logout', 'LoginController@dologout')->name('logout');

Route::get('/users', 'LoginController@index');

// Route::get('/dologout', 'home\HomeController@dologout')->name('logout');

Route::group(['prefix' => 'colaborador'], function () {
    Route::get('/todos{token}', ['uses' => 'ColaboradorController@index']);
    Route::post('/new', ['uses' => 'ColaboradorController@newColaborador']);
});


Route::group(['prefix' => 'produtos'], function () {
    Route::get('/todos{token}', ['uses' => 'ProdutoController@index']);
    Route::post('/new', ['uses' => 'ProdutoController@newProduto']);
});

Route::group(['prefix' => 'comercial'], function () {
    Route::get('/', ['as' => 'com.home', 'uses' => 'ComercialController@index']);
});


Route::group(['prefix' => 'pedidos'], function () {
    Route::get('/todos{token}', ['uses' => 'PedidoController@index']);
    Route::post('/new', ['uses' => 'PedidoController@newProduto']);
});
