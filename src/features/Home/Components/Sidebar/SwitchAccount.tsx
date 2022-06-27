import { Avatar } from '@components/common';
import { selectUserAuth } from '@features/Auth/authSlice';
import { ViewStory } from '@models/Story';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface ISwitchAccountProps {}

export function SwitchAccount(props: ISwitchAccountProps) {
    const userAuth = useAppSelector(selectUserAuth);
    // <Link to={`/stories/${post.created_by.user_name}`}>

    return (
        <Container>
            <div className="current-account-wrapper">
                {userAuth.view_all_story === ViewStory.NONE ? (
                    <>
                         <Link to={`/${userAuth.user_name}`} className="username">
                            <Avatar
                                className="avatar-account"
                                border='none'
                                url={userAuth.avatar}
                            />
                        </Link>

                        <div className="name-account-wrapper">
                            <Link to={`/${userAuth.user_name}`} className="username">
                                {userAuth.user_name}
                            </Link>
                            <div className="full-name">{userAuth.name}</div>
                        </div>
                    
                    </>
                ) : (
                    <>
                        <Link to={`/stories/${userAuth.user_name}`} className="username">
                            <Avatar
                                className="avatar-account"
                                border={`${
                                    userAuth.view_all_story === ViewStory.SEE ? 'watch' : 'watched'
                                }`}
                                url={userAuth.avatar}
                            />
                        </Link>

                        <div className="name-account-wrapper">
                            <Link to={`/${userAuth.user_name}`} className="username">
                                {userAuth.user_name}
                            </Link>
                            <div className="full-name">{userAuth.name}</div>
                        </div>
                    </>
                )}
            </div>
            <div className="switch-button">Switch</div>
        </Container>
    );
}

const Container = styled.div`
    z-index: 0;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;

    .current-account-wrapper {
        display: flex;
        align-items: center;
        flex: 15;

        .avatar-account {
            flex: 1;
            cursor: pointer;
        }

        .name-account-wrapper {
            margin-left: 25px;
            flex: 3;
            cursor: pointer;
        }

        .username {
            font-weight: 600;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 180px;
            color: #262626;
            text-decoration: none;
        }

        .full-name {
            color: #8e8e8e;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 180px;
        }
    }

    .switch-button {
        flex: 1;
        color: #0095f6;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
    }
`;
