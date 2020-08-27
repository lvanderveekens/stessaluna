import {APPLY_CHANNEL_FILTER} from "./feed.constants";

export const applyChannelFilter = (channels: string[]) => {
  return (dispatch) => {
    dispatch({type: APPLY_CHANNEL_FILTER, payload: {channels}})
  }
}