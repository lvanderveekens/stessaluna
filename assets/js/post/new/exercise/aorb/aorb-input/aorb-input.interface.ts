export interface AorbInputValue {
    textBefore: string
    choice?: AorbInputChoice
    textAfter?: string
}

export interface AorbInputChoice {
    a: string,
    b: string,
    correct?: 'a' | 'b'
}