<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PedidoProduto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtopedido', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('idProduto');
            $table->bigInteger('idPedido');
            $table->double('precoProduto');
            $table->bigInteger('quantidade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtopedido');
    }
}
