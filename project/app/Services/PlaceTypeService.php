<?php

namespace App\Services;

use App\Constants\PlaceType;
use App\Models\PlaceType as Model;

class PlaceTypeService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::orderBy('type', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAll(int $type): mixed
    {
        if ($type >= PlaceType::TYPE_1 && $type <= PlaceType::TYPE_4) {
            return Model::where('type', $type)->orderBy('type', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
        }

        return Model::orderBy('type', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public function store(string $name, int $type): mixed
    {
        $data = [
            'name' => $name,
            'type' => $type,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $name, int $type): bool
    {
        $data = [
            'name' => $name,
            'type' => $type,
        ];

        return $model->update($data);
    }

    public function countAll(): int
    {
        return Model::count();
    }
}
