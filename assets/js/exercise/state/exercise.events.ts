import {trackEvent} from "@redux-beacon/google-analytics";
import {SUBMIT_ANSWER_SUCCESS} from "./exercise.constants";

export const exerciseEvents = {
  [SUBMIT_ANSWER_SUCCESS]: trackEvent((action, prevState, nextState) => ({
    category: 'Exercise',
    action: "Submitted an answer"
  })),
};
