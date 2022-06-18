import { Avatar, Button, TooltipHTML } from '@components/common';
import LoadingWhite from '@components/common/LoadingWhite';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PreviewProfile } from './Sidebar/PreviewProfile';

export interface ISuggestionsForYouItemProps {
    user: User;
    index: number;
    currentUser?: User;
    loadingUnfollow: boolean;
    loadingFollow: boolean;
    handleFollowUser: (user: User) => Promise<void>;
    handleShowUnfollow: (user: User) => void;
    handleUnfollowUser: (idUser: number) => Promise<void>;
}

export default function SuggestionsForYouItem(props: ISuggestionsForYouItemProps) {
    const {
        user,
        index,
        currentUser,
        loadingUnfollow,
        loadingFollow,
        handleShowUnfollow,
        handleUnfollowUser,
        handleFollowUser,
    } = props;
    return (
        <Container>
            <TooltipHTML
                placement="bottom-start"
                content={
                    <PreviewProfile
                        currentUser={currentUser}
                        handleUnfollowUser={handleUnfollowUser}
                        handleFollowUser={handleFollowUser}
                        loadingFollow={loadingFollow}
                        loadingUnfollow={loadingUnfollow}
                        index={index}
                        user={user}
                    />
                }
            >
                <div className="avatar_container">
                    <Avatar border="none" size="medium_center" url={user.avatar} />
                </div>
            </TooltipHTML>
            <div className="info_container">
                <TooltipHTML
                    placement="bottom-start"
                    content={
                        <PreviewProfile
                            currentUser={currentUser}
                            handleUnfollowUser={handleUnfollowUser}
                            handleFollowUser={handleFollowUser}
                            loadingFollow={loadingFollow}
                            loadingUnfollow={loadingUnfollow}
                            index={index}
                            user={user}
                        />
                    }
                >
                    <Link to={`/${user.user_name}`} className="user_name">
                        {user.user_name}
                    </Link>
                </TooltipHTML>

                <div className="full_name">{user.name}</div>
                <div className="related">Popular</div>
            </div>

            {user.is_following ? (
                <Button handleOnClick={() => handleShowUnfollow(user)} style="border" className="btn-unfollow">
                    {loadingUnfollow && currentUser?.id === user.id ? (
                        <LoadingWhite />
                    ) : (
                        'Following'
                    )}
                </Button>
            ) : (
                <Button handleOnClick={() => handleFollowUser(user)} className="btn-follow">
                    {loadingFollow && currentUser?.id === user.id ? <LoadingWhite /> : 'Follow'}
                </Button>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    padding: 8px 0;
    flex: 0 0 auto;
    align-items: center;

    .avatar_container {
        margin-right: 12px;
    }

    .info_container {
        flex: 1 1 auto;
        .user_name {
            color: #262626;
            text-decoration: none;
            font-weight: 600;
        }
        .full_name {
            color: #8e8e8e;
        }

        .related {
            font-size: 12px;
            color: #8e8e8e;
        }
    }
`;
