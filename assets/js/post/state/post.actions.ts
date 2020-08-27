import axios from "../../http/client"
import ExerciseInputValues from "../post-modal-form/exercise-input/exercise-input.model"
import {
  CREATE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POSTS_PENDING,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
} from "./post.constants"
import Image from "../../image/image.interface";
import {normalize} from "normalizr";
import {postSchema} from "./post.schema";

const queryString = require('query-string');

export const fetchPosts = (channels?: string[], limit?: number, beforeId?: number, append?: boolean) => {
  const pending = () => ({type: FETCH_POSTS_PENDING, payload: {append}})

  const success = (normalizedPosts) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: {...normalizedPosts, append, limit}
  })

  const error = () => ({type: FETCH_POSTS_ERROR})

  return (dispatch) => {
    dispatch(pending())
    axios
      .get(queryString.stringifyUrl(
        {url: "/api/posts", query: {channels, limit, beforeId}},
        {arrayFormat: 'bracket'}
      ))
      .then((res) => {
        dispatch(success(normalize(res.data, [postSchema])))
      })
      .catch((e) => {
        dispatch(error())
        console.log(e)
      })
  }
}
export const createPost = (channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => {
  const success = (normalizedPost) => ({type: CREATE_POST_SUCCESS, payload: {...normalizedPost}})

  return (dispatch) => {
    return axios
      .post("/api/posts", {channel, text, image, exercise})
      .then((res) => {
        dispatch(success(normalize(res.data, postSchema)))
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

export const updatePost = (id: number, channel: string, text?: string, image?: Image, exercise?: ExerciseInputValues) => {
  const success = (normalizedPost) => ({type: UPDATE_POST_SUCCESS, payload: {...normalizedPost}})

  return (dispatch) => {
    return axios
      .put(`/api/posts/${id}`, {channel, text, image, exercise})
      .then((res) => {
        dispatch(success(normalize(res.data, postSchema)))
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

export const deletePost = (id: number) => {
  const success = (id: number) => ({type: DELETE_POST_SUCCESS, payload: {id}});

  return (dispatch) => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => {
        dispatch(success(id))
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}