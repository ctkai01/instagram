// import { Avatar } from '@components/common';
import { Api } from '@api/authApi';
import { Avatar } from '@components/common';
import {
    ArrowTopIcon,
    MultipleSquareIcon,
    PersonIcon,
    TaggedIcon,
    ThereDotIcon,
} from '@components/Icons';
import { NUMBER_SHOW_USER_FOLLOWED } from '@constants/general';
import { User } from '@models/User';
import { Skeleton } from '@mui/material';
import { PATH_PERSON_ACCOUNT } from '@routes/index';
import * as React from 'react';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostAccountList from '../Components/PostAccountList';
import SuggestFollowedItem from '../Components/SuggestFollowedItem';

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

export function Wall(props: IWallProps) {
    const [showSuggested, setShowSuggested] = React.useState<boolean>(false);
    const [tagActive, setTagActive] = React.useState<ActiveTag>(ActiveTag.POSTS);
    const [user, setUser] = React.useState<User>();
    let { user_name } = useParams<Params>();

    console.log(user_name);
    // let matchIndexPersonAccount = useRouteMatch(PATH_PERSON_ACCOUNT);
    // let matchIndexPersonAccountTagged = useRouteMatch(PATH_TAGGED_PERSON_ACCOUNT);

    React.useEffect(() => {
        // if (matchIndexPersonAccount?.isExact) {
        setTagActive(ActiveTag.POSTS);
        // } else if (matchIndexPersonAccountTagged?.isExact) {
        setTagActive(ActiveTag.TAGGED);
        // }

        const fetchUser = async () => {
            const response = await Api.getUserByUserName(user_name);
            console.log(response);
            setUser(response.data);
        };

        if (!user) {
            console.log('Fetch');
            fetchUser();
        }
    }, []);

    const handleSwitchSuggested = () => {
        setShowSuggested((showSuggested) => !showSuggested);
    };
    return (
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
                            <div className="check-icon"></div>
                        </div>
                        <div className="action-container">
                            <button className="btn-message">Message</button>
                            <button className="btn-follow">
                                <div className="icon-container">
                                    <PersonIcon />
                                </div>
                            </button>
                            <button className="btn-show-suggest" onClick={handleSwitchSuggested}>
                                <div
                                    className="icon-container"
                                    style={{
                                        transform: `${showSuggested ? 'rotate(180deg)' : ''}`,
                                    }}
                                >
                                    <ArrowTopIcon size={12} />
                                </div>
                            </button>
                            <button className="btn-action-account">
                                <ThereDotIcon size={32} />
                            </button>
                        </div>
                    </div>
                    <div className="info-contact-container">
                        <div className="info-contact-item">
                            {user ? (
                                <>
                                    <span>{user?.posts?.length} </span>
                                    posts
                                </>
                            ) : (
                                <Skeleton width={100} />
                            )}
                        </div>
                        <div className="info-contact-item">
                            {user ? (
                                <>
                                    <span>{user?.count_follower} </span>
                                    followers
                                </>
                            ) : (
                                <Skeleton width={100} />
                            )}
                        </div>
                        <div className="info-contact-item">
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
                        <div className="full_name">{user ? user.name : <Skeleton width={200} />}</div>
                        <div>{user?.bio}</div>
                    </div>
                    <div className="mutual-only-container">
                        {user ?
                        <>
                        Followed by{' '}
                        {user?.followed_by
                            ?.slice(0, NUMBER_SHOW_USER_FOLLOWED)
                            .map((followed, index) => (
                                <>
                                    <Link className="user_name_link" to={`/${followed}`}>
                                        {followed}
                                    </Link>
                                    {index <
                                    // @ts-ignore: Object is possibly 'null'.
                                    user?.followed_by?.slice(0, NUMBER_SHOW_USER_FOLLOWED) - 1
                                        ? ', '
                                        : ''}
                                </>
                            ))}
                        {
                            // @ts-ignore: Object is possibly 'null'.
                            user?.followed_by?.length > NUMBER_SHOW_USER_FOLLOWED
                                ? // @ts-ignore: Object is possibly 'null'.
                                  `+${user?.followed_by?.length - NUMBER_SHOW_USER_FOLLOWED} more`
                                : ''
                        }
                        </>
                        : <Skeleton width={250}/>
                        
                        }

                        
                    </div>
                </div>
            </header>
            <div className="container-suggested">
                <div className="header-suggested">
                    <div className="text-suggest">Suggested</div>
                    <Link className="see-all-btn" to="aa">
                        See All
                    </Link>
                </div>
                <Swiper slidesPerView={4.5} navigation={true} allowTouchMove={false}>
                    {Array.from(Array(7).keys()).map((el, index) => (
                        <SwiperSlide key={index}>
                            <SuggestFollowedItem
                                url={`https://picsum.photos/200/300?random=${el + 1}`}
                            />
                            {/* <Skeleton width={180} height={210}/> */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="header-media-container">
                <div
                    onClick={() => {
                        setTagActive(ActiveTag.POSTS);
                    }}
                    style={{
                        borderTop: `${
                            tagActive === ActiveTag.POSTS ? '1px solid rgb(38, 38, 38)' : 'none'
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
                            tagActive === ActiveTag.TAGGED ? '1px solid rgb(38, 38, 38)' : 'none'
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
            <PostAccountList posts={user ? user.posts : undefined} />
        </Container>
    );
}

const Container = styled.div<StyledWallProps>`
    padding: 30px 20px 0;

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
            margin-bottom: 20px;
        }

        .btn-message {
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

        .btn-follow {
            padding: 0 24px;
            cursor: pointer;
            background-color: transparent;
            border-radius: 3px;
            border: 1px solid rgb(219, 219, 219);
            margin: 0 8px;
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

    .swiper-button-next {
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

    .swiper-button-prev {
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
