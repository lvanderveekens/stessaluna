import {VoteType} from "../vote.interface";
import {
  UNDO_VOTE_ON_COMMENT_SUCCESS,
  UNDO_VOTE_ON_POST_SUCCESS,
  UPDATE_VOTE_ON_COMMENT_SUCCESS,
  UPDATE_VOTE_ON_POST_SUCCESS,
  VOTE_ON_COMMENT_SUCCESS,
  VOTE_ON_POST_SUCCESS
} from "./vote.constants";
import axios from "../../../http/client";
import {voteSchema} from "./vote.schema";
import {normalize} from "normalizr";

export const voteOnPost = (postId: number, type: VoteType) => {
  const success = ({entities, result}) => ({type: VOTE_ON_POST_SUCCESS, payload: {entities, result, postId}})

  return (dispatch) => {
    return axios
      .post(`/api/votes`, {type, postId})
      .then((res) => {
        dispatch(success(normalize(res.data, voteSchema)))
        return Promise.resolve(res.data)
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const updateVoteOnPost = (postId: number, voteId: number, type: VoteType) => {
  const success = ({entities, result}) => ({type: UPDATE_VOTE_ON_POST_SUCCESS, payload: {entities, result, postId}})

  return (dispatch) => {
    return axios
      .patch(`/api/votes/${voteId}`, {type})
      .then((res) => {
        dispatch(success(normalize(res.data, voteSchema)))
        return Promise.resolve(res.data)
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const undoVoteOnPost = (postId: number, voteId: number) => {
  const success = () => ({type: UNDO_VOTE_ON_POST_SUCCESS, payload: {postId, voteId}})

  return (dispatch) => {
    return axios
      .delete(`/api/votes/${voteId}`)
      .then(() => {
        dispatch(success())
        return Promise.resolve()
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const voteOnComment = (commentId: number, type: VoteType) => {
  const success = ({entities, result}) => ({type: VOTE_ON_COMMENT_SUCCESS, payload: {entities, result, commentId}})

  return (dispatch) => {
    return axios
      .post(`/api/votes`, {type, commentId})
      .then((res) => {
        dispatch(success(normalize(res.data, voteSchema)))
        return Promise.resolve(res.data)
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const updateVoteOnComment = (commentId: number, voteId: number, type: VoteType) => {
  const success = ({entities, result}) => ({
    type: UPDATE_VOTE_ON_COMMENT_SUCCESS,
    payload: {entities, result, commentId}
  })

  return (dispatch) => {
    return axios
      .patch(`/api/votes/${voteId}`, {type})
      .then((res) => {
        dispatch(success(normalize(res.data, voteSchema)))
        return Promise.resolve(res.data)
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}

export const undoVoteOnComment = (commentId: number, voteId: number) => {
  const success = () => ({type: UNDO_VOTE_ON_COMMENT_SUCCESS, payload: {commentId, voteId}})

  return (dispatch) => {
    return axios
      .delete(`/api/votes/${voteId}`)
      .then(() => {
        dispatch(success())
        return Promise.resolve()
      })
      .catch((e) => {
        console.log(e)
        return Promise.reject(e)
      })
  }
}