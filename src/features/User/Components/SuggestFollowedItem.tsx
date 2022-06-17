import { Avatar, Button } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface ISuggestFollowedItemProps {
    user: User;
    loadingFollow: boolean;
    idUserClick?: number;
    loadingUnfollow: boolean;
    handleCloseUnfollow: () => void;
    handleShowUnfollow: (user: User) => void;
    handleUnfollowUser: (idUser: number) => Promise<void>;
    handleFollowUser: (idUser: number) => Promise<void>;
}

interface StyledWallProps {
    urlReact?: string;
}

export default function SuggestFollowedItem(props: ISuggestFollowedItemProps) {
    const {
        user,
        loadingFollow,
        loadingUnfollow,
        idUserClick,
        handleShowUnfollow,
        handleCloseUnfollow,
        handleUnfollowUser,
        handleFollowUser,
    } = props;

    const urlReact = process.env.REACT_APP_URL;

    return (
        <Container urlReact={urlReact}>
            <div className="inner-content">
                <Avatar className="avatar" border="none" size="medium" url={user.avatar} />
                <div className="info">
                    <div className="user_name-container">
                        <Link className="user_name" to={`/${user.user_name}`}>
                            {user.user_name}
                        </Link>
                        {user.is_tick && (
                            <div className="check-container">
                                <div className="check-icon"></div>
                            </div>
                        )}
                    </div>
                    <div className="full_name_container">
                        <span className="full_name">{user.name}</span>
                    </div>
                </div>
                {user.is_following ? (
                    <Button handleOnClick={() => handleShowUnfollow(user)} style="border">
                        {loadingUnfollow && idUserClick === user.id ? <LoadingWhite /> : 'Following'}
                    </Button>
                ) : (
                    <Button handleOnClick={() => handleFollowUser(user.id)}>
                        {loadingFollow && idUserClick === user.id ? <LoadingWhite /> : 'Follow'}
                    </Button>
                )}
            </div>
        </Container>
    );
}

const Container = styled.div<StyledWallProps>`
    .inner-content {
        width: 68%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid rgb(219, 219, 219);
        border-radius: 4px;
    }

    .full_name_container {
        margin-bottom: 12px;
        .full_name {
            padding: 4px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #8e8e8e;
        }
    }

    .avatar {
        margin-bottom: 10px;
    }

    .user_name-container {
        display: flex;
        margin-bottom: 4px;
        justify-content: center;
        .user_name {
            color: #262626;
            text-decoration: none;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .check-container {
        margin-left: 4px;
        height: 18px;
        width: 18px;
        .check-icon {
            background-image: ${(props) => `url(${props.urlReact}/images/bgIcon2.png)`};
            background-repeat: no-repeat;
            background-position: 0 -369px;
            width: 100%;
            height: 100%;
        }
    }
`;
