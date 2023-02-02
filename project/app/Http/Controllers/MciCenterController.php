<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\MciCenter as Model;
use App\Packages\JsonResponse as PackagesJsonResponse;
use App\Services\MciCenterService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\MciCenter\StoreMciCenterRequest as StoreRequest;
use App\Http\Requests\MciCenter\UpdateMciCenterRequest as UpdateRequest;

class MciCenterController extends Controller
{
    public function __construct(PackagesJsonResponse $response, private MciCenterService $service)
    {
        parent::__construct($response);
    }

    public function index(City $city, Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($city->id, $request->_pn, $request->_pi), $this->service->count($city->id));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function store(City $city, StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($city->id, $request->name, $request->tel, $request->address, $request->longitude, $request->latitude));
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->tel, $request->address, $request->longitude, $request->latitude));
    }
}
