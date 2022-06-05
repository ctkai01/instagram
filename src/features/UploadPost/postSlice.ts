import { ErrorResponse, ListResponsePagination, ResponsePagination } from "@models/commom";
import { Post } from "@models/Post";
import { RootState } from '@redux/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface PostState {
    loading: boolean;
    error: string;
    posts: Post[]
}

const initialState: PostState = {
    loading: false,
    error: '',
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
            state.error = '';
        },
        fetchDataSuccess(state, action: PayloadAction<ListResponsePagination<Post>>) {
            state.posts = action.payload.data
            state.loading = false
        },
        fetchDataFailed(state, action: PayloadAction<ErrorResponse>) {
            state.loading = false;
            state.error = action.payload.response.data.message;
        },
    }
})

export const postActions = postSlice.actions;

export const selectIsLoading = (state: RootState) => state.post.loading;
export const selectError = (state: RootState) => state.post.error;
export const selectPosts= (state: RootState): Post[] => state.post.posts;

const postReducer = postSlice.reducer;
export default postReducer;