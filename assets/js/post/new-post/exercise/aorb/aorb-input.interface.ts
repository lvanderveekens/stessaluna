export interface AorbInputValue {
    textBefore: string
    choice?: { a: string, b: string, correct?: 'a' | 'b' }
    textAfter?: string
}