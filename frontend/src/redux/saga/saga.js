import { all } from 'redux-saga/effects';
import facultySaga from './faculty-saga';
import studentSaga from './student-saga';

export default function* rootSaga() {
  yield all([
    facultySaga(),
    studentSaga(),
  ]);
}