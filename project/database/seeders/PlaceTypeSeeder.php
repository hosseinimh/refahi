<?php

namespace Database\Seeders;

use App\Models\PlaceType;
use Illuminate\Database\Seeder;

class PlaceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (range(1, 10) as $index) {
            PlaceType::factory()->create(['type' => rand(1, 4)]);
        }
    }
}
