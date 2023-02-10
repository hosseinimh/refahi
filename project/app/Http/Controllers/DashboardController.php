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
        return $this->onItems([]);
    }

    public function reviewAdmin(): HttpJsonResponse
    {
        $userService = new UserService();

        return $this->onItems(['usersCount' => $userService->countAll()]);
    }
}
