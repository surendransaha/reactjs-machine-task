import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  CREATE_USER_REQUEST,
  createUserSuccess,
  createUserFailure,
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  DELETE_USER_REQUEST,
  deleteUserSuccess,
  deleteUserFailure,
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure
} from '../actions/userActions';

function* createUserSaga(action) {
  try {
    const response = yield call(axios.post, '/api/users', action.payload);  
    yield put(createUserSuccess(response.data));  
  } catch (error) {
    yield put(createUserFailure(error.message));
  }
}

function* fetchUsersSaga() {
  try {
    const response = yield call(axios.get, process.env.REACT_APP_API_ENDPOINT+'/users', {
      params: {
        page: 1,
        per_page: 100
      }
    });

    if(response && response.data && response.data.data) {
      yield put(fetchUsersSuccess(response.data.data)); 
    }
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* deleteUsersSaga(action) {
  try {

    const { userId, userData } = action.payload;

    const updatedUsers = userData.filter(user => user.id !== userId);

    yield put(deleteUserSuccess(updatedUsers)); 

    console.log("DELETEVAAALLL deleteUserSuccess",userId, userData )

  } catch (error) {
    yield put(deleteUserFailure(error.message));
  }
}

function* updateUsersSaga(action) {
  try {

    const { user, userData } = action.payload;

    let index = userData.findIndex(userData => userData.id === user.id);

    if (index !== -1) {
      userData[index] = user;
    }

    yield put(updateUserSuccess(userData)); 


  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

export function* watchCreateUserRequest() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}

export function* watchFetchUsersRequest() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
  yield takeLatest(DELETE_USER_REQUEST, deleteUsersSaga);
  yield takeLatest(UPDATE_USER_REQUEST, updateUsersSaga);
}
