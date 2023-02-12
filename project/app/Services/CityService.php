<?php

namespace App\Services;

use App\Models\City as Model;

class CityService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->where('tbl_cities.id', $id)->select('tbl_cities.*', 'tbl_provinces.name AS province_name')->first();
    }

    public function getAll(int $provinceId = 0): mixed
    {
        if ($provinceId === 0) {
            return Model::join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->select('tbl_cities.*', 'tbl_provinces.name AS province_name')->orderBy('tbl_cities.name', 'ASC')->orderBy('tbl_cities.id', 'ASC')->get();
        }

        return Model::join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->where('province_id', $provinceId)->select('tbl_cities.*', 'tbl_provinces.name AS province_name')->orderBy('tbl_cities.name', 'ASC')->orderBy('tbl_cities.id', 'ASC')->get();
    }
}
