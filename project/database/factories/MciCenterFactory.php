<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MciCenterFactory extends Factory
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
            'tel' => rand(123456789, 999999999),
            'address' => fake()->text(),
            'latitude' => rand(123456789, 999999999),
            'longitude' => rand(123456789, 999999999),
        ];
    }
}
