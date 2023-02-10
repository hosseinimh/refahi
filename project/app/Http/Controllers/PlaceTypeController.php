<?php

namespace App\Http\Controllers;

use App\Packages\JsonResponse;
use App\Services\PlaceTypeService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use App\Models\PlaceType as Model;
use App\Http\Requests\PlaceType\StorePlaceTypeRequest as StoreRequest;
use App\Http\Requests\PlaceType\UpdatePlaceTypeRequest as UpdateRequest;

class PlaceTypeController extends Controller
{
    public function __construct(JsonResponse $response, public PlaceTypeService $service)
    {
        parent::__construct($response);
    }

    public function index(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->countAll());
    }

    public function getAll(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll(intval($request->type)));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function store(StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name, $request->type));
    }

    public function update(Model $model, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->type));
    }
}
