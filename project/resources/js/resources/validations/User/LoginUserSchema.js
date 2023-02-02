import * as yup from "yup";
import {
    validation,
    loginUserPage as strings,
} from "../../../constants/strings";

const loginUserSchema = yup.object().shape({
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
});

export default loginUserSchema;
