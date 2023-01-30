<?php

namespace App\Http\Resources\PlaceEquipment;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PlaceEquipmentCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => PlaceEquipmentResource::collection($this->collection)
        ];
    }
}
