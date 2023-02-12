<?php

use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipmentTypeController;
use App\Http\Controllers\MciCenterController;
use App\Http\Controllers\PlaceTypeController;
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
    Route::post('users/show/cities/{model}', [UserController::class, 'showAdministratorWithAllCities']);
    Route::post('users/show/{model}', [UserController::class, 'showAdministrator']);
    Route::post('users/store/{city}', [UserController::class, 'storeUser']);
    Route::post('users/store', [UserController::class, 'storeAdministrator']);
    Route::post('users/update/{model}', [UserController::class, 'updateAdministrator']);
    Route::post('users/update/{model}/{city}', [UserController::class, 'updateUser']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('provinces/show/{model}', [ProvinceController::class, 'show']);
    Route::post('provinces', [ProvinceController::class, 'index']);

    Route::post('cities/show/{model}', [CityController::class, 'show']);
    Route::post('cities/all', [CityController::class, 'indexAll']);
    Route::post('cities/{province}', [CityController::class, 'index']);

    Route::post('mci_centers/show/{model}', [MciCenterController::class, 'show']);
    Route::post('mci_centers/{city}', [MciCenterController::class, 'index']);
    Route::post('mci_centers/store/{city}', [MciCenterController::class, 'store']);
    Route::post('mci_centers/update/{model}', [MciCenterController::class, 'update']);

    Route::post('equipment_types/show/{model}', [EquipmentTypeController::class, 'show']);
    Route::post('equipment_types', [EquipmentTypeController::class, 'index']);
    Route::post('equipment_types/all', [EquipmentTypeController::class, 'getAll']);
    Route::post('equipment_types/store', [EquipmentTypeController::class, 'store']);
    Route::post('equipment_types/update/{model}', [EquipmentTypeController::class, 'update']);

    Route::post('equipments/show/{model}', [EquipmentController::class, 'show']);
    Route::post('equipments', [EquipmentController::class, 'index']);
    Route::post('equipments/store/{equipmentType}', [EquipmentController::class, 'store']);
    Route::post('equipments/update/{model}/{equipmentType}', [EquipmentController::class, 'update']);

    Route::post('place_types/show/{model}', [PlaceTypeController::class, 'show']);
    Route::post('place_types', [PlaceTypeController::class, 'index']);
    Route::post('place_types/all', [PlaceTypeController::class, 'getAll']);
    Route::post('place_types/store', [PlaceTypeController::class, 'store']);
    Route::post('place_types/update/{model}', [PlaceTypeController::class, 'update']);
});

// 'user' type users
Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
    Route::post('dashboard/review_user', [DashboardController::class, 'reviewUser']);

    Route::post('users/show', [UserController::class, 'showUser']);
});

// 'user|administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
});
