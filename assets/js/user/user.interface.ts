import Image from "../image/image.interface";

interface User {
  id: number
  email: string
  username: string
  displayName?: string
  country: string
  avatar: Image
}

export default User
