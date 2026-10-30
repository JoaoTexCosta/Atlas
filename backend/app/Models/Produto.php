<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'descricao', 'marca', 'categoria',
        'codigo', 'preco', 'estoque', 'data_validade'
    ];

    protected $casts = [
        'preco' => 'decimal:2',
        'estoque' => 'integer',
        'data_validade' => 'date'
    ];
}
