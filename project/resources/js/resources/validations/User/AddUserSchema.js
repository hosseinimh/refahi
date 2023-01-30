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
});

export default addUserSchema;
