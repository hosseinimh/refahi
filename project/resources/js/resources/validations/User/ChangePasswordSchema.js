import * as yup from "yup";
import {
    validation,
    changePasswordPage as strings,
} from "../../../constants/strings";

const changePasswordSchema = yup.object().shape({
    newPassword: yup
        .string(validation.stringMessage.replace(":field", strings.newPassword))
        .min(
            6,
            validation.minMessage
                .replace(":field", strings.newPassword)
                .replace(":min", "6")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.newPassword)
                .replace(":max", "50")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.newPassword)
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
            [yup.ref("newPassword")],
            validation.confirmedMessage.replace(":field", strings.newPassword)
        ),
});

export default changePasswordSchema;
