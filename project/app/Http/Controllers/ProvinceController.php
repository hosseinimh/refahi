<?php

namespace App\Http\Controllers;

use App\Models\Province as Model;
use App\Packages\JsonResponse;
use App\Services\ProvinceService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function __construct(JsonResponse $response, private ProvinceService $service)
    {
        parent::__construct($response);
    }

    public function index(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
