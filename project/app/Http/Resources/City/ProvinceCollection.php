<?php

namespace App\Http\Resources\City;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CityCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => CityResource::collection($this->collection)
        ];
    }
}
