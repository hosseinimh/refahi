<?php

namespace App\Http\Requests\EquipmentType;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateEquipmentTypeRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:50',
            'type' => 'required|numeric|min:1|max:8',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('equipment_type.name_required'),
            'name.min' => __('equipment_type.name_min'),
            'name.max' => __('equipment_type.name_max'),
            'type.required' => __('equipment_type.type_required'),
            'type.numeric' => __('equipment_type.type_numeric'),
            'type.min' => __('equipment_type.type_min'),
            'type.max' => __('equipment_type.type_max'),
        ];
    }
}
