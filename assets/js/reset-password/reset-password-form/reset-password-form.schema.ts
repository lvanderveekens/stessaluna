import * as yup from 'yup';

export const schema = yup.object({
  email: yup.string()
    .required("Email cannot be empty")
    .email("Not a valid email"),
});
