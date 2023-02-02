<?php

namespace App\Services;

use App\Constants\Role;
use App\Models\User as Model;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function get(int $id): mixed
    {
        return
            Model::leftJoin('tbl_cities', function ($join) {
                $join->on('tbl_users.city_id', '=', 'tbl_cities.id')
                    ->join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id');
            })->where('tbl_users.id', $id)->select('tbl_users.*', 'tbl_cities.name AS city_name', 'tbl_provinces.name AS province_name')->first();
    }

    public function getPaginate(string|null $username, string|null $name, string|null $family, int|null $cityId, int $page, int $pageItems): mixed
    {
        if (is_null($cityId)) {
            return Model::leftJoin('tbl_cities', function ($join) {
                $join->on('tbl_users.city_id', '=', 'tbl_cities.id')
                    ->join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id');
            })->where('username', 'LIKE', '%' . $username . '%')->where('tbl_users.name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->select('tbl_users.*', 'tbl_cities.name AS city_name', 'tbl_provinces.name AS province_name')->orderBy('family', 'ASC')->orderBy('tbl_users.name', 'ASC')->orderBy('tbl_users.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
        }

        return Model::join('tbl_cities', function ($join) {
            $join->on('tbl_users.city_id', '=', 'tbl_cities.id')
                ->join('tbl_provinces', 'tbl_cities.province_id', '=', 'tbl_provinces.id');
        })->where('username', 'LIKE', '%' . $username . '%')->where('tbl_users.name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->where('city_id', $cityId)->select('tbl_users.*', 'tbl_cities.name AS city_name', 'tbl_provinces.name AS province_name')->orderBy('family', 'ASC')->orderBy('tbl_users.name', 'ASC')->orderBy('tbl_users.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $username, string $password, string $name, string $family, int|null $cityId, int $role): mixed
    {
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $data = [
            'username' => $username,
            'password' => $password,
            'name' => $name,
            'family' => $family,
            'city_id' => $role === Role::USER ? ($cityId ?? 0) : 0,
            'role' => $role,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $user, string $name, string $family): bool
    {
        $data = [
            'name' => $name,
            'family' => $family,
        ];

        return $user->update($data);
    }

    public function changePassword(Model $user, string $password): bool
    {
        return DB::statement("UPDATE `tbl_users` SET `password`='$password' WHERE `id`=$user->id");
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
