import * as yup from 'yup';

export const schema = yup.object({
  email: yup.string()
    .required("Email cannot be empty")
    .email("Not a valid email"),
  username: yup.string()
    .required("Username cannot be empty"),
  password: yup.string()
    .required("Password cannot be empty"),
  confirmPassword: yup.string()
    .required("Confirm password cannot be empty")
    .oneOf([yup.ref('password')], "Passwords don't match"),
  country: yup.string()
    .required("Country cannot be empty"),
});
