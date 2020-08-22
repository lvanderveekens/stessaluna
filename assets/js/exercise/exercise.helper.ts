import Exercise, {ExerciseType} from "./exercise.interface"

export const isAnswered = (exercise: Exercise): boolean => {
  switch (exercise.type) {
    case ExerciseType.A_OR_B:
      return exercise.sentences.some((e) => e.choice.answer)
    case ExerciseType.WHAT_DO_YOU_SEE:
      return !!exercise.answer
    case ExerciseType.MISSING_WORD:
      return !!exercise.answer
    default:
      throw new Error(`Unsupported exercise type: ${(exercise as Exercise).type}`)
  }
}
