// import { Avatar } from '@components/common';
import { Api } from '@api/authApi';
import { Avatar, Modal } from '@components/common';
import {
    ArrowTopIcon,
    MultipleSquareIcon,
    OptionsIcon,
    PersonIcon,
    TaggedIcon,
    ThereDotIcon,
} from '@components/Icons';
import { NUMBER_SHOW_USER_FOLLOWED } from '@constants/general';
import { TypeFollow, TypeFollowUser } from '@constants/type-follow';
import { selectUserAuth } from '@features/Auth/authSlice';
import { useFollow } from '@hooks/index';
import { FollowUser, useFollowUser } from '@hooks/useFollowUser';
import { Post } from '@models/Post';
import { User } from '@models/User';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { PATH_PERSON_ACCOUNT } from '@routes/index';
import * as React from 'react';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import ActionUser from '../Components/ActionUser';
import FollowerPaper from '../Components/FollowerPaper';
import FollowingPaper from '../Components/FollowingPaper';
import OptionsUser from '../Components/OptionsUser';
import PostAccountList from '../Components/PostAccountList';
import SuggestFollowedItem from '../Components/SuggestFollowedItem';
import SuggestFollowedList from '../Components/SuggestFollowedList';
import UnfollowPaper from '../Components/UnfollowPaper';
export interface IWallProps {}

interface Params {
    user_name: string;
}

interface StyledWallProps {
    urlReact?: string;
}
SwiperCore.use([Navigation]);

const urlReact = process.env.REACT_APP_URL;
enum ActiveTag {
    POSTS = 0,
    TAGGED = 1,
}

const defaultFollowUser: FollowUser = {
    currentPage: 1,
    lastPage: 1,
    data: [],
};

