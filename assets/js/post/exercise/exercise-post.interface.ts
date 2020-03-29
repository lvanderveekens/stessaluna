import Post from "../post.interface";
import Exercise from "../../exercise/exercise.interface";

export interface ExercisePost extends Post {
    type: 'exercise'
    exercise: Exercise
}

export default ExercisePost;