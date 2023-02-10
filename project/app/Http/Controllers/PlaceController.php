<?php

namespace App\Http\Controllers;

use App\Models\PlaceType;
use App\Models\City;
use App\Models\Place as Model;
use App\Packages\JsonResponse;
use App\Services\PlaceService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\Place\StorePlaceRequest as StoreRequest;
use App\Http\Requests\Place\UpdatePlaceRequest as UpdateRequest;

class PlaceController extends Controller
{
    public function __construct(JsonResponse $response, public PlaceService $service)
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

    public function store(PlaceType $placeType, City $city, StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($city->id, $placeType->id, $request->name, $request->land, $request->building, $request->tel, $request->address, $request->latitude, $request->longitude, $request->postal_code, $request->region_no, $request->water_bill_no, $request->electricity_bill_no, $request->gas_bill_no, $request->is_vila));
    }

    public function update(Model $model, PlaceType $placeType, City $city, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $city->id, $placeType->id, $request->name, $request->land, $request->building, $request->tel, $request->address, $request->latitude, $request->longitude, $request->postal_code, $request->region_no, $request->water_bill_no, $request->electricity_bill_no, $request->gas_bill_no, $request->is_vila));
    }
}
