<?php

namespace App\Http\Resources\User;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => Helper::localeNumbers($this->name) ?? '',
            'family' => Helper::localeNumbers($this->family) ?? '',
            'nationalCode' => $this->national_code ?? '',
            'personnelNo' => $this->personnel_no ?? '',
            'role' => intval($this->role),
            'cityId' => intval($this->city_id),
            'cityName' => $this->city_name ?? '',
            'provinceId' => intval($this->province_id),
            'provinceName' => $this->province_name ?? '',
            'email' => $this->email,
            'mobile' => $this->mobile ?? '',
            'gender' => intval($this->gender),
            'isActive' => intval($this->is_active),
        ];
    }
}
