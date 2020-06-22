import * as yup from "yup"
import { ExerciseType } from "../../../exercise/exercise.model"

export const schema = yup.object().shape({
  channel: yup.string(),
  text: yup.string().nullable(),
  image: yup.mixed(),
  exercise: yup.lazy((value) => {
    if (value) {
      if (value.type === ExerciseType.A_OR_B) {
        return aorbSchema
      } else if (value.type === ExerciseType.WHAT_DO_YOU_SEE) {
        return whatdoyouseeSchema
      } else if (value.type === ExerciseType.MISSING_WORD) {
        return missingwordSchema
      }
    }
    return yup.mixed().notRequired()
  }),
})

const aorbSchema = yup.object().shape({
  type: yup.string().required(),
  sentences: yup
    .array()
    .required()
    .of(
      yup.object().shape({
          textBefore: yup.string().when(["textAfter"], {
            is: (textAfter) => !textAfter,
            then: yup.string().required(),
          }),
          choice: yup.object().shape({
            a: yup.string().required(),
            b: yup.string().required(),
            correct: yup.string().required(),
          }),
          textAfter: yup.string().when(["textBefore"], {
            is: (textBefore) => !textBefore,
            then: yup.string().required(),
          }),
        },
        ["textBefore", "textAfter"]
      )
    ),
})

const whatdoyouseeSchema = yup.object().shape({
  type: yup.string().required(),
  image: yup.mixed().required(),
  option1: yup.string().required(),
  option2: yup.string().required(),
  option3: yup.string().required(),
  option4: yup.string().required(),
  correct: yup.number().required(),
})

const missingwordSchema = yup.object().shape(
  {
    textBefore: yup.string().when(["textAfter"], {
      is: (textAfter) => !textAfter,
      then: yup.string().required(),
    }),
    textAfter: yup.string().when(["textBefore"], {
      is: (textBefore) => !textBefore,
      then: yup.string().required(),
    }),
    option1: yup.string().required(),
    option2: yup.string().required(),
    option3: yup.string().required(),
    option4: yup.string().required(),
    correct: yup.number().required(),
  },
  ["textBefore", "textAfter"]
)
