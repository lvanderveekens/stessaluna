import axios from "../../http/client"
import Exercise from "../../exercise/exercise.model"
import ExerciseInputValues from "../../post/post-modal-form/exercise-input/exercise-input.model"
import {Answer} from "../../exercise/answer/answer.model"
import {
  ADD_COMMENT_SUCCESS,
  APPLY_CHANNEL_FILTER,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  SUBMIT_ANSWER_SUCCESS, UPDATE_POST_SUCCESS
} from "./actionTypes"
import Image from "../../image/image.interface";

const queryString = require('query-string');

export const fetchPosts = (channels?: string[], limit?: number, beforeId?: number, append?: boolean) => {
  return (dispatch) => {
    dispatch(pending())
    axios
      .get(queryString.stringifyUrl(
        {url: "/api/posts", query: {channels, limit, beforeId}},
        {arrayFormat: 'bracket'}
      ))
      .then((res) => {
        dispatch(success(res.data))
      })
      .catch((e) => {
        dispatch(error())
        console.log(e)
      })
  }

  function pending() {
    return {type: FETCH_POSTS_PENDING, payload: {append}}
  }

  function success(posts) {
    return {type: FETCH_POSTS_SUCCESS, payload: {posts, append, limit}}
  }

  function error() {
    return {type: FETCH_POSTS_ERROR}
  }
}

export const createPost = (channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => {
  return (dispatch) => {
    return axios
      .post("/api/posts", {channel, text, image, exercise})
      .then((res) => {
        dispatch(success(res.data))
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  function success(post) {
    return {type: CREATE_POST_SUCCESS, payload: {post}}
  }
}

export const updatePost = (id: number, channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => {
  return (dispatch) => {
    return axios
      .put(`/api/posts/${id}`, {channel, text, image, exercise})
      .then((res) => {
        dispatch(success(res.data))
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  function success(post) {
    return {type: UPDATE_POST_SUCCESS, payload: {post}}
  }
}

export const deletePost = (id: number) => {
  return (dispatch) => {
    axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        dispatch(success(id))
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }

  function success(id) {
    return {type: DELETE_POST_SUCCESS, payload: {id}}
  }
}

export const addComment = (postId, text) => {
  return (dispatch) => {
    return axios
      .post(`/api/posts/${postId}/comments`, {text})
      .then((res) => {
        dispatch(success(postId, res.data))
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }

  function success(postId, comment) {
    return {type: ADD_COMMENT_SUCCESS, payload: {postId, comment}}
  }
}

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios
      .delete(`/api/posts/${postId}/comments/${commentId}`)
      .then((res) => {
        dispatch(success(postId, commentId))
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }

  function success(postId, commentId) {
    return {type: DELETE_COMMENT_SUCCESS, payload: {postId, commentId}}
  }
}

export const submitAnswer = (exerciseId: number, answer: Answer) => {
  const success = (exercise: Exercise) => ({type: SUBMIT_ANSWER_SUCCESS, payload: {exercise}})

  return (dispatch) => {
    return axios
      .post(`/api/exercises/${exerciseId}/answers`, answer)
      .then((res) => {
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
    dispatch({type: APPLY_CHANNEL_FILTER, payload: {channels}})
  }
}
