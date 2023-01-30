<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentTypeController;
use App\Http\Controllers\MciCenterController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\UserController;
use App\Http\Resources\City\CityResource;
use App\Http\Resources\EquipmentType\EquipmentTypeResource;
use App\Http\Resources\MciCenter\MciCenterResource;
use App\Http\Resources\Province\ProvinceResource;
use App\Http\Resources\User\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Services\CityService;
use App\Services\EquipmentTypeService;
use App\Services\MciCenterService;
use App\Services\ProvinceService;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function ($app) {
            return new Helper();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(ProvinceController::class, function ($app) {
            return new ProvinceController(new JsonResponse(ProvinceResource::class), $app->make(ProvinceService::class));
        });

        $this->app->bind(CityController::class, function ($app) {
            return new CityController(new JsonResponse(CityResource::class), $app->make(CityService::class));
        });

        $this->app->bind(MciCenterController::class, function ($app) {
            return new MciCenterController(new JsonResponse(MciCenterResource::class), $app->make(MciCenterService::class));
        });

        $this->app->bind(EquipmentTypeController::class, function ($app) {
            return new EquipmentTypeController(new JsonResponse(EquipmentTypeResource::class), $app->make(EquipmentTypeService::class));
        });
    }
}
