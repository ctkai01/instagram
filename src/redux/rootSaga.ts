import { authSaga } from '@features/Auth/authSaga';
import { storySaga } from '@features/Home/storySaga';
import { postSaga } from '@features/UploadPost/postSaga';
import { all } from 'redux-saga/effects';



export default function* rootSaga() {
    console.log('Root saga');
    yield all([authSaga(), postSaga(), storySaga()]);
}
