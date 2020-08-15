import User from "../../user/user.interface";

export interface Vote {
  id: number
  type: string
  user: User
}

export default Vote