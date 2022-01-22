import * as React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

export interface IPostListProps {}

export function PostList(props: IPostListProps) {
    const postList = ['1', '2'];
    return (
        <Container>
            {postList.map((post, index) => (
                <PostItem
                    key={index}
                    userName={post}
                    urlImage={`https://picsum.photos/200/300?random=${post}`}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    background-color: #fafafa;
`;
