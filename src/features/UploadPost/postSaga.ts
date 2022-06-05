import { Api } from "@api/authApi";
import { ErrorResponse, ListResponsePagination, ResponsePagination } from "@models/commom";
import { Post } from "@models/Post";
import { all, call, put, take } from "redux-saga/effects";
import { postActions } from "./postSlice";


function* handleFetchPost() {
    try {
        const response: ListResponsePagination<Post> = yield Api.listPost();
        console.log(response)
        yield put(postActions.fetchDataSuccess(response))
    } catch (err) {
        const errorResponse = (err as ErrorResponse);
        yield put(postActions.fetchDataFailed(errorResponse))
    }
 
}

function* watchFetchPost() {
    while (true) {
        yield take(postActions.fetchData.type)
        yield call(handleFetchPost)
    }
}

export function* postSaga() {
    yield all([watchFetchPost()]);
}