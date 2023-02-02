<?php

namespace App\Http\Requests\MciCenter;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateMciCenterRequest extends FormRequest
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
            'tel' => 'required|min:3|max:50',
            'address' => 'max:200',
            'longitude' => 'digits_between:0,10',
            'latitude' => 'digits_between:0,10',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('mci_center.name_required'),
            'name.min' => __('mci_center.name_min'),
            'name.max' => __('mci_center.name_max'),
            'tel.required' => __('mci_center.tel_required'),
            'tel.min' => __('mci_center.tel_min'),
            'tel.max' => __('mci_center.tel_max'),
            'address.max' => __('mci_center.address_max'),
            'longitude.digits_between' => __('mci_center.longitude_digits_between'),
            'latitude.digits_between' => __('mci_center.latitude_digits_between'),
        ];
    }
}
