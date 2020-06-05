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

Route::group(['prefix' => 'colaborator'], function () {
    Route::get('/getall{token}', ['uses' => 'ColaboratorController@index']);
    Route::post('/new', ['uses' => 'ColaboratorController@newColaborator']);
});


Route::group(['prefix' => 'products'], function () {
    Route::get('/getall{token}', ['uses' => 'ProductController@index']);
    Route::post('/new', ['uses' => 'ProductController@newProduct']);
});


Route::group(['prefix' => 'orders'], function () {
    Route::get('/getall{token}', ['uses' => 'OrderController@index']);
    Route::post('/new', ['uses' => 'OrderController@newOrder']);
});
