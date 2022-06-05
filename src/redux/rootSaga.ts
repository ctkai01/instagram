import { authSaga } from '@features/Auth/authSaga';
import { postSaga } from '@features/UploadPost/postSaga';
import { all } from 'redux-saga/effects';



export default function* rootSaga() {
    console.log('Root saga');
    yield all([authSaga(), postSaga()]);
}
