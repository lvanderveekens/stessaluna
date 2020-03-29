import { AbstractPost } from "../post.interface";
import Exercise from "../../exercise/exercise.interface";

export interface ExercisePost extends AbstractPost {
    type: 'exercise'
    exercise: Exercise
}

export default ExercisePost;