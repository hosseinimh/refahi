<?php

namespace App\Http\Controllers;

use App\Constants\ErrorCode;
use App\Constants\Role;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\IndexUsersRequest;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\City;
use App\Models\User as Model;
use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class UserController extends Controller
{
    public function __construct(JsonResponse $response, private UserService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexUsersRequest $request): HttpJsonResponse
    {
        $cityId = intval($request->city_id) ?: null;

        return $this->onItems($this->service->getPaginate($request->username, $request->name, $request->name, $cityId, $request->_pn, $request->_pi), $this->service->countAll());
    }

    public function showUser(): HttpJsonResponse
    {
        return $this->onItem($this->service->get(auth()->user()->id));
    }

    public function showAdministrator(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function storeAdministrator(StoreUserRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->username, $request->password, $request->name, $request->family, $request->national_code, $request->mobile, $request->email, 0, Role::ADMINISTRATOR, $request->gender, $request->is_active));
    }

    public function storeUser(City $city, StoreUserRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->username, $request->password, $request->name, $request->family, $request->national_code, $request->mobile, $request->email, $city->id, Role::USER, $request->gender, $request->is_active));
    }

    public function updateAdministrator(Model $model, UpdateUserRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->national_code, $request->mobile, $request->email, 0, Role::ADMINISTRATOR, $request->gender, $request->is_active));
    }

    public function updateUser(Model $model, City $city, UpdateUserRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->national_code, $request->mobile, $request->email, $city->id, Role::USER, $request->gender, $request->is_active));
    }

    public function changePassword(Model $model, ChangePasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changePassword($model, $request->new_password));
    }

    public function login(LoginRequest $request): HttpJsonResponse
    {
        if (!auth()->attempt(['username' => $request->username, 'password' => $request->password])) {
            return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }

        return $this->onItem(auth()->user());
    }

    public function logout(): HttpJsonResponse
    {
        auth()->logout();

        return $this->onOk();
    }
}
