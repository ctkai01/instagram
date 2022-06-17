import { User } from '@models/User';
import * as React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import SuggestFollowedItem from './SuggestFollowedItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import UnfollowPaper from './UnfollowPaper';
import { Modal } from '@components/common';
import { TypeFollow } from '@constants/type-follow';
import { useFollow } from '@hooks/useFollow';

interface ISuggestFollowedListProps {
    className?: string;
    usersSimilar: User[];
    idUserClick?: number;
    loadingFollow: boolean;
    handleChangeUserSimilarUnfollow: (user: User) => void;
    handleFollowUser: (idUser: number) => Promise<void>;
}
SwiperCore.use([Navigation]);

export default function SuggestFollowedList(props: ISuggestFollowedListProps) {
    const {
        className,
        usersSimilar,
        idUserClick,
        loadingFollow,
        handleChangeUserSimilarUnfollow,
        handleFollowUser,
    } = props;

    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<User>();

    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const handleCloseUnfollow = () => {
        setShowUnfollow(false);
    };

    React.useEffect(() => {
        if (dataUnfollow) {
            handleChangeUserSimilarUnfollow(dataUnfollow);
        }
    }, [dataUnfollow]);

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleShowUnfollow = (user: User) => {
        setCurrentUser(user);
        setShowUnfollow(true);
    };
    return (
        <>
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
        <Swiper slidesPerView={4.5} className={className} navigation={true} allowTouchMove={false}>
            {usersSimilar.map((user, index) => (
                <SwiperSlide key={index}>
                    <SuggestFollowedItem
                        user={user}
                        handleCloseUnfollow={handleCloseUnfollow}
                        handleShowUnfollow={handleShowUnfollow}
                        idUserClick={idUserClick}
                        loadingFollow={loadingFollow}
                        loadingUnfollow={loadingUnfollow}
                        handleUnfollowUser={handleUnfollowUser}
                        handleFollowUser={handleFollowUser}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    );
}
