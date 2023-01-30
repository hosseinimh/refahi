<?php

namespace App\Http\Resources\Place;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PlaceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => PlaceResource::collection($this->collection)
        ];
    }
}
