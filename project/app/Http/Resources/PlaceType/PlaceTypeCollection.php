<?php

namespace App\Http\Resources\PlaceType;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PlaceTypeCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => PlaceTypeResource::collection($this->collection)
        ];
    }
}
