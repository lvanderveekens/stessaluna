import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string().required("Username cannot be empty"),
  password: yup.string().required("Password cannot be empty"),
});
