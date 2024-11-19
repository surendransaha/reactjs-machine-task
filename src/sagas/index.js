import { all } from 'redux-saga/effects';
import { watchLoginRequest } from './authSaga';
import { watchCreateUserRequest, watchFetchUsersRequest } from './userSaga';

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
    watchCreateUserRequest(),
    watchFetchUsersRequest(),
  ]);
}
