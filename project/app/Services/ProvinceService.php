<?php

namespace App\Services;

use App\Models\Province as Model;

class ProvinceService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }
}
