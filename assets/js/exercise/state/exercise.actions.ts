import {Answer} from "../answer/answer.model";
import axios from "../../http/client";
import {SUBMIT_ANSWER_SUCCESS} from "./exercise.constants";
import {normalize} from "normalizr";
import {exerciseSchema} from "./exercise.schema";

export const submitAnswer = (exerciseId: number, answer: Answer) => {
  const success = ({entities, result}) => ({type: SUBMIT_ANSWER_SUCCESS, payload: {entities, result}})

  return (dispatch) => {
    return axios
      .post(`/api/exercises/${exerciseId}/answers`, answer)
      .then((res) => {
        dispatch(success(normalize(res.data, exerciseSchema)))
        return Promise.resolve(res)
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}
