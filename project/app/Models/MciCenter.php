<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MciCenter extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_mci_centers';
    protected $fillable = [
        'name',
        'tel',
        'address',
        'latitude',
        'longitude',
        'city_id',
    ];
}
