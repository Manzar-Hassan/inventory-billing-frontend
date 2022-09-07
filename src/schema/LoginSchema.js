import * as yup from "yup";

export const signinSchema = yup.object().shape({
  name: yup.string().min(4, "Username must be greater than 3 characters"),
  password: yup.string().min(8, "Password must be more than 8 charcaters"),
});
