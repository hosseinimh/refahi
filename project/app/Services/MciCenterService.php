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

    public function store(int $cityId, string $name, string $tel, string|null $address, int|null $longitude, int|null $latitude): mixed
    {
        $data = [
            'city_id' => $cityId,
            'name' => $name,
            'tel' => $tel,
            'address' => $address ?? '',
            'longitude' => $longitude ?? 0,
            'latitude' => $latitude ?? 0,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, string $tel, string|null $address, int|null $longitude, int|null $latitude): bool
    {
        $data = [
            'name' => $name,
            'tel' => $tel,
            'address' => $address ?? '',
            'longitude' => $longitude ?? 0,
            'latitude' => $latitude ?? 0,
        ];

        return $model->update($data);
    }

    public function count(int $cityId): int
    {
        return Model::join('tbl_cities', 'tbl_mci_centers.city_id', '=', 'tbl_cities.id')->join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id')->where('tbl_mci_centers.city_id', $cityId)->count();
    }
}
