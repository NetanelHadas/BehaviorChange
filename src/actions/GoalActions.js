import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  GOAL_UPDATE,
  GOAL_CREATE,
  GOALS_FETCH_SUCCESS,
  GOAL_SAVE_SUCCESS,
  GOAL_UPDATE_CANCEL
} from './types';

export const goalUpdate = ({ prop, value }) => {
  return {
    type: GOAL_UPDATE,
    payload: { prop, value }
  };
};

export const goalCreate = ({ goalTitle, regretMoment, actionToTake, successCounter }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals`)
      .push({ goalTitle, regretMoment, actionToTake, successCounter })
      .then(() => {
        dispatch({ type: GOAL_CREATE });
        Actions.goalList({ type: 'reset' });
      });
  };
};

export const goalsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals`)
      .on('value', snapshot => {
        dispatch({ type: GOALS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const goalSave = ({ goalTitle, regretMoment, actionToTake, successCounter, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/goals/${uid}`)
      .set({ goalTitle, regretMoment, actionToTake, successCounter })
      .then(() => {
        dispatch({ type: GOAL_SAVE_SUCCESS });
        Actions.goalList({ type: 'reset' });
      });
  };
};

export const goalUpdateCancel = () => {
  return {
    type: GOAL_UPDATE_CANCEL
  };
}

export const goalDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/goals/${uid}`)
      .remove()
      .then(() => {
        Actions.goalList({ type: 'reset' })
      });
  };
};
