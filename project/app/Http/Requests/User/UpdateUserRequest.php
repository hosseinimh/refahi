<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateUserRequest extends FormRequest
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
            'family' => 'required|min:3|max:50',
            'national_code' => 'required|digits:10',
            'mobile' => 'required|digits:11',
            'email' => 'email',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('user.name_required'),
            'name.min' => __('user.name_min'),
            'name.max' => __('user.name_max'),
            'family.required' => __('user.family_required'),
            'family.min' => __('user.family_min'),
            'family.max' => __('user.family_max'),
            'national_code.required' => __('user.national_code_required'),
            'national_code.digits' => __('user.national_code_digits'),
            'mobile.required' => __('user.mobile_required'),
            'mobile.digits' => __('user.mobile_digits'),
            'email.email' => __('user.email_email'),
        ];
    }
}
