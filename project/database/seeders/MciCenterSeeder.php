<?php

namespace Database\Seeders;

use App\Models\MciCenter;
use Illuminate\Database\Seeder;

class MciCenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 50) as $index) {
            MciCenter::factory(rand(1, 3))->create(['city_id' => rand(1, 350)]);
        }
    }
}
