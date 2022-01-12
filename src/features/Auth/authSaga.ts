import { AuthApi } from '@api/authApi';
import { Login, SignIn } from '@models/Auth';
import { ErrorResponse, ResponseAuthPagination } from '@models/commom';
import { User } from '@models/User';
import { store } from '@redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { PATH_BASE } from '@routes/index';
import { lsTokenAuth, lsRefreshTokenAuth } from '@utils/index';
import { push } from 'connected-react-router';
import { all, call, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* handleRegister(payload: SignIn) {
    try {
        const response: ResponseAuthPagination<User> = yield AuthApi.register(payload);
        yield put(authActions.registerSuccess(response));
        lsTokenAuth.setItem(response.data.tokens.access_token)
        lsRefreshTokenAuth.setItem(response.data.tokens.refresh_token)
        
    } catch (error) {
        const errorResponse = (error as ErrorResponse);
        yield put(authActions.registerFailed(errorResponse))
    }
}

function* handleLogin(payload: Login) {
    try {
        console.log('Handle Loggin')
        const response: ResponseAuthPagination<User> = yield AuthApi.login(payload)
        yield put(authActions.loginSuccess(response))
        lsTokenAuth.setItem(response.data.tokens.access_token)
        lsRefreshTokenAuth.setItem(response.data.tokens.refresh_token)
    } catch (err) {
        const errorResponse = (err as ErrorResponse);
        yield put(authActions.loginFailed(errorResponse))
    }
}

function* handleLogout() {
    try {
        yield AuthApi.logout()
        // yield put(push(PATH_BASE))

    } catch (ex) {
        // console.log('ERRRRR')
    }
}

function* watchRegisterFlow() {
    while (true) {
        const action: PayloadAction<SignIn> = yield take(authActions.register.type);
        yield fork(handleRegister, action.payload);
    }
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = store.getState().auth.isLoggedIn
        if (!isLoggedIn) {
            const action: PayloadAction<Login> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload)
        } 
    }
}

function* watchLogout() {
    while (true) {
        yield take(authActions.logout.type)
        yield call(handleLogout)
        yield put(authActions.logoutSuccess())
    }
}

export function* authSaga() {
    yield all([watchRegisterFlow(), watchLoginFlow(), watchLogout()]);
}
