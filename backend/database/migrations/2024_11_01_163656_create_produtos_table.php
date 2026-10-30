<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->text('descricao');
            $table->string('marca', 100);
            $table->string('categoria', 100);
            $table->string('codigo', 20)->unique();
            $table->decimal('preco', 12, 2);
            $table->unsignedInteger('estoque');
            $table->date('data_validade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};
