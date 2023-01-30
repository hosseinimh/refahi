<?php

namespace App\Services;

use App\Models\MciCenter as Model;

class MciCenterService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_cities', 'tbl_mci_centers.city_id', '=', 'tbl_cities.id')->join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->where('tbl_mci_centers.id', $id)->select('tbl_mci_centers.*', 'tbl_provinces.name AS province_name', 'tbl_cities.name AS city_name')->first();
    }

    public function getPaginate(int $cityId, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_cities', 'tbl_mci_centers.city_id', '=', 'tbl_cities.id')->join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->where('tbl_mci_centers.city_id', $cityId)->select('tbl_mci_centers.*', 'tbl_provinces.name AS province_name', 'tbl_cities.name AS city_name')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
