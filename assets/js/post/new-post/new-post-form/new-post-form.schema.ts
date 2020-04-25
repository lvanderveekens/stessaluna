import * as yup from "yup"
import { ExerciseType } from "../../../exercise/exercise.model"

export const schema = yup.object().shape({
  text: yup.string().nullable(),
  image: yup.mixed(),
  exercise: yup.lazy((value) => {
    if (value !== undefined) {
      if (value && value.type === ExerciseType.A_OR_B) {
        return yup.object().shape({
          type: yup.string().required(),
          sentences: yup
            .array()
            .required()
            .of(
              yup.object().shape({
                textBefore: yup.string().required(),
                choice: yup.object().shape({
                  a: yup.string().required(),
                  b: yup.string().required(),
                  correct: yup.string().required(),
                }),
                textAfter: yup.string().nullable(),
              })
            ),
        })
      } else if (value && value.type === ExerciseType.WHAT_DO_YOU_SEE) {
        return yup.object().shape({
          type: yup.string().required(),
          image: yup.mixed().required(),
          option1: yup.string().required(),
          option2: yup.string().required(),
          option3: yup.string().required(),
          option4: yup.string().required(),
          correct: yup.number().required(),
        })
      }
    }
    return yup.mixed().notRequired()
  }),
})
