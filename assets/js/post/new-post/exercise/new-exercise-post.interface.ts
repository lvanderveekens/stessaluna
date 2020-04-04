import { NewPost } from "../new-post.interface";

export abstract class NewExercisePost implements NewPost {
    type = 'exercise'
    exercise: NewExercise
};

export interface NewExercise {
    type: string
};