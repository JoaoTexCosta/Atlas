<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json([
    'aplicacao' => 'API de Produtos',
    'mensagem' => 'Utilize /api/produto para acessar o catálogo.'
]));
