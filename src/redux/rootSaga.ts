import { authSaga } from '@features/Auth/authSaga';
import { all } from 'redux-saga/effects';



export default function* rootSaga() {
    console.log('Root saga');
    yield all([authSaga()]);
}
