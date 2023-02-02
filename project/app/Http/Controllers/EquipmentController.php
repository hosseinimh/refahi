<?php

namespace App\Http\Controllers;

use App\Models\EquipmentType;
use App\Models\Equipment as Model;
use App\Packages\JsonResponse;
use App\Services\EquipmentService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\Equipment\StoreEquipmentRequest as StoreRequest;
use App\Http\Requests\Equipment\UpdateEquipmentRequest as UpdateRequest;

class EquipmentController extends Controller
{
    public function __construct(JsonResponse $response, private EquipmentService $service)
    {
        parent::__construct($response);
    }

    public function index(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->countAll());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function store(EquipmentType $equipmentType, StoreRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($equipmentType->id, $request->name));
    }

    public function update(Model $model, EquipmentType $equipmentType, UpdateRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $equipmentType->id, $request->name));
    }
}
