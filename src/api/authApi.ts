import { Status } from '@constants/status';
import { TypeFollow } from '@constants/type-follow';
import { PayloadCreateStory } from '@features/Home/Components/Stories/CreateStory/ModalCreateStory';
import { PayloadTransformCreatePost } from '@features/UploadPost/Components/UploadImagePost';
import { Login, SignIn } from '@models/Auth';
import { Comment, CreateComment } from '@models/Comment';
import { ListResponsePagination, ResponseNoPagination, ResponseNoPaginationNoList, ResponsePagination, Tokens } from '@models/commom';
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
    searchUserHome: (search: string) => {
        const url = `api/user/home?search=${search}`;
        return axiosClient.get(url)
    },
    getUserByUserName: (userName: string) => {
        const url = `api/user/${userName}`
        return axiosClient.get(url)
    },
    followUser: (idUser: number, data: FollowUser) => {
        const url = `api/relation/follow/${idUser}`
        return axiosClient.post(url, data)
    },
    userFollower: (idUser: number, page: number = 1): Promise<ResponsePagination<User>> => {
        const url = `api/user/${idUser}/follower`
        return axiosClient.get(url,{ params: {
            page
        } })
    },
    userFollowing: (idUser: number, page: number = 1): Promise<ResponsePagination<User>> => {
        const url = `api/user/${idUser}/following`
        return axiosClient.get(url,{ params: {
            page
        } })
    },
    usersSimilar: (userName: string): Promise<ResponseNoPagination<User>> => {
        const url = `api/user/${userName}/similar_accounts`
        return axiosClient.get(url)
    },
    usersSuggested: (count: number): Promise<ResponseNoPagination<User>> => {
        const url = `api/user/suggest-for-you/?count=${count}`
        return axiosClient.get(url)
    },
    checkHasFollowing: (): Promise<ResponseNoPaginationNoList<boolean>> => {
        const url = `api/user/check-has-following`
        return axiosClient.get(url)
    },
    reactPost: (idPost: number, type: Status): Promise<ResponseNoPaginationNoList<Post>> => {
        const url = `api/posts/${idPost}/react`
        return axiosClient.post(url, { type })
    },
    commentsByIdPost: (idPost: number, page: number = 1): Promise<ResponsePagination<Comment>> => {
        const url = `api/comments/${idPost}/post`
        return axiosClient.get(url,{ params: {
            page
        } })
    },
    reactComment: (idComment: number, type: Status): Promise<ResponseNoPaginationNoList<Comment>> => {
        const url = `api/comments/${idComment}/react`
        return axiosClient.post(url, { type })
    },
    createComment: (idComment: number, data: CreateComment): Promise<ResponseNoPaginationNoList<Comment>> => {
        const url = `api/comments/${idComment}`
        return axiosClient.post(url, data)
    },
    deleteComment: (idComment: number) => {
        const url = `api/comments/${idComment}`
        return axiosClient.delete(url)
    },
    createStory: (data: FormData) => {
        const url = `api/stories`
        return axiosClient.post(url, data)
    },
};
