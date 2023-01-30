<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MciCenterController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/logout', [UserController::class, 'logout']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('dashboard/review_admin', [DashboardController::class, 'reviewAdmin']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{user}', [UserController::class, 'showAdmin']);
    Route::post('users/store/{unit}', [UserController::class, 'store']);
    Route::post('users/store_admin', [UserController::class, 'storeAdmin']);
    Route::post('users/update/{user}', [UserController::class, 'update']);
    Route::post('users/change_password/{user}', [UserController::class, 'changePassword']);

    Route::post('provinces/show/{model}', [ProvinceController::class, 'show']);
    Route::post('provinces', [ProvinceController::class, 'index']);

    Route::post('cities/show/{model}', [CityController::class, 'show']);
    Route::post('cities/{province}', [CityController::class, 'index']);

    Route::post('mci_centers/show/{model}', [MciCenterController::class, 'show']);
    Route::post('mci_centers/{city}', [MciCenterController::class, 'index']);
});


// 'user' type users
Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
    Route::post('dashboard/review_user', [DashboardController::class, 'reviewUser']);

    Route::post('users/show', [UserController::class, 'showUser']);
});

// 'user|administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
});
