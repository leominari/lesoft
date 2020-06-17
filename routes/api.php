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


Route::group(['prefix' => 'product'], function () {
    Route::get('/getall{token}', ['uses' => 'ProductController@index']);
    Route::post('/new', ['uses' => 'ProductController@newProduct']);
});


Route::group(['prefix' => 'order'], function () {
    Route::get('/getall{token}', ['uses' => 'OrderController@index']);
    Route::post('/new', ['uses' => 'OrderController@newOrder']);
});

Route::group(['prefix' => 'account'], function () {
    Route::get('/getall{token}', ['uses' => 'AccountController@index']);
    Route::post('/newacc', ['uses' => 'AccountController@newAccount']);
});


Route::group(['prefix' => 'transaction'], function () {
    Route::get('/get/{id}/{token}' , ['uses' => 'TransactionController@getAccountTransactions']);
    Route::post('/add', ['uses' => 'TransactionController@addTransaction']);
    // Route::post('/remove', ['uses' => 'TransactionController@deleteTransaction']);
});

Route::group(['prefix' => 'bill2receive'], function () {
    // Route::get('/get/{id}/{token}' , ['uses' => 'TransactionController@getAccountTransactions']);
    Route::post('/new', ['uses' => 'Bill2Controller@newBill2Receive']);
    // Route::post('/remove', ['uses' => 'TransactionController@deleteTransaction']);
});
