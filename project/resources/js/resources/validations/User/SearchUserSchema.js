import * as yup from "yup";
import { validation, usersPage as strings } from "../../../constants/strings";

const searchUserSchema = yup.object().shape({
    username: yup
        .string(validation.stringMessage.replace(":field", strings.username))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.username)
                .replace(":max", "50")
        ),
    nameFamily: yup
        .string(validation.stringMessage.replace(":field", strings.nameFamily))
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.nameFamily)
                .replace(":max", "50")
        ),
    city: yup
        .number()
        .typeError(validation.requiredMessage.replace(":field", strings.city))
        .required(validation.requiredMessage.replace(":field", strings.city)),
});

export default searchUserSchema;
