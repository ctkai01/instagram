import { Modal } from '@components/common';
import { TypeFollow } from '@constants/type-follow';
import { selectUserAuth } from '@features/Auth/authSlice';
import UnfollowPaper from '@features/User/Components/UnfollowPaper';
import { useFollow } from '@hooks/useFollow';
import { User } from '@models/User';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import styled from 'styled-components';
import { boolean } from 'yup/lib/locale';
import LoadingSuggestForYou from './LoadingSuggestForYou';
import { SuggestItem } from './SuggestItem';

export interface ISuggestForYouProps {
    usersSuggest: User[];
    loadingSuggestForYou: boolean;
    handleChangeUserSuggested: (userChanged: User) => void
}

export function SuggestForYou(props: ISuggestForYouProps) {
    const { usersSuggest, loadingSuggestForYou, handleChangeUserSuggested } = props;
    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);

    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });

    const [currentUser, setCurrentUser] = React.useState<User>();

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

    return (
        <>
            <Container>
                <div className="title-wrapper">
                    <div className="suggest-title">Suggestions For You</div>
                    {/* <div className="see-all-text">See All</div> */}
                </div>
                {loadingSuggestForYou ? (
                    <LoadingSuggestForYou />
                ) : (
                    usersSuggest.map((user, index) => (
                        <SuggestItem
                        handleShowUnfollow={handleShowUnfollow}
                            loadingUnfollow={loadingUnfollow}
                            loadingFollow={loadingFollow}
                            currentUser={currentUser}
                            handleUnfollowUser={handleUnfollowUser}
                            handleFollowUser={handleFollowUser}
                            key={index}
                            index={index}
                            user={user}
                        />
                    ))
                )}
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
                customIndex={9999999}
                onCloseModal={handleCloseUnfollow}
            />
        </>
    );
}

const Container = styled.div`
    margin-top: 18px;
    .title-wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        .suggest-title {
            color: #8e8e8e;
            font-weight: 600;
        }

        .see-all-text {
            color: #262626;
            font-weight: 600;
            font-size: 12px;
        }
    }
`;
