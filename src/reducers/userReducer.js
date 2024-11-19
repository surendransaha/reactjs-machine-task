import {
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_SUCCESS,
    UPDATE_USER_SUCCESS
  } from '../actions/userActions';
  
  const initialState = {
    users: [],
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      case CREATE_USER_FAILURE:
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          users: action.payload,
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: action.payload,
        };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  