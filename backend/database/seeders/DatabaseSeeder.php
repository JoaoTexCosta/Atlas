<?php

namespace Database\Seeders;

use App\Models\Produto;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $produtos = [
            ['nome' => 'Caderno', 'descricao' => 'Caderno universitário', 'marca' => 'Marca A', 'categoria' => 'Papelaria', 'codigo' => 'CAD001', 'preco' => 24.90, 'estoque' => 30, 'data_validade' => '2030-12-31'],
            ['nome' => 'Caneta', 'descricao' => 'Caneta esferográfica azul', 'marca' => 'Marca B', 'categoria' => 'Papelaria', 'codigo' => 'CAN001', 'preco' => 3.50, 'estoque' => 100, 'data_validade' => '2030-12-31'],
        ];

        foreach ($produtos as $produto) {
            Produto::firstOrCreate(['codigo' => $produto['codigo']], $produto);
        }
    }
}
