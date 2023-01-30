<?php

namespace App\Http\Controllers;

use App\Packages\JsonResponse;
use App\Services\EquipmentTypeService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function __construct(JsonResponse $response, private EquipmentTypeService $service)
    {
        parent::__construct($response);
    }

    public function index(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi), $this->service->countAll());
    }
}
