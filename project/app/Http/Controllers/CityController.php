<?php

namespace App\Http\Controllers;

use App\Models\Province;
use App\Models\City as Model;
use App\Packages\JsonResponse as PackagesJsonResponse;
use App\Services\CityService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function __construct(PackagesJsonResponse $response, private CityService $service)
    {
        parent::__construct($response);
    }

    public function index(Province $province, Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll($province->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
