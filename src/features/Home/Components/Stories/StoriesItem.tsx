import { Avatar } from '@components/common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ViewStory } from '@models/Story';
import { User } from '@models/User';
export interface IStoriesItemProps {
    username: string;
    urlImage: string;
    me: boolean;
    user?: User;
    view_all_story?: ViewStory;
    handleShowCreateStory?: () => void;
}

export default function StoriesItem(props: IStoriesItemProps) {
    const { user, username, urlImage, me, view_all_story, handleShowCreateStory } = props;
    console.log('Status', view_all_story)

    // let idFirstStory = 1
    // if (user) {
    //     idFirstStory = user.stories ? user.stories[0].id : 1
    // }
    if (me) {
        return (
            <Wrapper>
                <AddCircleIcon onClick={handleShowCreateStory} className="add-story-icon" />
                <ContainerMe>
                    <Avatar url={urlImage} border="none"/>
                    <div className="username-text">{username}</div>
                </ContainerMe>
            </Wrapper>
        );
    }

    return (
        <Container>
            <Link to={`/stories/${username}`}><Avatar url={urlImage} border={`${view_all_story === ViewStory.SEE ? 'watch' : 'watched'}`}/></Link>
            <Link to={`/${username}`} className="username-text">{username}</Link>
        </Container>
    );
}
const Wrapper = styled.div`
    /* display: flex; */
    cursor: pointer;
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

const Container = styled.div`
    /* height: 83px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
        text-decoration: none;
        color: #000;

    }
`;

const ContainerMe = styled.div`
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
