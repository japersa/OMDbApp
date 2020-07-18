import {all, fork} from 'redux-saga/effects';
import {watchSearchMovie} from './movieSaga';

export function* rootSaga() {
  yield all([fork(watchSearchMovie)]);
}
