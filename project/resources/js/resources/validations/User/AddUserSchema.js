import * as yup from "yup";
import { validation, addUserPage as strings } from "../../../constants/strings";

const addUserSchema = yup.object().shape({
    username: yup
        .string(validation.stringMessage.replace(":field", strings.username))
        .min(
            6,
            validation.minMessage
                .replace(":field", strings.username)
                .replace(":min", "6")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.username)
                .replace(":max", "50")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.username)
        ),
    password: yup
        .string(validation.stringMessage.replace(":field", strings.password))
        .min(
            6,
            validation.minMessage
                .replace(":field", strings.password)
                .replace(":min", "6")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.password)
                .replace(":max", "50")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.password)
        ),
    confirmPassword: yup
        .string(
            validation.stringMessage.replace(":field", strings.confirmPassword)
        )
        .required(
            validation.requiredMessage.replace(
                ":field",
                strings.confirmPassword
            )
        )
        .oneOf(
            [yup.ref("password")],
            validation.confirmedMessage.replace(":field", strings.password)
        ),
    name: yup
        .string(validation.stringMessage.replace(":field", strings.name))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.name)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.name)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.name)),
    family: yup
        .string(validation.stringMessage.replace(":field", strings.family))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.family)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.family)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.family)),
    nationalCode: yup
        .string(
            validation.stringMessage.replace(":field", strings.nationalCode)
        )
        .matches(
            /^[0-9]{10}$/,
            validation.exactDigitMessage
                .replace(":field", strings.nationalCode)
                .replace(":digit", "10")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.nationalCode)
        ),
    personnelNo: yup.string().when("user", {
        is: "on",
        then: yup
            .string(
                validation.stringMessage.replace(":field", strings.personnelNo)
            )
            .matches(
                /^[0-9]{5,10}$/,
                validation.betweenDigitsMessage
                    .replace(":field", strings.personnelNo)
                    .replace(":digit1", "5")
                    .replace(":digit2", "50")
            )
            .required(
                validation.requiredMessage.replace(
                    ":field",
                    strings.personnelNo
                )
            ),
    }),
    mobile: yup
        .string(validation.stringMessage.replace(":field", strings.mobile))
        .matches(
            /^[0-9]{11}$/,
            validation.exactDigitMessage
                .replace(":field", strings.mobile)
                .replace(":digit", "11")
        )
        .required(validation.requiredMessage.replace(":field", strings.mobile)),
    email: yup
        .string(validation.stringMessage.replace(":field", strings.email))
        .email(validation.validMessage.replace(":field", strings.email))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.email)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.email)),
    city: yup
        .number()
        .typeError(validation.requiredMessage.replace(":field", strings.city))
        .required(validation.requiredMessage.replace(":field", strings.city)),
});

export default addUserSchema;
