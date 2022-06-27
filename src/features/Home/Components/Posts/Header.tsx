import { Avatar } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { TickSmallIcon } from '@components/Icons';
import { Post } from '@models/Post';
import { ViewStory } from '@models/Story';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ActionPost } from './ActionPost';

export interface IHeaderProps {
    urlImage: string;
    userName: string;
    userAuth: User;
    post: Post;
    loadingUnfollow: boolean;
    loadingFollow: boolean;
    handleFollowUser: (user: User) => void;
    handleShowActionModal: () => void;
}

export function Header(props: IHeaderProps) {
    const {
        urlImage,
        post,
        userAuth,
        userName,
        loadingUnfollow,
        loadingFollow,
        handleFollowUser,
        handleShowActionModal,
    } = props;

    return (
        <Container>
            <header>
                <div className="user_name_wrapper">
                    {post.created_by.view_all_story === ViewStory.NONE ? (
                        <>
                            <Link to={`/${userName}`} >
                                <Avatar
                                    border="none"
                                    className="avatar-user"
                                    url={urlImage}
                                    size="small-medium"
                                />
                            </Link>

                            <Link to={`/${userName}`} className="username">
                                {userName}
                            </Link>
                        </>
                    ) : (
                        <>  
                            <Link to={`/stories/${post.created_by.user_name}`}>
                            <Avatar
                                border={`${
                                    post.created_by.view_all_story === ViewStory.SEE
                                        ? 'watch'
                                        : 'watched'
                                }`}
                                className="avatar-user"
                                url={urlImage}
                                size="small-medium"
                            />
                            </Link>
                            
                            <Link to={`/${userName}`} className="username">
                                {userName}
                            </Link>
                        </>
                    )}
                    {/* <Avatar
                        border={`${
                            post.created_by.view_all_story === ViewStory.SEE ? 'watch' : 'watched'
                        }`}
                        className="avatar-user"
                        url={urlImage}
                        size="small-medium"
                    />
                    <Link to={`/${userName}`} className="username">
                        {userName}
                    </Link> */}
                    {!!post.created_by.is_tick && <TickSmallIcon className="tick" />}
                </div>
                {userAuth.id !== post.created_by.id && (
                    <div className="following-text-wrapper">
                        <span></span>
                        {post.created_by.is_following ? (
                            <div>{loadingUnfollow ? <LoadingWhite /> : 'Following'}</div>
                        ) : (
                            <div
                                onClick={() => handleFollowUser(post.created_by)}
                                style={{ cursor: 'pointer', color: '#0095f6' }}
                            >
                                {loadingFollow ? <LoadingWhite /> : 'Follow'}
                            </div>
                        )}
                    </div>
                )}
            </header>
            <ActionPost handleShowActionModal={handleShowActionModal} className="action-post" />
        </Container>
    );
}

const Container = styled.div`
    z-index: 0;
    position: relative;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(219, 219, 219, 1);
    border-bottom: none;

    .user_name_wrapper {
        margin-left: 14px;
        font-weight: 600;
        color: #262626;
        display: flex;
        align-items: center;
    }

    header {
        display: flex;
        align-items: center;
        padding: 14px 4px 14px 16px;
        width: calc(100% - 54px);
        .username {
            margin-left: 14px;
            margin-right: 5px;
            max-width: calc(100% - 54px);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-decoration: none;
            color: #262626;
        }
    }

    .following-text-wrapper {
        color: #262626;
        font-weight: 600;
        display: flex;
        align-items: center;
        span {
            display: inline-block;
            margin: 0 4px;
            font-weight: 600;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #000;
        }
    }
`;
