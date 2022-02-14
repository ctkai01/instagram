import { Post } from '@models/Post';
import * as React from 'react';
import styled from 'styled-components';
import { ActionReactPost } from './ActionReactPost';
import { ContentPost } from './ContentPost';
import { Header } from './Header';
import PhotoList from './PhotoList';

export interface IPostItemProps {
    post: Post;
}

export default function PostItem(props: IPostItemProps) {
    const { post } = props;
    return (
        <Container>
            <Header urlImage={post.created_by.avatar} userName={post.created_by.user_name} />
            <PhotoList media={post.media} />
            <ActionReactPost />
            <ContentPost
                content={post.caption}
                time={post.created_at}
                author={post.created_by.user_name}
            />
        </Container>
    );
}

const Container = styled.div`
    background-color: #fff;
    margin-bottom: 24px;
`;
