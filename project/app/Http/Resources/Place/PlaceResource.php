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
            'latitude' => floatval($this->latitude) ?? 0,
            'longitude' => floatval($this->longitude) ?? 0,
            'postalCode' => intval($this->postal_code) ?? 0,
            'regionNo' => intval($this->region_no),
            'water_bill_no' => Helper::localeNumbers($this->water_bill_no) ?? '',
            'electricity_bill_no' => Helper::localeNumbers($this->electricity_bill_no) ?? '',
            'gas_bill_no' => Helper::localeNumbers($this->gas_bill_no) ?? '',
            'placeTypeId' => intval($this->place_type_id),
            'placeTypeName' => Helper::localeNumbers($this->place_type_name) ?? '',
            'placeType' => intval($this->place_type),
            'placeTypeText' => $this->getTypeText(intval($this->place_type)),
            'cityId' => intval($this->city_id),
            'isVila' => $this->is_vila > 0 ? true : false,
        ];
    }

    private function getTypeText(int $type)
    {
        $text = __('place_type.type_undefined');

        if ($type >= 1 && $type <= 4) {
            $text = __('place_type.type_' . $type);
        }

        return $text;
    }
}
