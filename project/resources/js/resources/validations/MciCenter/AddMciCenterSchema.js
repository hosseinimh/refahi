import * as yup from "yup";
import {
    validation,
    addMciCenterPage as strings,
} from "../../../constants/strings";

const addMciCenterSchema = yup.object().shape({
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
    tel: yup
        .string(validation.stringMessage.replace(":field", strings.tel))
        .min(
            3,
            validation.minMessage
                .replace(":field", strings.tel)
                .replace(":min", "3")
        )
        .max(
            50,
            validation.maxMessage
                .replace(":field", strings.tel)
                .replace(":max", "50")
        )
        .required(validation.requiredMessage.replace(":field", strings.tel)),
    address: yup
        .string(validation.stringMessage.replace(":field", strings.address))
        .max(
            200,
            validation.maxMessage
                .replace(":field", strings.address)
                .replace(":max", "200")
        ),
    longitude: yup
        .number()
        .typeError(
            validation.numberMessage.replace(":field", strings.longitude)
        ),
    latitude: yup
        .number()
        .typeError(
            validation.numberMessage.replace(":field", strings.latitude)
        ),
});

export default addMciCenterSchema;
