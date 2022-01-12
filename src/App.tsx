import { selectIsLoggedIn } from '@features/Auth/authSlice';
import { AuthLayout, AppLayout } from '@layouts/index';
import { useAppSelector } from '@redux/hooks';
import { store } from '@redux/store';
import React from 'react';
import { lsTokenAuth } from './utils';

function App() {
    return (
        <div className="App">
            <Main />
        </div>
    );
}

function Main() {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const token = lsTokenAuth.getItem();
    return <>{isLoggedIn && token ? <AppLayout /> : <AuthLayout />}</>;
}

export default App;
