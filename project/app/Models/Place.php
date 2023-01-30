<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Place extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_places';
    protected $fillable = [
        'name',
        'city_id',
        'land',
        'building',
        'tel',
        'address',
        'latitude',
        'longitude',
        'postal_code',
        'region_no',
        'water_bill_no',
        'electricity_bill_no',
        'gas_bill_no',
        'place_type_id',
        'city_id',
        'is_vila',
    ];
}
