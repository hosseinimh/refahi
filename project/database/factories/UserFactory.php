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
            'remember_token' => Str::random(10),
        ];
    }
}
