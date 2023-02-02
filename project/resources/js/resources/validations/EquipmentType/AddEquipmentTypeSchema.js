import * as yup from "yup";
import {
    validation,
    addEquipmentTypePage as strings,
} from "../../../constants/strings";

const addEquipmentTypeSchema = yup.object().shape({
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
});

export default addEquipmentTypeSchema;
