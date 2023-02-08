<?php

namespace App\Http\Resources\PlaceType;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceTypeResource extends JsonResource
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
        $text = __('place_type.type_undefined');

        if ($type >= 1 && $type <= 4) {
            $text = __('place_type.type_' . $type);
        }

        return $text;
    }
}
