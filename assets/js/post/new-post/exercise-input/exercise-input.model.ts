import { ExerciseType } from "../../../exercise/exercise.model";

export abstract class ExerciseInputValue {
    type: ExerciseType

    constructor(type: ExerciseType) {
        this.type = type;
    }
}

export default ExerciseInputValue;