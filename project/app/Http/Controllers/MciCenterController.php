<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\MciCenter as Model;
use App\Packages\JsonResponse as PackagesJsonResponse;
use App\Services\MciCenterService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class MciCenterController extends Controller
{
    public function __construct(PackagesJsonResponse $response, private MciCenterService $service)
    {
        parent::__construct($response);
    }

    public function index(City $city, Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($city->id, $request->_pn, $request->_pi), $this->service->countAll());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
