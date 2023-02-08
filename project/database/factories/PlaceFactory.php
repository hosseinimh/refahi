<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PlaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => fake()->title(),
            'land' => rand(100, 1000),
            'building' => rand(100, 500),
            'tel' => rand(11111111, 99999999),
            'address' => fake()->address(),
            'latitude' => rand(111, 999999999),
            'longitude' => rand(111, 999999999),
            'postal_code' => rand(1111111111, 9999999999),
            'region_no' => rand(1, 9),
            'water_bill_no' => rand(11111, 9999999999),
            'electricity_bill_no' => rand(11111, 9999999999),
            'gas_bill_no' => rand(11111, 9999999999),
            'place_type_id' => rand(1, 10),
            'city_id' => rand(1, 300),
            'is_vila' => rand(0, 1),
        ];
    }
}
