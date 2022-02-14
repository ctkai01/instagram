import { Login, SignIn } from '@models/Auth';
import { ListResponsePagination, Tokens } from '@models/commom';
import { Post } from '@models/Post';
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

export const Api = {
    listPost: (page: number = 1): Promise<ListResponsePagination<Post>> => {
        const url = '/api/posts';
        return axiosClient.get(url, { params: {
            page
        } });
    },
};
