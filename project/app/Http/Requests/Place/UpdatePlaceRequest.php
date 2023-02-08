<?php

namespace App\Http\Requests\Place;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdatePlaceRequest extends FormRequest
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
            'land' => 'required|numeric|min:5|max:5000',
            'building' => 'required|numeric|min:5|max:1000',
            'tel' => 'required|min:3|max:50',
            'address' => 'max:200',
            'postal_code' => 'required|numeric|digits:10',
            'region_no' => 'required|numeric|min:1|max:9',
            'latitude' => 'numeric|digits_between:0,10',
            'longitude' => 'numeric|digits_between:0,10',
            'water_bill_no' => 'numeric|digits_between:5,15',
            'electricity_bill_no' => 'numeric|digits_between:5,15',
            'gas_bill_no' => 'numeric|digits_between:5,15',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('place.name_required'),
            'name.min' => __('place.name_min'),
            'name.max' => __('place.name_max'),
            'land.required' => __('place.land_required'),
            'land.numeric' => __('place.land_numeric'),
            'land.min' => __('place.land_min'),
            'land.max' => __('place.land_max'),
            'building.required' => __('place.building_required'),
            'building.numeric' => __('place.building_numeric'),
            'building.min' => __('place.building_min'),
            'building.max' => __('place.building_max'),
            'tel.required' => __('place.tel_required'),
            'tel.min' => __('place.tel_min'),
            'tel.max' => __('place.tel_max'),
            'address.max' => __('place.address_max'),
            'postal_code.required' => __('place.postal_code_required'),
            'postal_code.numeric' => __('place.postal_code_numeric'),
            'postal_code.digits' => __('place.postal_code_digits'),
            'region_no.required' => __('place.region_no_required'),
            'region_no.numeric' => __('place.region_no_numeric'),
            'region_no.min' => __('place.region_no_min'),
            'region_no.max' => __('place.region_no_max'),
            'latitude.numeric' => __('place.latitude_numeric'),
            'latitude.digits_between' => __('place.latitude_digits_between'),
            'longitude.numeric' => __('place.longitude_numeric'),
            'longitude.digits_between' => __('place.longitude_digits_between'),
            'water_bill_no.numeric' => __('place.water_bill_no_numeric'),
            'water_bill_no.digits_between' => __('place.water_bill_no_digits_between'),
            'electricity_bill_no.numeric' => __('place.electricity_bill_no_numeric'),
            'electricity_bill_no.digits_between' => __('place.electricity_bill_no_digits_between'),
            'gas_bill_no.numeric' => __('place.gas_bill_no_numeric'),
            'gas_bill_no.digits_between' => __('place.gas_bill_no_digits_between'),
        ];
    }
}
