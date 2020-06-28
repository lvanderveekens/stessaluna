import { ExerciseType } from "../../../exercise/exercise.model";

// TODO: merge exercise and exercise input models?
export abstract class ExerciseInputValue {
    type: ExerciseType

    constructor(type: ExerciseType) {
        this.type = type;
    }
}

export default ExerciseInputValue;