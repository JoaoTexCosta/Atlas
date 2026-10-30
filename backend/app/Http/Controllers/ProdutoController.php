<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProdutoController extends Controller
{
    public function index()
    {
        return response()->json(Produto::all());
    }

    public function store(Request $request)
    {
        $produto = Produto::create($request->validate($this->regras()));

        return response()->json($produto, 201);
    }

    public function show(Produto $produto)
    {
        return response()->json($produto);
    }

    public function update(Request $request, Produto $produto)
    {
        $produto->update($request->validate($this->regras($produto)));

        return response()->json($produto);
    }

    public function destroy(Produto $produto)
    {
        $produto->delete();

        return response()->noContent();
    }

    private function regras(?Produto $produto = null): array
    {
        return [
            'nome' => 'required|string|max:100',
            'descricao' => 'required|string',
            'marca' => 'required|string|max:100',
            'categoria' => 'required|string|max:100',
            'codigo' => ['required', 'string', 'max:20', Rule::unique('produtos', 'codigo')->ignore($produto?->id)],
            'preco' => 'required|numeric|min:0',
            'estoque' => 'required|integer|min:0',
            'data_validade' => 'required|date',
        ];
    }
}
