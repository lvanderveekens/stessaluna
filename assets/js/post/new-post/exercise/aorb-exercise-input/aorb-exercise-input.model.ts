import ExerciseInputValue from "../exercise-input.model";
import { AorbSentenceInput } from "./aorb-sentence-input/aorb-sentence-input.model";

export class AorbExerciseInputValue extends ExerciseInputValue {
    sentences: AorbSentenceInput[]

    constructor(sentences: AorbSentenceInput[]) {
        super('aorb');
        this.sentences = sentences
    }
}

export default AorbExerciseInputValue;