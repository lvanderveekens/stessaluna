export interface Vote {
  id: number
  type: VoteType
  userId: number
}

export enum VoteType {
  UP = "UP",
  DOWN = "DOWN",
}

export default Vote