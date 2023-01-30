<?php

namespace App\Http\Resources\EquipmentType;

use Illuminate\Http\Resources\Json\ResourceCollection;

class EquipmentTypeCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => EquipmentTypeResource::collection($this->collection)
        ];
    }
}
