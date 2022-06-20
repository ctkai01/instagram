import { Modal } from '@components/common';
import { Status } from '@constants/status';
import { Comment } from '@models/Comment';
import { Post } from '@models/Post';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import PostContentModal from './PostContentModal';
import { CommentPost } from './PostItem';

export interface IDetailPostProps {
    showModalDetailPost: boolean;
    post: Post;
    loadingUnLikePost: boolean;
    loadingLikePost: boolean;
    isLike: Status;
    dataComment: CommentPost;
    isLoadingComment: boolean;
    handleChangeIsLike: (type: Status) => void;
    fetchLikePost: (idPost: number) => Promise<void>;
    fetchUnLikePost: (idPost: number) => Promise<void>;
    handleCloseModalDetailPost: () => void;
    handleFollowUserPost: (post: Post, userChange: User) => void;
    handleChangeDataComment: (commentChange: Comment) => void;
    handlePostComment: (content: string) => Promise<void>;
    handleDeleteCommentPost: (isComment: number) => Promise<void>
}

export default function DetailPost(props: IDetailPostProps) {
    const {
        showModalDetailPost,
        post,
        loadingUnLikePost,
        loadingLikePost,
        isLike,
        dataComment,
        isLoadingComment,
        handleDeleteCommentPost,
        handlePostComment,
        handleChangeDataComment,
        handleFollowUserPost,
        fetchLikePost,
        fetchUnLikePost,
        handleCloseModalDetailPost,
        handleChangeIsLike,
    } = props;

    console.log('Show', showModalDetailPost);
    return (
        <Container>
            <Modal
                closeButton
                content={
                    <PostContentModal
                        dataComment={dataComment}
                        isLoadingComment={isLoadingComment}
                        handleFollowUserPost={handleFollowUserPost}
                        handleChangeIsLike={handleChangeIsLike}
                        fetchUnLikePost={fetchUnLikePost}
                        fetchLikePost={fetchLikePost}
                        handleChangeDataComment={handleChangeDataComment}
                        isLike={isLike}
                        loadingLikePost={loadingLikePost}
                        loadingUnLikePost={loadingUnLikePost}
                        handlePostComment={handlePostComment}
                        handleDeleteCommentPost={handleDeleteCommentPost}
                        post={post}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showModalDetailPost}
                onCloseModal={handleCloseModalDetailPost}
            />
        </Container>
    );
}

const Container = styled.div``;
