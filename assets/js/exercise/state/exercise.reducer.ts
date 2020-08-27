import Exercise from "../exercise.interface";
import merge from 'lodash/merge';

export const exercisesById = (state: { [id: string]: Exercise } = {}, action) => {
  switch (action.type) {
    default:
      if (action.payload && action.payload.entities && action.payload.entities.exercises) {
        return merge({}, state, action.payload.entities.exercises)
      }
      return state
  }
}