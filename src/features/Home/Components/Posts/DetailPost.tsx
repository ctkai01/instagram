import { Modal } from '@components/common';
import { Status } from '@constants/status';
import { Post } from '@models/Post';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import PostContentModal from './PostContentModal';

export interface IDetailPostProps {
    showModalDetailPost: boolean;
    post: Post;
    loadingUnLikePost: boolean;
    loadingLikePost: boolean;
    isLike: Status;
    handleChangeIsLike: (type: Status) => void;
    fetchLikePost: (idPost: number) => Promise<void>;
    fetchUnLikePost: (idPost: number) => Promise<void>;
    handleCloseModalDetailPost: () => void;
    handleFollowUserPost: (post: Post, userChange: User) => void;
}

export default function DetailPost(props: IDetailPostProps) {
    const { showModalDetailPost, post, loadingUnLikePost, loadingLikePost, isLike, handleFollowUserPost, fetchLikePost, fetchUnLikePost, handleCloseModalDetailPost, handleChangeIsLike } = props;
    return (
        <Container>
            <Modal
                closeButton
                content={<PostContentModal handleFollowUserPost={handleFollowUserPost} handleChangeIsLike={handleChangeIsLike} fetchUnLikePost={fetchUnLikePost} fetchLikePost={fetchLikePost} isLike={isLike} loadingLikePost={loadingLikePost} loadingUnLikePost={loadingUnLikePost} post={post}/>}
                color="rgba(0, 0, 0, 0.65)"
                showModal={showModalDetailPost}
                onCloseModal={handleCloseModalDetailPost}
            />
        </Container>
    );
}

const Container = styled.div`
  
`;
