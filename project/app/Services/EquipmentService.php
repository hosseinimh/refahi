<?php

namespace App\Services;

use App\Models\Equipment as Model;

class EquipmentService
{
    public function get(int $id): mixed
    {
        return Model::join('tbl_equipment_types', 'tbl_equipments.equipment_type_id', '=', 'tbl_equipment_types.id')->where('tbl_equipments.id', $id)->select('tbl_equipments.*', 'tbl_equipment_types.name AS equipment_name', 'tbl_equipment_types.type AS equipment_type')->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::join('tbl_equipment_types', 'tbl_equipments.equipment_type_id', '=', 'tbl_equipment_types.id')->select('tbl_equipments.*', 'tbl_equipment_types.name AS equipment_name', 'tbl_equipment_types.type AS equipment_type')->orderBy('equipment_type_id', 'ASC')->orderBy('tbl_equipments.name', 'ASC')->orderBy('tbl_equipments.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $equipmentTypeId, string $name, string $assetNo): mixed
    {
        $data = [
            'equipment_type_id' => $equipmentTypeId,
            'name' => $name,
            'asset_no' => $assetNo,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, int $equipmentTypeId, string $name, string $assetNo): bool
    {
        $data = [
            'equipment_type_id' => $equipmentTypeId,
            'name' => $name,
            'asset_no' => $assetNo,
        ];

        return $model->update($data);
    }

    public function countAll(): int
    {
        return Model::join('tbl_equipment_types', 'tbl_equipments.equipment_type_id', '=', 'tbl_equipment_types.id')->count();
    }
}
