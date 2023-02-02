<?php

namespace App\Http\Resources\MciCenter;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class MciCenterResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => Helper::localeNumbers($this->name) ?? '',
            'tel' => Helper::localeNumbers($this->tel) ?? '',
            'address' => Helper::localeNumbers($this->address) ?? '',
            'latitude' => intval($this->latitude) ?? 0,
            'longitude' => intval($this->longitude) ?? 0,
            'cityId' => intval($this->city_id),
            'provinceName' => Helper::localeNumbers($this->province_name) ?? '',
            'cityName' => Helper::localeNumbers($this->city_name) ?? '',
        ];
    }
}
