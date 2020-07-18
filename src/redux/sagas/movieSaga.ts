import {takeLatest, put, call} from 'redux-saga/effects';
import request from '../../utils/request';

function* searchMovie({value}: any) {
  try {
    const requestURL = `http://www.omdbapi.com/?i=tt3896198&apikey=5eec5adc&s=${value}`;
    const response = yield call(request, requestURL);
    const {Search, Response} = response;
    yield put({
      type: 'UPDATE_MOVIES',
      value: Response ? Search : [],
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchSearchMovie() {
  yield takeLatest('SEARCH_MOVIE', searchMovie);
}
