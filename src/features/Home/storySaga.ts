import { Api } from "@api/authApi";
import { ErrorResponse } from "@models/commom";
import { User } from "@models/User";
import { all, call, put, take } from "redux-saga/effects";
import { ResponseNoPagination } from './../../models/commom';
import { storyActions } from "./storySlice";


function* handleFetchStoryUSer() {
    try {
        const response: ResponseNoPagination<User> = yield Api.getStory();
        console.log(response)
        yield put(storyActions.fetchDataSuccess(response))
    } catch (err) {
        const errorResponse = (err as ErrorResponse);
        yield put(storyActions.fetchDataFailed(errorResponse))
    }
 
}

function* watchFetchStory() {
    while (true) {
        yield take(storyActions.fetchData.type)
        yield call(handleFetchStoryUSer)
    }
}

export function* storySaga() {
    yield all([watchFetchStory()]);
}