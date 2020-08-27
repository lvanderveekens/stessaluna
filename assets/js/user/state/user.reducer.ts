import User from "../user.interface";
import merge from 'lodash/merge';

export const usersById = (state: { [id: string]: User } = {}, action) => {
  switch (action.type) {
    default:
      if (action.payload && action.payload.entities && action.payload.entities.users) {
        return merge({}, state, action.payload.entities.users)
      }
      return state
  }
}