<?php

namespace App\Http\Requests\Equipment;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateEquipmentRequest extends FormRequest
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
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('equipment.name_required'),
            'name.min' => __('equipment.name_min'),
            'name.max' => __('equipment.name_max'),
        ];
    }
}
