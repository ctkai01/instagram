import { Avatar } from '@components/common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddCircleIcon from '@material-ui/icons/AddCircle';
export interface IStoriesItemProps {
    username: string;
    urlImage: string;
    me: boolean;
    handleShowCreateStory?: () => void
}

export default function StoriesItem(props: IStoriesItemProps) {
    const { username, urlImage, me, handleShowCreateStory } = props;

    if (me) {
        return (
            <Wrapper>
                <AddCircleIcon onClick={handleShowCreateStory} className="add-story-icon" />
                <Container to="gg">
                    <Avatar url={urlImage} />
                    <div className="username-text">{username}</div>
                </Container>
            </Wrapper>
        );
    }

    return (
        <Container to="gg">
            <Avatar url={urlImage} />
            <div className="username-text">{username}</div>
        </Container>
    );
}
const Wrapper = styled.div`
    /* display: flex; */
    position: relative;
    .add-story-icon {
        position: absolute;
        top: 44%;
        left: -2px;
        cursor: pointer;
        z-index: 2;
        transform: translateY(-50%);
    }
`;

const Container = styled(Link)`
    /* height: 83px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #000;

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
