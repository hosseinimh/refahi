<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblEquipmentTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_equipment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedTinyInteger('type');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_equipment_types', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
