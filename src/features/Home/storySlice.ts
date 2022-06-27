import { ErrorResponse } from "@models/commom";
import { Post } from "@models/Post";
import { User } from "@models/User";
import { RootState } from '@redux/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseNoPagination } from './../../models/commom';


export interface StoryState {
    loading: boolean;
    error: string;
    users: User[]
}

const initialState: StoryState = {
    loading: false,
    error: '',
    users: []
}

// export interface UserPost {
//     post: Post;
//     user: User
// }

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
            state.error = '';
        },
        fetchDataSuccess(state, action: PayloadAction<ResponseNoPagination<User>>) {
            state.users = action.payload.data
            state.loading = false
        },
        fetchDataFailed(state, action: PayloadAction<ErrorResponse>) {
            state.loading = false;
            state.error = action.payload.response.data.message;
        },
        // changeDataPost(state, action: PayloadAction<Post>) {
        //     const clonePost = [...state.posts]
        //     const postExist = clonePost.find(post => action.payload.id === post.id)

        //     if (postExist) {
        //         postExist.like_count = action.payload.like_count;
        //         postExist.is_like = action.payload.is_like;
        //         clonePost[clonePost.findIndex(post => action.payload.id === post.id)] = postExist
               
        //         state.posts = clonePost

        //     } else {
        //         state.posts = clonePost
        //     }
        // },
        // changeDataUserPost(state, action: PayloadAction<UserPost>) {
        //     const clonePost = [...state.posts]
        //     const postExist = clonePost.find(post => action.payload.post.id === post.id)

        //     if (postExist) {
        //         postExist.created_by.is_following = action.payload.user.is_following;
        //         postExist.created_by.count_follower = action.payload.user.count_follower;
        //         postExist.created_by.count_following = action.payload.user.count_following;
        //         clonePost[clonePost.findIndex(post => action.payload.post.id === post.id)] = postExist
               
        //         state.posts = clonePost

        //     } else {
        //         state.posts = clonePost
        //     }
        // }
    }
})

export const storyActions = storySlice.actions;

export const selectIsLoading = (state: RootState) => state.story.loading;
export const selectError = (state: RootState) => state.story.error;
export const selectStories= (state: RootState): User[] => state.story.users;

const storyReducer = storySlice.reducer;
export default storyReducer;