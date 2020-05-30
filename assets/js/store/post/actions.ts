import ActionTypes from "./actionTypes"
import axios from "../../http/client"
import Exercise from "../../exercise/exercise.model"
import ExerciseInputValue from "../../post/create-post/exercise-input/exercise-input.model"
import { objectToFormData } from "object-to-formdata"
import { Answer } from "../../exercise/answer/answer.model"
const queryString = require('query-string');

export const fetchPosts = (limit?: number, beforeId?: number) => {
  return (dispatch) => {
    dispatch(pending())
    axios
      .get(queryString.stringifyUrl({url: "/api/posts", query: {limit, beforeId}}))
      .then((res) => {
        dispatch(success(res.data))
      })
      .catch((e) => {
        dispatch(error())
        console.log(e)
      })
  }

  function pending() {
    return { type: ActionTypes.FETCH_POSTS_PENDING }
  }
  function success(posts) {
    return { type: ActionTypes.FETCH_POSTS_SUCCESS, payload: { posts } }
  }
  function error() {
    return { type: ActionTypes.FETCH_POSTS_ERROR }
  }
}

export const createPost = (channel: string, text?: string, image?: File, exercise?: ExerciseInputValue) => {
  return (dispatch) => {
    const formData = objectToFormData({ channel, text, image, exercise }, { indices: true })
    return axios
      .post("/api/posts", formData)
      .then((res) => {
        console.log(res.data)
        dispatch(success(res.data))
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  function success(post) {
    return { type: ActionTypes.CREATE_POST_SUCCESS, payload: { post } }
  }
}

export const deletePost = (id) => {
  return (dispatch) => {
    axios
      .delete("/api/posts/" + id)
      .then((res) => {
        console.log(res.data)
        dispatch(success(id))
      })
      .catch(console.log)
  }

  function success(id) {
    return { type: ActionTypes.DELETE_POST_SUCCESS, payload: { id } }
  }
}

export const addComment = (postId, text) => {
  return (dispatch) => {
    return axios
      .post(`/api/posts/${postId}/comments`, { text })
      .then((res) => {
        console.log(res.data)
        dispatch(success(postId, res.data))
      })
      .catch(console.log)
  }

  function success(postId, comment) {
    return { type: ActionTypes.ADD_COMMENT_SUCCESS, payload: { postId, comment } }
  }
}

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios
      .delete(`/api/posts/${postId}/comments/${commentId}`)
      .then((res) => {
        console.log(res.data)
        dispatch(success(postId, commentId))
      })
      .catch(console.log)
  }

  function success(postId, commentId) {
    return { type: ActionTypes.DELETE_COMMENT_SUCCESS, payload: { postId, commentId } }
  }
}

export const submitAnswer = (exerciseId: number, answer: Answer) => {
  const success = (exercise: Exercise) => ({ type: ActionTypes.SUBMIT_ANSWER_SUCCESS, payload: { exercise } })

  return (dispatch) => {
    return axios
      .post(`/api/exercises/${exerciseId}/answers`, answer)
      .then((res) => {
        console.log(res.data)
        dispatch(success(res.data))
        return Promise.resolve(res.data)
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const applyChannelFilter = (channels: string[]) => {
  return (dispatch) => {
    dispatch({type: ActionTypes.APPLY_CHANNEL_FILTER, payload: {channels}})
  }
}
