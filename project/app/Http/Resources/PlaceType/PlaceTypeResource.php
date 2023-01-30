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
            'parentId' => intval($this->parent_id),
        ];
    }
}
