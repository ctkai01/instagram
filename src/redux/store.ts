import authReducer from '@features/Auth/authSlice';
import createSagaMiddleware from '@redux-saga/core';
import {
    Action,
    combineReducers, configureStore,
    ThunkAction
} from '@reduxjs/toolkit';
import { history } from '@utils/history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import rootSaga from './rootSaga';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    transforms: [
        createBlacklistFilter('auth', ['loading', 'message', 'error'])
    ],
};

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
});

const persistReduce = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: persistReduce,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware, logger, routerMiddleware(history)),
});

export const persistSto = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
