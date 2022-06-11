import { Modal } from '@components/common';
import { Post } from '@models/Post';
import * as React from 'react';
import styled from 'styled-components';
import PostContentModal from './PostContentModal';

export interface IDetailPostProps {
    showModalDetailPost: boolean;
    post: Post;
    handleCloseModalDetailPost: () => void;
}

export default function DetailPost(props: IDetailPostProps) {
    const { showModalDetailPost, post, handleCloseModalDetailPost } = props;
    return (
        <Container>
            <Modal
                closeButton
                content={<PostContentModal post={post}/>}
                color="rgba(0, 0, 0, 0.65)"
                showModal={showModalDetailPost}
                onCloseModal={handleCloseModalDetailPost}
            />
        </Container>
    );
}

const Container = styled.div`
  
`;
