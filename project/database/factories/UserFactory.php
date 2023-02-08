<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => fake()->unique()->safeEmail(),
            'password' => '123456789a',
            'name' => fake()->firstName(),
            'family' => fake()->lastName(),
            'national_code' => rand(1234567890, 9999999999),
            'personnel_no' => rand(1234567890, 9999999999),
            'mobile' => rand(11111111111, 99999999999),
            'email' => fake()->email(),
            'gender' => rand(0, 1),
            'is_active' => rand(0, 1),
            'remember_token' => Str::random(10),
        ];
    }
}
