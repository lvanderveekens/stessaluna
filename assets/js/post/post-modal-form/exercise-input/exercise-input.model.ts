import {ExerciseType} from "../../../exercise/exercise.model";

export abstract class ExerciseInputValues {
    type: ExerciseType

    constructor(type: ExerciseType) {
        this.type = type;
    }
}

export default ExerciseInputValues;