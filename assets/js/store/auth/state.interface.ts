import User from "../../user/user.interface";

export interface AuthState {
    loggedIn: boolean
    user?: User
    loading: boolean
}