<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // factory(User::class, 50)->create();


        DB::table('users')->insert([
            'user' => 'leominari',
            'password' => bcrypt('minari01'),
            'idColaborator' => DB::table('colaborators')->insert([
                'name' => 'Leonardo Minari',
                'type' => 'cliente-pj',
            ]),
            'remember_token' => Str::random(10),
        ]);
        DB::table('products')->insert([
            'name' => 'Café Balaio',
            'price' => 4.50,
            'unity' => 'KG'
        ]);

        DB::table('products')->insert([
            'name' => 'Café Lenhador',
            'price' => 5.50,
            'unity' => 'KG'
        ]);


        DB::table('accounts')->insert([
            'name' => 'Caixa',
        ]);

        DB::table('colaborators')->insert([
            'name' => 'Renato Minari',
            'type' => 'cliente-pj',
        ]);


        // $this->call(UsersTableSeeder::class);
    }
}
