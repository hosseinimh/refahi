<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlaceEquipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_place_equipments';
    protected $fillable = [
        'place_id',
        'equipment_id',
        'assigned_at',
        'unassigned_at',
    ];
}
