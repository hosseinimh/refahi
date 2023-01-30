<?php

namespace App\Http\Resources\Equipment;

use Illuminate\Http\Resources\Json\ResourceCollection;

class EquipmentCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => EquipmentResource::collection($this->collection)
        ];
    }
}
