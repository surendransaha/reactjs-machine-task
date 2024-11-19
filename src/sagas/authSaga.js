import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_REQUEST, loginSuccess, loginFailure, LOGOUT_REQUEST, logOutSuccess } from '../actions/authActions';

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(axios.post, process.env.REACT_APP_API_ENDPOINT+'/login', { email, email, password });
    
    console.log("responseNew", response)
    if(response && response.data && response.data.token){
      yield put(loginSuccess(response.data.token));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logOutSaga() {
  try {
    yield put(logOutSuccess());
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logOutSaga);
}
