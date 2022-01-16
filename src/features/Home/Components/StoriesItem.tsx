import { Avatar } from '@components/common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface IStoriesItemProps {
    username: string;
    urlImage: string;
}

export default function StoriesItem(props: IStoriesItemProps) {
    const { username, urlImage } = props;
    return (
        <Container to='gg' hidden={true}>
            <Avatar url={urlImage} />
            <div className="username-text">{username}</div>
        </Container>
    );
}
const Container = styled(Link)`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #000;
    .image-story {
        width: 66px;
        height: 66px;
        border-radius: 50%;
    }

    .username-text {
        margin-top: 6px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 75px;
        width: 75px;
        font-size: 14px;
        line-height: 14px;
    }
`;
