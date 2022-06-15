import { Avatar, Button, TooltipHTML } from '@components/common';
import LoadingSpecify from '@components/common/LoadingSpecify';
import { CloseIcon, TickIcon } from '@components/Icons';
import { PreviewProfile } from '@features/Home/Components/Sidebar/PreviewProfile';
import { FollowUser } from '@hooks/useFollowUser';
import { User } from '@models/User';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import InfiniteScroll from 'react-infinite-scroller';
import InfiniteScroll from "react-infinite-scroll-component";
import InfoUser from './InfoUser';

export interface IFollowingPaperProps {
    idUser: number;
    loadingFollowingUser: boolean;
    usersFollowing: FollowUser;
    fetchListFollowing: (idUser: number, page?: number) => Promise<void>;
    handleCloseFollowing: () => void;
}

export default function FollowingPaper(props: IFollowingPaperProps) {
    const {
        idUser,
        usersFollowing,
        loadingFollowingUser,
        handleCloseFollowing,
        fetchListFollowing,
    } = props;
    console.log('Data', usersFollowing);
    
    const [moreLoading, setMoreLoading] = React.useState<boolean>(true)

    const fetchMoreData = async () => {
        if (usersFollowing.currentPage !== usersFollowing.lastPage && !loadingFollowingUser) {
            await fetchListFollowing(idUser, usersFollowing.currentPage + 1);
        } else {
            setMoreLoading(false)
        }
    }

    return (
        <Container>
            {/* {loadingFollowingUser && (
                <div className="loading-container">
                    <LoadingSpecify />
                </div>
            )} */}

            {true && (
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
                                <InfoUser key={index} index={index} user={user}/>
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
