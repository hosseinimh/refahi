<?php

namespace App\Http\Resources\Place;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => Helper::localeNumbers($this->name) ?? '',
            'land' => intval($this->land),
            'building' => intval($this->building),
            'tel' => Helper::localeNumbers($this->tel) ?? '',
            'address' => Helper::localeNumbers($this->address) ?? '',
            'latitude' => Helper::localeNumbers($this->latitude) ?? '',
            'longitude' => Helper::localeNumbers($this->longitude) ?? '',
            'postalCode' => Helper::localeNumbers($this->postal_code) ?? '',
            'regionNo' => Helper::localeNumbers($this->region_no) ?? '',
            'water_bill_no' => Helper::localeNumbers($this->water_bill_no) ?? '',
            'electricity_bill_no' => Helper::localeNumbers($this->electricity_bill_no) ?? '',
            'gas_bill_no' => Helper::localeNumbers($this->gas_bill_no) ?? '',
            'placeTypeId' => intval($this->place_type_id),
            'cityId' => intval($this->city_id),
            'isVila' => intval($this->is_vila),
        ];
    }
}
