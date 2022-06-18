import { TypeFollow } from '@constants/type-follow';
import { useFollow } from '@hooks/useFollow';
import { User } from '@models/User';
import * as React from 'react';
import styled from 'styled-components';
import SuggestionsForYouItem from './SuggestionsForYouItem';

export interface ISuggestionsForYouProps {
    usersSuggest: User[];
}

export default function SuggestionsForYou(props: ISuggestionsForYouProps) {
    const { usersSuggest } = props;

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
            // handleChangeUserFollowingFollower(dataUnfollow, TypeFollowUser.FOLLOWING);
        }
    }, [dataUnfollow]);

    React.useEffect(() => {
        if (dataFollow) {
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
        setCurrentUser(user)
        await fetchFollowUser(user.id);
    };

    return (
        <Container>
            <h4>Suggestions For You</h4>
            <div className="wrapper_suggestion_users">
                {usersSuggest.map((user, index) => (
                    <SuggestionsForYouItem handleUnfollowUser={handleUnfollowUser} handleFollowUser={handleFollowUser} loadingFollow={loadingFollow} loadingUnfollow={loadingUnfollow} key={index} index={index} user={user}/>
                ))}
            </div>
        </Container>
    );
}

const Container = styled.div`
    h4 {
        margin: 0;
        font-size: 16px;
        color: #262626;
    }

    .wrapper_suggestion_users {
        margin-top: 16px;
        padding: 8px 0;
        border: 1px solid rgb(219, 219, 219);
        background-color: rgb(255, 255, 255);
    }
`;
