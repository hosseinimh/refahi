<?php

namespace App\Services;

use App\Models\Place as Model;

class PlaceService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_place_type', 'tbl_places.place_type_id', '=', 'tbl_place_type.id')->where('tbl_places.id', $id)->select('tbl_places.*', 'tbl_place_type.name AS equipment_name', 'tbl_place_type.type AS equipment_type')->first();
    }

    public function getPaginate(int $cityId, int $page, int $pageItems): mixed
    {
        return Model::join('tbl_place_type', 'tbl_places.place_type_id', '=', 'tbl_place_type.id')->where('city_id', $cityId)->select('tbl_places.*', 'tbl_place_type.name AS equipment_name', 'tbl_place_type.type AS equipment_type')->orderBy('place_type_id', 'ASC')->orderBy('tbl_places.name', 'ASC')->orderBy('tbl_places.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $cityId, int $placeTypeId, string $name, int $land, int $building, string $tel, string $address, float|null $latitude, float|null $longitude, int $postalCode, int $regionNo, string $waterBillNo, string $electricityBillNo, string $gasBillNo, int $isVila): mixed
    {
        $isVila = $isVila > 0 ? 0 : 1;
        $data = [
            'city_id' => $cityId,
            'place_type_id' => $placeTypeId,
            'name' => $name,
            'land' => $land,
            'building' => $building,
            'tel' => $tel ?? '',
            'address' => $address ?? '',
            'latitude' => $latitude ?? 0,
            'longitude' => $longitude ?? 0,
            'postal_code' => $postalCode ?? 0,
            'region_no' => $regionNo,
            'water_bill_no' => $waterBillNo,
            'electricity_bill_no' => $electricityBillNo,
            'gas_bill_no' => $gasBillNo,
            'is_vila' => $isVila,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, int $cityId, int $placeTypeId, string $name, int $land, int $building, string $tel, string $address, float|null $latitude, float|null $longitude, int $postalCode, int $regionNo, string $waterBillNo, string $electricityBillNo, string $gasBillNo, int $isVila): bool
    {
        $isVila = $isVila > 0 ? 0 : 1;
        $data = [
            'city_id' => $cityId,
            'place_type_id' => $placeTypeId,
            'name' => $name,
            'land' => $land,
            'building' => $building,
            'tel' => $tel ?? '',
            'address' => $address ?? '',
            'latitude' => $latitude ?? 0,
            'longitude' => $longitude ?? 0,
            'postal_code' => $postalCode ?? 0,
            'region_no' => $regionNo,
            'water_bill_no' => $waterBillNo,
            'electricity_bill_no' => $electricityBillNo,
            'gas_bill_no' => $gasBillNo,
            'is_vila' => $isVila,
        ];

        return $model->update($data);
    }

    public function count(int $cityId): int
    {
        return Model::join('tbl_place_type', 'tbl_places.place_type_id', '=', 'tbl_place_type.id')->where('city_id', $cityId)->count();
    }
}
