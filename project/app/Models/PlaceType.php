<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlaceType extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_place_types';
    protected $fillable = [
        'name',
        'type',
    ];
}
