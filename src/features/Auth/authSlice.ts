import { Login, SignIn } from '@models/Auth';
import { ErrorResponse, ResponseAuthPagination } from '@models/commom';
import { User } from '@models/User';
import { RootState } from '@redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isLoggedIn: boolean;
    loading: boolean;
    message: string;
    error: string;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoggedIn: false,
    loading: false,
    message: '',
    error: '',
    currentUser: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<Login>) {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        loginSuccess(state, action: PayloadAction<ResponseAuthPagination<User>>) {
            state.currentUser = action.payload.data.user;
            state.isLoggedIn = true;
            state.loading = false;
            state.message = action.payload.message;
            state.error = '';
        },
        loginFailed(state, action: PayloadAction<ErrorResponse>) {
            state.loading = false;
            state.message = '';
            state.error = action.payload.response.data.message;
        },
        register(state, action: PayloadAction<SignIn>) {
            state.loading = true;
            state.error = '';
            state.message = '';
        },
        registerSuccess(state, action: PayloadAction<ResponseAuthPagination<User>>) {
            state.currentUser = action.payload.data.user;
            state.isLoggedIn = true;
            state.loading = false;
            state.message = action.payload.message;
            state.error = '';
        },
        registerFailed(state, action: PayloadAction<ErrorResponse>) {
            state.loading = false;
            state.message = '';
            state.error = action.payload.response.data.message;
        },
        logout(state) {
        },
        logoutSuccess(state) {
            state.currentUser = undefined;
            state.isLoggedIn = false;
            state.loading = false;
            state.message = '';
            state.error = '';
        },
    },
});

export const authActions = authSlice.actions;

// export const submitRegister = (state: RootState) => state.auth.
export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUserAuth = (state: RootState): User => state.auth.currentUser;

const authReducer = authSlice.reducer;

export default authReducer;
