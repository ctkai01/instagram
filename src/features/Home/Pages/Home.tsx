import { authActions } from '@features/Auth/authSlice';
import { useAppDispatch } from '@redux/hooks';
import * as React from 'react';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
    const dispatch = useAppDispatch();

    const handleLogin = () => {
        dispatch(authActions.logout())
    };
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
