import ExerciseInputValues from "../exercise-input.model";
import {AorbSentenceInput} from "./aorb-sentence-input/aorb-sentence-input.model";
import {ExerciseType} from "../../../../exercise/exercise.interface";

export class AorbExerciseInputValues extends ExerciseInputValues {
    sentences: AorbSentenceInput[]

    constructor(sentences: AorbSentenceInput[]) {
        super(ExerciseType.A_OR_B);
        this.sentences = sentences
    }
}

export default AorbExerciseInputValues;