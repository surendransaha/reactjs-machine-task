export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (user) => {
  console.log("tokentokenloginSuccess", user)
  localStorage.setItem('token', user);  
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};


export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});


export const logOutRequest = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_REQUEST,
    payload: {},
  };
};

export const logOutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS',
    payload: null,
  };
};
