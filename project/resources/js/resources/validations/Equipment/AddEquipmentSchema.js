import * as yup from "yup";
import {
    validation,
    addEquipmentPage as strings,
} from "../../../constants/strings";

const addEquipmentSchema = yup.object().shape({
    type: yup
        .number()
        .typeError(validation.requiredMessage.replace(":field", strings.type)),
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
    assetNo: yup
        .string(validation.stringMessage.replace(":field", strings.assetNo))
        .matches(
            /^[0-9]{3,50}$/,
            validation.betweenDigitsMessage
                .replace(":field", strings.assetNo)
                .replace(":digit1", "3")
                .replace(":digit2", "50")
        )
        .required(
            validation.requiredMessage.replace(":field", strings.assetNo)
        ),
});

export default addEquipmentSchema;
