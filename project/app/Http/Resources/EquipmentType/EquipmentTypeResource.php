<?php

namespace App\Http\Resources\EquipmentType;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentTypeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => Helper::localeNumbers($this->name) ?? '',
            'type' => intval($this->type),
            'typeText' => $this->getTypeText(intval($this->type)),
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
