<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPlaceEquipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_place_equipments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('city_id');
            $table->unsignedBigInteger('equipment_id');
            $table->dateTime('assigned_date');
            $table->dateTime('unassigned_date');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('city_id')->references('id')->on('tbl_cities');
            $table->foreign('equipment_id')->references('id')->on('tbl_equipments');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_place_equipments', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
