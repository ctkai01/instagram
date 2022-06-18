import { Avatar, Button, Modal, TooltipHTML } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { TickIcon } from '@components/Icons';
import { TypeFollow, TypeFollowUser } from '@constants/type-follow';
import { selectUserAuth } from '@features/Auth/authSlice';
import { PreviewProfile } from '@features/Home/Components/Sidebar/PreviewProfile';
import { useFollow } from '@hooks/useFollow';
import { User } from '@models/User';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UnfollowPaper from './UnfollowPaper';

export interface IInfoUserProps {
    currentUser?: User;
    user: User;
    index: number;
    loadingUnfollow: boolean;
    loadingFollow: boolean;
    handleShowUnfollow: (user: User) => void;
    handleFollowUser: (user: User) => Promise<void>;
    handleUnfollowUser: (idUser: number) => Promise<void>;
}

export default function InfoUser(props: IInfoUserProps) {
    const {
        user,
        currentUser,
        index,
        loadingFollow,
        loadingUnfollow,
        handleFollowUser,
        handleUnfollowUser,
        handleShowUnfollow,
    } = props;
    // const [userInfo, setUserInfo] = React.us
    const useAuth = useAppSelector(selectUserAuth);

    return (
        <>
            <Container>
                <div className="info-container">
                    <TooltipHTML
                        placement="bottom-start"
                        content={<PreviewProfile index={index} loadingUnfollow={loadingUnfollow} loadingFollow={loadingFollow} handleFollowUser={handleFollowUser} handleUnfollowUser={handleUnfollowUser} key={`${index}@`} user={user} />}
                    >
                        <Avatar
                            className="avatar"
                            size="small-medium"
                            // url="https://picsum.photos/200/300?random=3"
                            url={user.avatar}
                        />
                    </TooltipHTML>

                    <div className="info-name">
                        <TooltipHTML
                            placement="bottom-start"
                            content={<PreviewProfile index={index} loadingUnfollow={loadingUnfollow} loadingFollow={loadingFollow} handleFollowUser={handleFollowUser} handleUnfollowUser={handleUnfollowUser} key={`${index}@`} user={user} />}
                        >
                            <div className="user_name-container">
                                <Link className="user_name" to={`/${user.user_name}`}>
                                    {user.user_name}
                                </Link>
                                <TickIcon />
                            </div>
                        </TooltipHTML>

                        <div className="name-user">{user.name}</div>
                    </div>
                </div>

                {!!(useAuth.id !== user.id && user.is_following) && (
                    <Button handleOnClick={() => handleShowUnfollow(user)} style="border">
                        {loadingUnfollow && currentUser?.id === user.id ? (
                            <LoadingWhite />
                        ) : (
                            'Following'
                        )}
                    </Button>
                )}
                {(useAuth.id !== user.id && !user.is_following) && (
                    <Button handleOnClick={() => handleFollowUser(user)}>
                        {loadingFollow && currentUser?.id === user.id ? (
                            <LoadingWhite />
                        ) : (
                            'Follow'
                        )}
                    </Button>
                )}
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .user_name-container {
        display: flex;
        align-content: center;
    }

    .name-user {
        color: #8e8e8e;
    }

    .user_name {
        font-weight: 600;
        color: #262626;
        text-decoration: none;
        margin-right: 5px;

        &:hover {
            text-decoration: underline;
        }
    }

    .avatar {
        margin: 4px 13px 4px 4px;
    }
    .info-container {
        display: flex;
        align-items: center;
    }
`;
