<?php

namespace App\Http\Resources\Province;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProvinceCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => ProvinceResource::collection($this->collection)
        ];
    }
}
