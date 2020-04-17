import ExerciseInputValue from "../exercise-input.model";
import { AorbSentenceInput } from "./aorb-sentence-input/aorb-sentence-input.model";
import { ExerciseType } from "../../../../exercise/exercise.model";

export class AorbExerciseInputValue extends ExerciseInputValue {
    sentences: AorbSentenceInput[]

    constructor(sentences: AorbSentenceInput[]) {
        super(ExerciseType.A_OR_B);
        this.sentences = sentences
    }
}

export default AorbExerciseInputValue;