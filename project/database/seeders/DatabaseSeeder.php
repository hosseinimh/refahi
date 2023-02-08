<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            ProvinceSeeder::class,
            CitySeeder::class,
            MciCenterSeeder::class,
            EquipmentTypeSeeder::class,
            EquipmentSeeder::class,
            PlaceTypeSeeder::class,
        ]);
    }
}
