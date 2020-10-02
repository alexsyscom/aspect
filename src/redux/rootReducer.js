import initialState from "./initialState";
import {
  ADD_OBJECT,
  CHANGE_OBJECT,
  CHANGE_PATH,
  CHANGE_VALUE,
  CLEAR_FORM,
} from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OBJECT:
      return { ...state, content: [...action.payload.content] };

    case CHANGE_OBJECT:
      return { ...state, content: [...action.payload.content] };
    case CHANGE_PATH:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case CHANGE_VALUE:
      return { ...state, ...state.inputs, input: action.payload };
    case CLEAR_FORM:
      return { ...state, path: "", value: "" };
    default:
      return state;
  }
};

export default rootReducer;
