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
            'idColaborador' => DB::table('colaboradors')->insert([
                'nome' => 'Leonardo Minari',
                'tipo' => 'cliente-pj',
            ]),
            'remember_token' => Str::random(10),
        ]);
        // $this->call(UsersTableSeeder::class);
    }
}
