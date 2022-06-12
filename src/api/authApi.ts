import { TypeFollow } from '@constants/type-follow';
import { PayloadTransformCreatePost } from '@features/UploadPost/Components/UploadImagePost';
import { Login, SignIn } from '@models/Auth';
import { ListResponsePagination, Tokens } from '@models/commom';
import { Post } from '@models/Post';
import { FollowUser, User } from '@models/User';
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
    createPost: (data: FormData) => {
        const url = 'api/posts';
        return axiosClient.post(url, data)
    },
    searchUser: (search: string) => {
        const url = `api/user?search=${search}`;
        return axiosClient.get(url)
    },
    getUserByUserName: (userName: string) => {
        const url = `api/user/${userName}`
        return axiosClient.get(url)
    },
    followUser: (idUser: number, data: FollowUser) => {
        const url = `api/relation/follow/${idUser}`
        return axiosClient.post(url, data)
    }
};
