import {
  ADD_OBJECT,
  CHANGE_OBJECT,
  CHANGE_PATH,
  CLEAR_FORM,
} from "./actionTypes";

export const addObject = (value) => {
  return {
    type: ADD_OBJECT,
    payload: value,
  };
};

export const changeObject = (changedObject) => {
  return {
    type: CHANGE_OBJECT,
    payload: changedObject,
  };
};

export const inputHandler = (key, value) => {
  return {
    type: CHANGE_PATH,
    payload: {
      key,
      value,
    },
  };
};

export const clearInputHandler = () => {
  return {
    type: CLEAR_FORM,
  };
};