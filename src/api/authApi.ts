import { Login, SignIn } from '@models/Auth';
import { Tokens } from '@models/commom';
import { User } from '@models/User';
import { lsRefreshTokenAuth } from '@utils/storage';
import { axiosClient } from './axiousClient';

export const AuthApi = {
    login: (data: Login) => {
        const url = 'auth/login';
        return axiosClient.post(url, data);
    },
    register: (data: SignIn): Promise<User> => {
        const url = 'auth/signup';
        return axiosClient.post(url, data);
    },
    logout: () => {
        const url = 'auth/logout';
        return axiosClient.post(url);
    },
    refreshToken: (): Promise<Tokens> => {
        const url = '/auth/refreshToken';
        return axiosClient.post(url);
    },
};
