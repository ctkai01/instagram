import { selectUserAuth } from '@features/Auth/authSlice';
import { selectIsLoading } from '@features/Home/storySlice';
import { User } from '@models/User';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import * as React from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoadingStory from './LoadingStory';
import StoriesItem from './StoriesItem';
// import img from './images/bgIcon.png';
export interface IStoriesListProps {
    storyUser: User[];
    handleShowCreateStory: () => void;
}
SwiperCore.use([Navigation]);

interface StyledStoriesProps {
    urlReact?: string;
    showButton?: boolean;
}
export default function StoriesList(props: IStoriesListProps) {
    const { storyUser, handleShowCreateStory } = props;
    const loading = useAppSelector(selectIsLoading);
    let add;
    if (storyUser.length <= 7) {
        add = 8 - storyUser.length;
    } else {
        add = 0;
    }
    const userAuth = useAppSelector(selectUserAuth);
    const arrayAddFake = Array.from(Array(add).keys());
    const urlReact = process.env.REACT_APP_URL;
    const showButton = arrayAddFake.length === 0;
    return (
        <>
            <Container urlReact={urlReact} showButton={showButton}>
                {loading ? (
                    <LoadingStory />
                ) : (
                    <Swiper
                        slidesPerView={7.4}
                        navigation={true}
                        onSlideNextTransitionStart={(swiper) => {
                            const slideCurrent = swiper.activeIndex;
                            const slideTo = slideCurrent + 3;
                            swiper.slideTo(slideTo, 300, false);
                        }}
                        onSlidePrevTransitionStart={(swiper) => {
                            const slideCurrent = swiper.activeIndex;
                            const slideTo = slideCurrent - 3;
                            swiper.slideTo(slideTo, 300, false);
                        }}
                        allowTouchMove={false}
                    >
                        <SwiperSlide key={userAuth.user_name} onClick={handleShowCreateStory}>
                            <StoriesItem
                                me={true}
                                handleShowCreateStory={handleShowCreateStory}
                                key={userAuth.user_name}
                                username={userAuth.user_name}
                                urlImage={userAuth.avatar}
                            />
                        </SwiperSlide>
                        {storyUser.map((user, index) => (
                            <SwiperSlide key={index}>
                                <StoriesItem
                                    key={index}
                                    me={false}
                                    view_all_story={user.view_all_story}
                                    user={user}
                                    username={user.user_name}
                                    // urlImage={`https://picsum.photos/200/300?random=${story}`}
                                    urlImage={user.avatar}
                                />
                            </SwiperSlide>
                        ))}
                        {arrayAddFake.map((item, index) => {
                            return <SwiperSlide key={index} />;
                        })}
                    </Swiper>
                )}
            </Container>
        </>
    );
}

const Container = styled.div<StyledStoriesProps>`
    display: flex;
    padding: 16px 0 16px 15px;
    background-color: #fff;
    border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
    border-radius: 3px;
    margin-bottom: 24px;

    .swiper-button-next {
        background-image: ${(props) => `url(${props.urlReact}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -244px -107px;
        background-repeat: no-repeat;
        display: ${(props) => (props.showButton ? 'block' : 'none')};
    }

    .swiper-button-next::after {
        display: none;
    }

    .swiper-button-prev {
        background-image: ${(props) => `url(${props.urlReact}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -379px -128px;
        background-repeat: no-repeat;
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
`;
