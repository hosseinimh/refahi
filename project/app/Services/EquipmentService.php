<?php

namespace App\Services;

use App\Models\Equipment as Model;

class EquipmentService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->where('province_id', $provinceId)->orderBy('tbl_cities.name', 'ASC')->orderBy('tbl_cities.id', 'ASC')->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
