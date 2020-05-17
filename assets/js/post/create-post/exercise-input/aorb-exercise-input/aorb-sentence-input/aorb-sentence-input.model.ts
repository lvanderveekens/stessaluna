export interface AorbSentenceInput {
    id: number
    textBefore?: string
    choice?: AorbChoiceInput
    textAfter?: string
}

export interface AorbChoiceInput {
    a: string,
    b: string,
    correct?: 'a' | 'b'
}

export default AorbSentenceInput;