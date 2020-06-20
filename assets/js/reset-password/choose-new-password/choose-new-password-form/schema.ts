import * as yup from 'yup';

export const schema = yup.object({
  newPassword: yup.string()
    .required("Password cannot be empty"),
  confirmNewPassword: yup.string()
    .required("Confirm password cannot be empty")
    .oneOf([yup.ref('newPassword')], "Passwords don't match")
});
