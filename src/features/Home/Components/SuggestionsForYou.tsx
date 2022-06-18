import { Button, Modal } from '@components/common';
import { FollowStatus } from '@constants/follow-status';
import { TypeFollow } from '@constants/type-follow';
import UnfollowPaper from '@features/User/Components/UnfollowPaper';
import { useFollow } from '@hooks/useFollow';
import { User } from '@models/User';
import { Skeleton } from '@mui/material';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import SuggestionsForYouItem from './SuggestionsForYouItem';

export interface ISuggestionsForYouProps {
    usersSuggest: User[];
    handleChangeUserSuggested: (user: User) => void;
}

export default function SuggestionsForYou(props: ISuggestionsForYouProps) {
    const history = useHistory();
    const { usersSuggest, handleChangeUserSuggested } = props;

    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);

    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });

    const [currentUser, setCurrentUser] = React.useState<User>();

    React.useEffect(() => {
        if (dataUnfollow) {
            handleChangeUserSuggested(dataUnfollow);
            // handleChangeUserFollowingFollower(dataUnfollow, TypeFollowUser.FOLLOWING);
        }
    }, [dataUnfollow]);

    React.useEffect(() => {
        if (dataFollow) {
            handleChangeUserSuggested(dataFollow);

            // handleChangeUserFollowingFollower(dataFollow, TypeFollowUser.FOLLOWING);
        }
    }, [dataFollow]);

    const handleCloseUnfollow = () => {
        setShowUnfollow(false);
    };

    const handleShowUnfollow = (user: User) => {
        setCurrentUser(user);
        setShowUnfollow(true);
    };

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleFollowUser = async (user: User) => {
        setCurrentUser(user);
        await fetchFollowUser(user.id);
    };
    const checkGetStated = usersSuggest.find((users) => users.is_following === FollowStatus.FOLLOW);

    const handleClickGetStarted = () => {
        window.location.reload()
        console.log(1)
    }

    return (
        <>
            <Container>
                <h4> {usersSuggest.length ? 'Suggestions For You' : <Skeleton />}</h4>
                <div className="wrapper_suggestion_users">
                    {!!usersSuggest.length
                        ? usersSuggest.map((user, index) => (
                              <SuggestionsForYouItem
                                  handleShowUnfollow={handleShowUnfollow}
                                  currentUser={currentUser}
                                  handleUnfollowUser={handleUnfollowUser}
                                  handleFollowUser={handleFollowUser}
                                  loadingFollow={loadingFollow}
                                  loadingUnfollow={loadingUnfollow}
                                  key={index}
                                  index={index}
                                  user={user}
                              />
                          ))
                        : Array.from(Array(20).keys()).map((el, index) => (
                              <Skeleton key={index} style={{ width: '100%', height: '74px' }} />
                          ))}
                   {checkGetStated && <Button handleOnClick={handleClickGetStarted} className="btn-started">Get Stated</Button>} 
                </div>
            </Container>

            <Modal
                closeButton
                content={
                    <UnfollowPaper
                        handleCloseUnfollow={handleCloseUnfollow}
                        handleUnfollowUser={handleUnfollowUser}
                        user={currentUser}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showUnfollow}
                onCloseModal={handleCloseUnfollow}
            />
        </>
    );
}

const Container = styled.div`
    h4 {
        margin: 0;
        font-size: 16px;
        color: #262626;
    }

    .btn-started {
        width: 100%;
        margin: 16px 0;
    }

    .wrapper_suggestion_users {
        margin-top: 16px;
        padding: 8px 16px;
        border: 1px solid rgb(219, 219, 219);
        background-color: rgb(255, 255, 255);
    }
`;
