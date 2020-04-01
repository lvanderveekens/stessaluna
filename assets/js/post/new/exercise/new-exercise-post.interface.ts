import { NewPostRequest } from "../new-post.interface";

export abstract class NewExercisePostRequest implements NewPostRequest {
    type = 'exercise'
    exercise: NewExercise
};

export interface NewExercise {
    type: string
};