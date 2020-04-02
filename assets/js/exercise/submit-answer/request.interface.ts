export interface SubmitAnswerRequest {
    type: string
}


export class SubmitAorbAnswerRequest implements SubmitAnswerRequest {
    type = 'aorb';
    choices: ('a' | 'b')[]

    constructor(choices: ('a' | 'b')[]) {
        this.choices = choices;
    }
}