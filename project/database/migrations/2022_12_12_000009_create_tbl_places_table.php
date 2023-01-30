<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_places', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedMediumInteger('land');
            $table->unsignedMediumInteger('building');
            $table->string('tel');
            $table->string('address');
            $table->string('latitude');
            $table->string('longitude');
            $table->string('postal_code');
            $table->unsignedMediumInteger('region_no');
            $table->string('water_bill_no');
            $table->string('electricity_bill_no');
            $table->string('gas_bill_no');
            $table->unsignedBigInteger('place_type_id');
            $table->unsignedBigInteger('city_id');
            $table->unsignedTinyInteger('is_vila');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('place_type_id')->references('id')->on('tbl_place_types');
            $table->foreign('city_id')->references('id')->on('tbl_cities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_places', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
