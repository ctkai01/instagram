import { Post } from '@models/Post';
import * as React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

export interface IPostListProps {
    posts: Post[]
}

export function PostList(props: IPostListProps) {
    const { posts } = props;
    return (
        <Container>
            {posts.map((post, index) => (
                <PostItem
                    key={index}
                    post={post}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    background-color: #fafafa;
`;
