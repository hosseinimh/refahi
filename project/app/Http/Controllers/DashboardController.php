<?php

namespace App\Http\Controllers;

use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function reviewUser(): HttpJsonResponse
    {
        $items = [];

        return $this->onItems($items);
    }

    public function reviewAdmin(): HttpJsonResponse
    {
        $items = ['users' => (new UserService())->countAll()];

        return $this->onItems($items);
    }
}
