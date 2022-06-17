import { Avatar, Button, TooltipHTML } from '@components/common';
import LoadingSpecify from '@components/common/LoadingSpecify';
import { CloseIcon, TickIcon } from '@components/Icons';
import { TypeFollow, TypeFollowUser } from '@constants/type-follow';
import { PreviewProfile } from '@features/Home/Components/Sidebar/PreviewProfile';
import { useFollow } from '@hooks/useFollow';
import { FollowUser } from '@hooks/useFollowUser';
import { User } from '@models/User';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InfoUser from './InfoUser';

export interface IFollowerPaperProps {
    idUser: number;
    loadingFollowerUser: boolean;
    usersFollower: FollowUser;
    handleChangeUserFollowingFollower: (user: User, type: TypeFollowUser) => void;
    fetchListFollower: (idUser: number, page?: number) => Promise<void>;
    handleCloseFollower: () => void;
}

export default function FollowerPaper(props: IFollowerPaperProps) {
    const {
        idUser,
        usersFollower,
        loadingFollowerUser,
        handleChangeUserFollowingFollower,
        fetchListFollower,
        handleCloseFollower,
    } = props;
    console.log('Data', usersFollower);

    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);
    const [moreLoading, setMoreLoading] = React.useState<boolean>(true);

    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });
    const [currentUser, setCurrentUser] = React.useState<User>();

    React.useEffect(() => {
        if (dataUnfollow) {
            handleChangeUserFollowingFollower(dataUnfollow, TypeFollowUser.FOLLOWER);
        }
    }, [dataUnfollow]);

    React.useEffect(() => {
        if (dataFollow) {
            handleChangeUserFollowingFollower(dataFollow, TypeFollowUser.FOLLOWER);
        }
    }, [dataFollow]);

    const handleCloseUnfollow = () => {
        setShowUnfollow(false);
    };

    const handleShowUnfollow = (user: User) => {
        setCurrentUser(user);
        setShowUnfollow(true);
    };

    const fetchMoreData = async () => {
        if (usersFollower.currentPage !== usersFollower.lastPage && !loadingFollowerUser) {
            await fetchListFollower(idUser, usersFollower.currentPage + 1);
        } else {
            setMoreLoading(false);
        }
    };

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleFollowUser = async (idUser: number) => {
        await fetchFollowUser(idUser);
    };
    return (
        <Container>
            {/* {loadingFollowerUser && (
                <div className="loading-container">
                    <LoadingSpecify />
                </div>
            )} */}
            {true && (
                <>
                    <div className="header">
                        <div className="text">Follower</div>
                        <button className="btn-close" onClick={handleCloseFollower}>
                            <CloseIcon size={18} color="black" />
                        </button>
                    </div>
                    <div className="list-user">
                        <InfiniteScroll
                            style={{ overflow: 'hidden', overflowY: 'scroll' }}
                            next={fetchMoreData}
                            height={338}
                            hasMore={moreLoading}
                            dataLength={usersFollower.data.length}
                            loader={<LoadingSpecify key={0} size="small" />}
                        >
                            {usersFollower.data.map((user, index) => (
                                <InfoUser
                                    handleUnfollowUser={handleUnfollowUser}
                                    handleShowUnfollow={handleShowUnfollow}
                                    handleFollowUser={handleFollowUser}
                                    loadingUnfollow={loadingUnfollow}
                                    loadingFollow={loadingFollow}
                                    key={index}
                                    index={index}
                                    user={user}
                                    currentUser={currentUser}
                                />
                            ))}
                        </InfiniteScroll>
                    </div>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 400px;
    max-height: 400px;
    min-height: 200px;
    background-color: #fff;
    border-radius: 10px;

    .loading-container {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .list-user {
        /* overflow: hidden;
        overflow-y: scroll; */
        height: 338px;
    }

    .header {
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-bottom: 1px solid rgb(219, 219, 219);
        .text {
            color: '#262626';
            font-weight: 600;
            font-size: 16px;
        }

        .btn-close {
            position: absolute;
            right: 5px;
            padding: 8px;
            background: none;
            border: none;
            cursor: pointer;
        }
    }
`;
