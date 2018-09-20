import {
  GOAL_UPDATE,
  GOAL_CREATE,
  GOAL_SAVE_SUCCESS,
  GOAL_UPDATE_CANCEL,
  GOAL_DELETE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  goalTitle: '',
  regretMoment: '',
  actionToTake: '',
  successCounter: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case GOAL_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case GOAL_CREATE:
      return INITIAL_STATE;
    case GOAL_SAVE_SUCCESS:
      return INITIAL_STATE;
    case GOAL_UPDATE_CANCEL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
