import User from "../../user/user.interface";

export interface Vote {
  id: number
  type: VoteType
  user: User
}

export enum VoteType {
  UP = "UP",
  DOWN = "DOWN",
}

export default Vote