<?php

use App\Constants\Role;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('name');
            $table->string('family');
            $table->string('national_code');
            $table->string('personnel_no');
            $table->string('mobile');
            $table->string('email');
            $table->unsignedBigInteger('city_id');
            $table->unsignedTinyInteger('role')->default(Role::USER);
            $table->unsignedTinyInteger('gender')->default(0);
            $table->unsignedTinyInteger('is_active')->default(0);
            $table->rememberToken();
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
        Schema::table('tbl_users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
