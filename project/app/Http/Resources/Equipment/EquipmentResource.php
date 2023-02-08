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
            'assetNo' => $this->asset_no ?? '',
            'equipmentTypeId' => intval($this->equipment_type_id),
            'equipmentTypeName' => Helper::localeNumbers($this->equipment_type_name) ?? '',
            'equipmentType' => intval($this->equipment_type),
            'equipmentTypeText' => $this->getTypeText(intval($this->equipment_type)),
        ];
    }

    private function getTypeText(int $type)
    {
        $text = __('equipment_type.type_undefined');

        if ($type >= 1 && $type <= 8) {
            $text = __('equipment_type.type_' . $type);
        }

        return $text;
    }
}
