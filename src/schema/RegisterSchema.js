import * as yup from "yup";

export const registerSchema = yup.object().shape({
  regName: yup.string().min(4, "Username must be greater than 3 characters"),
  regPassword: yup.string().min(8, "Password must be more than 8 charcaters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("regPassword"), null], "Passwords must match"),
});
