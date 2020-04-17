import ExerciseInputValue from "../exercise-input.model";
import { ExerciseType } from "../../../../exercise/exercise.model";

export class WhatdoyouseeExerciseInputValue extends ExerciseInputValue {

    constructor() {
        super(ExerciseType.WHAT_DO_YOU_SEE);
    }
}

export default WhatdoyouseeExerciseInputValue;