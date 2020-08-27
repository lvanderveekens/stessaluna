import axios from "../../../http/client";
import {ADD_COMMENT_SUCCESS, DELETE_COMMENT_SUCCESS} from "./comment.constants";
import {commentSchema} from "./comment.schema";
import {normalize} from "normalizr";

export const addComment = (postId: number, text: string) => {
  const success = ({entities, result}, postId: number) => ({
    type: ADD_COMMENT_SUCCESS,
    payload: {entities, result, postId}
  });

  return (dispatch) => {
    return axios
      .post(`/api/comments`, {postId, text})
      .then((res) => {
        dispatch(success(normalize(res.data, commentSchema), postId))
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const deleteComment = (postId: number, commentId: number) => {
  const success = (postId: number, commentId: number) => ({type: DELETE_COMMENT_SUCCESS, payload: {postId, commentId}});

  return (dispatch) => {
    return axios
      .delete(`/api/comments/${commentId}`)
      .then((res) => {
        dispatch(success(postId, commentId))
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}