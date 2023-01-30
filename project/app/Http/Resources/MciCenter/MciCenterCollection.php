<?php

namespace App\Http\Resources\MciCenter;

use Illuminate\Http\Resources\Json\ResourceCollection;

class MciCenterCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => MciCenterResource::collection($this->collection)
        ];
    }
}
