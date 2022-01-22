import { Login, SignIn } from '@models/Auth';
import { Tokens } from '@models/commom';
import { User } from '@models/User';
import { lsRefreshTokenAuth } from '@utils/storage';
import { axiosClient } from './axiousClient';

export const AuthApi = {
    login: (data: Login) => {
        const url = 'api/auth/login';
        return axiosClient.post(url, data);
    },
    register: (data: SignIn): Promise<User> => {
        const url = 'api/auth/signup';
        return axiosClient.post(url, data);
    },
    logout: () => {
        const url = 'api/auth/logout';
        return axiosClient.post(url);
    },
    refreshToken: (): Promise<Tokens> => {
        const url = 'api/auth/refreshToken';
        return axiosClient.post(url);
    },
};
