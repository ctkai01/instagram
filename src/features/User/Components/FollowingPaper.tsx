import { Avatar, Button, Modal, TooltipHTML } from '@components/common';
import LoadingSpecify from '@components/common/LoadingSpecify';
import { CloseIcon, TickIcon } from '@components/Icons';
import { PreviewProfile } from '@features/Home/Components/Sidebar/PreviewProfile';
import { FollowUser } from '@hooks/useFollowUser';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfoUser from './InfoUser';
import { TypeFollow, TypeFollowUser } from '@constants/type-follow';
import { useFollow } from '@hooks/useFollow';
import UnfollowPaper from './UnfollowPaper';
import LoadingWhite from '@components/common/LoadingWhite';

export interface IFollowingPaperProps {
    idUser: number;
    loadingFollowingUser: boolean;
    usersFollowing: FollowUser;
    handleChangeUserFollowingFollower: (user: User, type: TypeFollowUser) => void;
    fetchListFollowing: (idUser: number, page?: number) => Promise<void>;
    handleCloseFollowing: () => void;
}

export default function FollowingPaper(props: IFollowingPaperProps) {
    const {
        idUser,
        usersFollowing,
        loadingFollowingUser,
        handleChangeUserFollowingFollower,
        handleCloseFollowing,
        fetchListFollowing,
    } = props;
    console.log('Data', usersFollowing);
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
            handleChangeUserFollowingFollower(dataUnfollow, TypeFollowUser.FOLLOWING);
        }
    }, [dataUnfollow]);

    React.useEffect(() => {
        if (dataFollow) {
            handleChangeUserFollowingFollower(dataFollow, TypeFollowUser.FOLLOWING);
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
        if (usersFollowing.currentPage !== usersFollowing.lastPage && !loadingFollowingUser) {
            await fetchListFollowing(idUser, usersFollowing.currentPage + 1);
        } else {
            setMoreLoading(false);
        }
    };

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleFollowUser = async (user: User) => {
        setCurrentUser(user)
        await fetchFollowUser(user.id);
    };

    return (
        <Container>
            {/* {loadingFollowingUser && (
                <div className="loading-container">
                    <LoadingSpecify />
                </div>
            )} */}
            {currentUser && (
                <Modal
                    content={
                        <UnfollowPaper
                            handleCloseUnfollow={handleCloseUnfollow}
                            handleUnfollowUser={handleUnfollowUser}
                            user={currentUser}
                        />
                    }
                    zIndexDepth="second"
                    color="rgba(0, 0, 0, 0.65)"
                    showModal={showUnfollow}
                    onCloseModal={handleCloseUnfollow}
                />
            )}
            <>
                <div className="header">
                    <div className="text">Following</div>
                    <button className="btn-close" onClick={handleCloseFollowing}>
                        <CloseIcon size={18} color="black" />
                    </button>
                </div>
                <div className="list-user">
                    <InfiniteScroll
                        style={{ overflow: 'hidden', overflowY: 'scroll' }}
                        next={fetchMoreData}
                        height={338}
                        hasMore={moreLoading}
                        dataLength={usersFollowing.data.length}
                        loader={<LoadingSpecify key={0} size="small" />}
                    >
                        {usersFollowing.data.map((user, index) => (
                            <InfoUser
                                handleShowUnfollow={handleShowUnfollow}
                                handleUnfollowUser={handleUnfollowUser}
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
        /* overflow: hidden; */
        /* overflow-y: scroll; */
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
