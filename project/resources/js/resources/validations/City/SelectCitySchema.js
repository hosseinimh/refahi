import * as yup from "yup";
import {
    validation,
    selectCityModal as strings,
} from "../../../constants/strings";

const selectCitySchema = yup.object().shape({
    city: yup
        .number()
        .typeError(validation.requiredMessage.replace(":field", strings.city)),
});

export default selectCitySchema;
