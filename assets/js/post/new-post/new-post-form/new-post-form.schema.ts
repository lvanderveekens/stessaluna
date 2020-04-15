import * as yup from 'yup';

export const newPostFormSchema = yup.object().shape({
  text: yup.string().nullable(),
  image: yup.mixed(),
  exercise: yup.lazy(value => {
    if (value !== undefined) {
      if (value && value.type === 'aorb') {
        return yup.object().shape({
          type: yup.string().required(),
          sentences: yup.array().required().of(
            yup.object().shape({
              textBefore: yup.string().required(),
              choice: yup.object().shape({
                a: yup.string().required(),
                b: yup.string().required(),
                correct: yup.string().required()
              }),
              textAfter: yup.string().required(),
            })
          )
        });
      }
    }
    return yup.mixed().notRequired();
  })
})