export function Wall(props: IWallProps) {
    const [showSuggested, setShowSuggested] = React.useState<boolean>(false);
    const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);
    const [showOptionsUser, setShowOptionsUser] = React.useState<boolean>(false);
    const [showActionUser, setShowActionUser] = React.useState<boolean>(false);

    const [showFollower, setShowFollower] = React.useState<boolean>(false);
    const [showFollowing, setShowFollowing] = React.useState<boolean>(false);

    const [tagActive, setTagActive] = React.useState<ActiveTag>(ActiveTag.POSTS);
    const [user, setUser] = React.useState<User>();
    const [idUserClick, setIdUserClick] = React.useState<number>();
    const [usersSimilar, setUsersSimilar] = React.useState<User[]>([]);

    const [usersFollowing, setUsersFollowing] = React.useState<FollowUser>(defaultFollowUser);
    const [usersFollower, setUsersFollower] = React.useState<FollowUser>(defaultFollowUser);

    const [postUser, setPostUser] = React.useState<Post[]>([]);
    const [foundUser, setFoundUser] = React.useState<boolean>(true);
    const [dataUnfollow, loadingUnfollow, fetchUnFollowUser] = useFollow({
        type: TypeFollow.UNFOLLOW,
    });

    const [dataFollow, loadingFollow, fetchFollowUser] = useFollow({
        type: TypeFollow.FOLLOW,
    });

    const [dataFollowerUser, loadingFollowerUser, fetchListFollower] = useFollowUser({
        type: TypeFollowUser.FOLLOWER,
    });

    const [dataFollowingUser, loadingFollowingUser, fetchListFollowing] = useFollowUser({
        type: TypeFollowUser.FOLLOWING,
    });

    const useAuth = useAppSelector(selectUserAuth);

    const handleUnfollowUser = async (idUser: number) => {
        handleCloseUnfollow();
        await fetchUnFollowUser(idUser);
    };

    const handleFollowUser = async (idUser: number) => {
        setIdUserClick(idUser);
        await fetchFollowUser(idUser);
    };

    React.useEffect(() => {
        if (dataFollowerUser) {
            setUsersFollower((usersFollower) => ({
                currentPage: dataFollowerUser.currentPage,
                lastPage: dataFollowerUser.lastPage,
                data: usersFollower.data.concat(dataFollowerUser.data),
            }));
        }
    }, [dataFollowerUser]);

    React.useEffect(() => {
        if (dataFollowingUser) {
            setUsersFollowing((usersFollowing) => ({
                currentPage: dataFollowingUser.currentPage,
                lastPage: dataFollowingUser.lastPage,
                data: usersFollowing.data.concat(dataFollowingUser.data),
            }));
        }
    }, [dataFollowingUser]);

    React.useEffect(() => {
        if (dataUnfollow) {
            setUser(dataUnfollow);
        }
    }, [dataUnfollow]);

    React.useEffect(() => {
        if (dataFollow && user) {
            if (dataFollow.id != user.id) {
                setUsersSimilar((usersSimilar) => {
                    const newUsersSimilar = [...usersSimilar];
                    const checkUserExist = newUsersSimilar.findIndex(
                        (user) => user.id === dataFollow.id
                    );

                    if (checkUserExist !== -1) {
                        const userChange = newUsersSimilar[checkUserExist];
                        userChange.is_following = dataFollow.is_following;
                        newUsersSimilar[checkUserExist] = userChange;
                        return newUsersSimilar;
                    } else {
                        return newUsersSimilar;
                    }
                });
            } else {
                setUser(dataFollow);
            }
        }
    }, [dataFollow]);

    let { user_name } = useParams<Params>();

    console.log(user_name);
    // let matchIndexPersonAccount = useRouteMatch(PATH_PERSON_ACCOUNT);
    // let matchIndexPersonAccountTagged = useRouteMatch(PATH_TAGGED_PERSON_ACCOUNT);

    const handleShowFollower = async (idUser: number) => {
        if (!usersFollower.data.length) {
            fetchListFollower(idUser);
        }
        setShowFollower(true);
    };

    const handleCloseFollower = () => {
        setShowFollower(false);
    };

    const handleShowFollowing = async (idUser: number) => {
        if (!usersFollowing.data.length) {
            fetchListFollowing(idUser);
        }
        setShowFollowing(true);
    };

    const handleCloseFollowing = () => {
        setShowFollowing(false);
    };

    const handleShowOptionsUser = () => {
        setShowOptionsUser(true);
    };

    const handleCloseOptionsUser = () => {
        setShowOptionsUser(false);
    };

    const handleShowUnfollow = () => {
        setShowUnfollow(true);
    };

    const handleShowActionUser = () => {
        setShowActionUser(true);
    };

    const handleCloseActionUser = () => {
        setShowActionUser(false);
    };

    const handleCloseUnfollow = () => {
        setShowUnfollow(false);
    };

    React.useEffect(() => {
        // if (matchIndexPersonAccount?.isExact) {
        setTagActive(ActiveTag.POSTS);
        // } else if (matchIndexPersonAccountTagged?.isExact) {
        // setTagActive(ActiveTag.TAGGED);
        // }

        const fetchUser = async () => {
            setShowFollower(false);
            setShowFollowing(false);
            try {
                const [responseUser, usersSimilar] = await Promise.all([
                    Api.getUserByUserName(user_name),
                    Api.usersSimilar(user_name),
                ]);
                // console.log(responseUser);
                console.log(usersSimilar);
                setUser(responseUser.data);
                setUsersSimilar(usersSimilar.data);
                setPostUser(responseUser.data.posts);

                setFoundUser(true);
                // const userList =
            } catch (err) {
                console.log(err);
                setFoundUser(false);
            }
        };

        console.log('Fetch');
        fetchUser();
    }, [user_name]);

    const handleSwitchSuggested = () => {
        setShowSuggested((showSuggested) => !showSuggested);
    };

    const handleChangeUserFollowingFollower = (user: User, type: TypeFollowUser) => {
        if (type === TypeFollowUser.FOLLOWING) {
            setUsersFollowing((usersFollowing) => {
                const cloneUsersFollowing = { ...usersFollowing };
                const checkUserExist = cloneUsersFollowing.data.find(
                    (cloneUserFollowing) => cloneUserFollowing.id === user.id
                );
                if (checkUserExist) {
                    checkUserExist.is_following = user.is_following;
                    checkUserExist.count_follower = user.count_follower;
                    checkUserExist.count_following = user.count_following;
                    cloneUsersFollowing.data[
                        cloneUsersFollowing.data.findIndex(
                            (cloneUserFollowing) => cloneUserFollowing.id === user.id
                        )
                    ] = checkUserExist;

                    return cloneUsersFollowing;
                } else {
                    return cloneUsersFollowing;
                }
            });
        } else if (type === TypeFollowUser.FOLLOWER) {
            setUsersFollower((usersFollower) => {
                const cloneUsersFollower = { ...usersFollower };
                const checkUserExist = cloneUsersFollower.data.find(
                    (cloneUserFollower) => cloneUserFollower.id === user.id
                );
                if (checkUserExist) {
                    checkUserExist.is_following = user.is_following;
                    checkUserExist.count_follower = user.count_follower;
                    checkUserExist.count_following = user.count_following;
                    cloneUsersFollower.data[
                        cloneUsersFollower.data.findIndex(
                            (cloneUserFollower) => cloneUserFollower.id === user.id
                        )
                    ] = checkUserExist;

                    return cloneUsersFollower;
                } else {
                    return cloneUsersFollower;
                }
            });
        }
    };

    const handleChangeUserSimilarUnfollow = (dataUnfollow: User) => {
        setUsersSimilar((usersSimilar) => {
            const newUsersSimilar = [...usersSimilar];
            const checkUserExist = newUsersSimilar.findIndex((user) => user.id === dataUnfollow.id);

            if (checkUserExist !== -1) {
                const userChange = newUsersSimilar[checkUserExist];
                userChange.is_following = dataUnfollow.is_following;
                newUsersSimilar[checkUserExist] = userChange;
                return newUsersSimilar;
            } else {
                return newUsersSimilar;
            }
        });
    };
    return (
        <>
            <Modal
                closeButton
                content={
                    <UnfollowPaper
                        handleCloseUnfollow={handleCloseUnfollow}
                        handleUnfollowUser={handleUnfollowUser}
                        user={user}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showUnfollow}
                onCloseModal={handleCloseUnfollow}
            />
            <Modal
                closeButton
                content={<ActionUser handleCloseActionUser={handleCloseActionUser} />}
                color="rgba(0, 0, 0, 0.65)"
                showModal={showActionUser}
                onCloseModal={handleCloseActionUser}
            />
            <Modal
                closeButton
                content={<OptionsUser handleCloseOptionsUser={handleCloseOptionsUser} />}
                color="rgba(0, 0, 0, 0.65)"
                showModal={showOptionsUser}
                onCloseModal={handleCloseOptionsUser}
            />
            <Modal
                closeButton
                content={
                    <FollowerPaper
                        idUser={1}
                        usersFollower={usersFollower}
                        loadingFollowerUser={loadingFollowerUser}
                        handleChangeUserFollowingFollower={handleChangeUserFollowingFollower}
                        fetchListFollower={fetchListFollower}
                        handleCloseFollower={handleCloseFollower}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showFollower}
                onCloseModal={handleCloseFollower}
            />
            <Modal
                closeButton
                content={
                    <FollowingPaper
                        idUser={1}
                        handleChangeUserFollowingFollower={handleChangeUserFollowingFollower}
                        usersFollowing={usersFollowing}
                        loadingFollowingUser={loadingFollowingUser}
                        fetchListFollowing={fetchListFollowing}
                        handleCloseFollowing={handleCloseFollowing}
                    />
                }
                color="rgba(0, 0, 0, 0.65)"
                showModal={showFollowing}
                onCloseModal={handleCloseFollowing}
            />
            {foundUser ? (
                <Container urlReact={urlReact}>
                    <header>
                        <div className="avatar-container">
                            {user ? (
                                <Avatar size="large" url={user.avatar} />
                            ) : (
                                <Skeleton variant="circular" height={150} width={150} />
                            )}
                        </div>
                        <div className="introduce-container">
                            <div className="introduce-header">
                                <h2 className="user_name">
                                    {user ? user.user_name : <Skeleton width={100} />}
                                </h2>
                                <div className="check-container">
                                    {user ? (
                                        <div
                                            style={{
                                                display: `${user.is_tick ? 'block' : 'none'}`,
                                            }}
                                            className="check-icon"
                                        ></div>
                                    ) : (
                                        <Skeleton width={20} />
                                    )}
                                </div>
                                {user_name !== useAuth.user_name &&
                                    (user ? (
                                        <div className="action-container">
                                            <Link to={`/message/${user.user_name}`}>
                                                <button className="btn-message">Message</button>
                                            </Link>
                                            {user?.is_following ? (
                                                <button
                                                    className="btn-unfollow"
                                                    onClick={handleShowUnfollow}
                                                >
                                                    <div className="icon-container">
                                                        <PersonIcon
                                                            color={
                                                                loadingUnfollow ? 'gray' : 'black'
                                                            }
                                                        />
                                                    </div>
                                                </button>
                                            ) : (
                                                <button
                                                    style={{
                                                        opacity: `${loadingFollow ? '0.5' : '1'}`,
                                                    }}
                                                    onClick={() => handleFollowUser(user.id)}
                                                    className="btn-follow"
                                                >
                                                    Follow
                                                </button>
                                            )}

                                            <button
                                                className="btn-show-suggest"
                                                onClick={handleSwitchSuggested}
                                                style={{
                                                    background: `${
                                                        user?.is_following ? '#fff' : '#0095f6'
                                                    }`,
                                                }}
                                            >
                                                <div
                                                    className="icon-container"
                                                    style={{
                                                        transform: `${
                                                            showSuggested ? 'rotate(180deg)' : ''
                                                        }`,
                                                    }}
                                                >
                                                    <ArrowTopIcon
                                                        size={12}
                                                        color={
                                                            user?.is_following ? 'back' : 'white'
                                                        }
                                                    />
                                                </div>
                                            </button>
                                            <button
                                                className="btn-action-account"
                                                onClick={handleShowActionUser}
                                            >
                                                <ThereDotIcon size={32} />
                                            </button>
                                        </div>
                                    ) : (
                                        <Skeleton
                                            style={{ marginLeft: '20px' }}
                                            width={200}
                                            height={30}
                                        />
                                    ))}

                                {user_name === useAuth.user_name &&
                                    (user ? (
                                        <div className="action-container">
                                            <button className="btn-edit-profile">
                                                Edit profile
                                            </button>
                                            <button
                                                className="btn-options"
                                                onClick={handleShowOptionsUser}
                                            >
                                                <OptionsIcon />
                                            </button>
                                        </div>
                                    ) : (
                                        <Skeleton
                                            style={{ marginLeft: '20px' }}
                                            width={150}
                                            height={30}
                                        />
                                    ))}
                            </div>
                            <div className="info-contact-container">
                                <div className="info-contact-item">
                                    {user ? (
                                        <>
                                            <span>{postUser.length} </span>
                                            posts
                                        </>
                                    ) : (
                                        <Skeleton width={100} />
                                    )}
                                </div>
                                <div
                                    className="info-contact-item"
                                    onClick={() => {
                                        // @ts-ignore: Object is possibly 'null'.

                                        handleShowFollower(user?.id);
                                    }}
                                >
                                    {user ? (
                                        <>
                                            <span>{user?.count_follower} </span>
                                            followers
                                        </>
                                    ) : (
                                        <Skeleton width={100} />
                                    )}
                                </div>
                                <div
                                    className="info-contact-item"
                                    onClick={() => {
                                        // @ts-ignore: Object is possibly 'null'.

                                        handleShowFollowing(user.id);
                                    }}
                                >
                                    {user ? (
                                        <>
                                            <span>{user?.count_following} </span>
                                            following
                                        </>
                                    ) : (
                                        <Skeleton width={100} />
                                    )}
                                </div>
                            </div>
                            <div className="bio-container">
                                <div className="full_name">
                                    {user ? user.name : <Skeleton width={200} />}
                                </div>
                                <div>{user?.bio}</div>
                            </div>
                            <div className="mutual-only-container">
                                {user ? (
                                    <>
                                        {!!user.followed_by.length && 'Followed by'}
                                        {user?.followed_by
                                            ?.slice(0, NUMBER_SHOW_USER_FOLLOWED)
                                            .map((followed, index) => (
                                                <div key={index}>
                                                    <Link
                                                        className="user_name_link"
                                                        to={`/${followed}`}
                                                    >
                                                        {followed}
                                                    </Link>
                                                    {index <
                                                    // @ts-ignore: Object is possibly 'null'.
                                                    user?.followed_by?.slice(
                                                        0,
                                                        NUMBER_SHOW_USER_FOLLOWED
                                                    ) -
                                                        1
                                                        ? ', '
                                                        : ''}
                                                </div>
                                            ))}
                                        {
                                            // @ts-ignore: Object is possibly 'null'.
                                            user?.followed_by?.length > NUMBER_SHOW_USER_FOLLOWED
                                                ? // @ts-ignore: Object is possibly 'null'.
                                                  `+${
                                                      user.followed_by
                                                          ? user.followed_by.length -
                                                            NUMBER_SHOW_USER_FOLLOWED
                                                          : 0
                                                  } more`
                                                : ''
                                        }
                                    </>
                                ) : (
                                    <Skeleton width={250} />
                                )}
                            </div>
                        </div>
                    </header>
                    {showSuggested && (
                        <div className="container-suggested">
                            <div className="header-suggested">
                                <div className="text-suggest">Suggested</div>
                                <Link className="see-all-btn" to="aa">
                                    See All
                                </Link>
                            </div>
                            <SuggestFollowedList
                                usersSimilar={usersSimilar}
                                className="slider-suggest"
                                idUserClick={idUserClick}
                                loadingFollow={loadingFollow}
                                handleChangeUserSimilarUnfollow={handleChangeUserSimilarUnfollow}
                                handleFollowUser={handleFollowUser}
                            />
                        </div>
                    )}
                    <div className="header-media-container">
                        <div
                            onClick={() => {
                                setTagActive(ActiveTag.POSTS);
                            }}
                            style={{
                                borderTop: `${
                                    tagActive === ActiveTag.POSTS
                                        ? '1px solid rgb(38, 38, 38)'
                                        : 'none'
                                }`,
                                color: `${tagActive === ActiveTag.POSTS ? '#262626' : '#8e8e8e'}`,
                            }}
                            className="header-media-item"
                        >
                            {tagActive === ActiveTag.POSTS ? (
                                <MultipleSquareIcon color="black" />
                            ) : (
                                <MultipleSquareIcon color="gray" />
                            )}
                            <div className="text">POSTS</div>
                        </div>

                        <div
                            // to={`/${user_name}/tagged`}
                            onClick={() => {
                                setTagActive(ActiveTag.TAGGED);
                            }}
                            style={{
                                borderTop: `${
                                    tagActive === ActiveTag.TAGGED
                                        ? '1px solid rgb(38, 38, 38)'
                                        : 'none'
                                }`,
                                color: `${tagActive === ActiveTag.TAGGED ? '#262626' : '#8e8e8e'}`,
                            }}
                            className="header-media-item"
                        >
                            {tagActive === ActiveTag.TAGGED ? (
                                <TaggedIcon color="black" />
                            ) : (
                                <TaggedIcon color="gray" />
                            )}
                            <div className="text">TAGGED</div>
                        </div>
                    </div>
                    <PostAccountList posts={postUser.length ? postUser : undefined} />
                </Container>
            ) : (
                <div style={{ padding: '20px', margin: '30% auto' }}>
                    <h1 style={{ textAlign: 'center' }}>Sorry, this page isn't available.</h1>
                    <h3 style={{ textAlign: 'center', color: '#0c49cc' }}>User not found</h3>
                </div>
            )}
        </>
    );
}

