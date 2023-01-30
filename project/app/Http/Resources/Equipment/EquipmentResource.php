<?php

namespace App\Http\Resources\Equipment;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => Helper::localeNumbers($this->name) ?? '',
            'equipmentTypeId' => intval($this->equipment_type_id),
        ];
    }
}
