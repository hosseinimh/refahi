<?php

namespace App\Http\Controllers;

use App\Models\Province;
use App\Models\City as Model;
use App\Packages\JsonResponse as PackagesJsonResponse;
use App\Services\CityService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CityController extends Controller
{
    public function __construct(PackagesJsonResponse $response, public CityService $service)
    {
        parent::__construct($response);
    }

    public function index(Province $province): HttpJsonResponse
    {
        $provinceController = app()->make(ProvinceController::class);
        $province = $provinceController->resource($provinceController->service->get($province->id));

        return $this->onItems(['items' => $this->service->getAll($province->id), 'province' => $province]);
    }

    public function indexAll(): HttpJsonResponse
    {
        $provinceController = app()->make(ProvinceController::class);
        $provinces = $provinceController->collection($provinceController->service->getAll());

        return $this->onItems(['items' => $this->collection($this->service->getAll()), 'provinces' => $provinces]);
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