const Container = styled.div<StyledWallProps>`
    padding: 30px 20px 0;

    .btn-options {
        padding: 8px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        height: min-content;
        margin-left: 5px;
    }

    header {
        display: flex;
        margin-bottom: 44px;
        .mutual-only-container {
            margin-top: 14px;
            color: #8e8e8e;
            font-size: 12px;

            .user_name_link {
                color: #262626;
                text-decoration: none;
            }
        }

        .avatar-container {
            flex-basis: 0;
            flex-grow: 1;
            margin-right: 30px;
        }

        .bio-container {
            font-size: 16px;

            .full_name {
                font-weight: 600;
            }
        }

        .info-contact-container {
            display: flex;
            margin-bottom: 20px;
            .info-contact-item {
                margin-right: 40px;
                cursor: pointer;

                span {
                    color: rgb(38, 38, 38);
                    font-size: 16px;
                    font-weight: 600;
                    margin-right: 5px;
                }
            }
        }

        .introduce-container {
            flex-basis: 30px;
            flex-grow: 2;
            display: flex;
            flex-direction: column;
        }

        .user_name {
            color: #262626;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .introduce-header {
            display: flex;
            align-items: center;
        }

        .action-container {
            margin-left: 20px;
            display: flex;
            align-items: center;
            /* margin-bottom: 20px; */
        }

        .btn-message,
        .btn-edit-profile {
            background-color: transparent;
            padding: 5px 9px;
            border-radius: 3px;
            border: 1px solid rgb(219, 219, 219);
            color: #262626;
            font-weight: 600;
            font-size: 14px;
            line-height: 18px;
            cursor: pointer;
        }

        .btn-unfollow {
            padding: 0 24px;
            cursor: pointer;
            background-color: transparent;
            border-radius: 3px;
            border: 1px solid rgb(219, 219, 219);
            margin: 0 8px;
        }

        .btn-follow {
            cursor: pointer;
            background-color: #0095f6;
            color: #fff;
            padding: 7px 24px;
            font-size: 14px;
            border: none;
            border-radius: 3px;
            margin: 0 8px;
            font-weight: 600;
            outline: none;
        }

        .btn-action-account {
            cursor: pointer;
            background-color: transparent;
            border: none;
            padding: 8px;
            margin-left: 5px;
        }

        .icon-container {
            height: 28px;
            display: flex;
            align-items: center;
        }

        .btn-show-suggest {
            background-color: transparent;
            cursor: pointer;
            border: 1px solid rgb(219, 219, 219);
            border-radius: 3px;
            padding: 0 12px;
        }

        .check-container {
            margin-left: 8px;
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
    }

    .container-suggested {
        padding: 20px 0;
        margin-top: -16px;
        margin-bottom: 28px;
        border: 1px solid rgb(219, 219, 219);
        padding-left: 24px;
        .header-suggested {
            margin: 0 24px 12px;
            margin-left: 0;
            display: flex;
        }

        .text-suggest {
            flex: 1;
            color: #8e8e8e;
            font-weight: 600;
        }

        .see-all-btn {
            text-decoration: none;
            color: #0095f6;
            font-weight: 600;
        }
    }

    .header-media-container {
        border-top: 1px solid rgb(219, 219, 219);
        display: flex;
        justify-content: center;

        .header-media-item {
            border-top: 1px solid rgb(38, 38, 38);
            display: flex;
            height: 52px;
            justify-content: center;
            align-items: center;
            margin-right: 60px;
            text-decoration: none;
            cursor: pointer;
            .text {
                margin-left: 6px;
                font-size: 12px;
                font-weight: 600;
                line-height: 12px;
            }
        }
    }

    .slider-suggest > .swiper-button-next {
        background-image: ${(props) => `url(${props.urlReact}/images/bgIcon2.png)`};
        background-repeat: no-repeat;
        background-position: -97px -333px;
        height: 24px;
        width: 24px;
        transform: scaleX(-1);
    }

    .swiper-button-next::after {
        display: none;
    }

    .slider-suggest > .swiper-button-prev {
        background-image: ${(props) => `url(${props.urlReact}/images/bgIcon2.png)`};
        background-repeat: no-repeat;
        background-position: -97px -333px;
        height: 24px;
        width: 24px;
    }

    .swiper-button-prev::after {
        display: none;
    }

    .swiper-button-next,
    .swiper-button-prev {
        transition: opacity 0.5s;
    }

    .swiper-button-disabled {
        opacity: 0 !important;
    }

    .swiper-pagination {
        bottom: 30px;
        left: 50%;
        padding-top: 10px;
        width: 20%;
        text-align: start;
    }
`;
