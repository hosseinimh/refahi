<?php

namespace App\Http\Resources\PlaceEquipment;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceEquipmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'placeId' => intval($this->place_id),
            'equipmentId' => intval($this->equipment_id),
            'assignedAt' => Helper::faDate($this->assigned_at),
            'unassignedAt' => Helper::faDate($this->unassigned_at)
        ];
    }
}
