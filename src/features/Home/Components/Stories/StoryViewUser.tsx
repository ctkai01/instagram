import { Api } from '@api/authApi';
import { ActiveStatus } from '@constants/active-status';
import { User } from '@models/User';
import React from 'react';
import {} from 'react-insta-stories';
import styled from 'styled-components';
import SwiperCore, { Autoplay, EffectFade, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProgressTimer from './ProgressTimer';
import StoryViewItem from './StoryViewItem';

SwiperCore.use([Navigation, EffectFade, Autoplay]);

export interface IStoryViewUserProps {
    currentSlider: number;
    showInfo: boolean;
    index: number;
    user: User;
    handleSetChild: (swiperRef: SwiperCore) => void;
}

export default function StoryViewUser(props: IStoryViewUserProps) {
    const { currentSlider, showInfo, index, user, handleSetChild } = props;
    const [swiper, setSwiper] = React.useState<SwiperCore>();

    const [currentSliderItem, setCurrentSlideItem] = React.useState(0);
    // console.log('Show INFO', showInfo);
    // console.log('Show INDEX', index);

    if (swiper && showInfo) {
        if (showInfo) {
            swiper.autoplay.start();
        } else {
            swiper.autoplay.stop();
        }
    }

    const fetchViewStory = async (idStory: number) => {
        const response = await Api.viewStory(idStory)
        console.log('RESPONSE VIEW', response.data)
    }

    console.log('Story', user.stories)
    return (
        <Container>
            <div className="list-time">
                {showInfo && user.stories &&
                    user.stories.map((el, index) => {
                        return (
                            <ProgressTimer
                                key={index}
                                index={index}
                                currentSliderItem={currentSliderItem}
                                className="time-item"
                            />
                        );
                    })}
            </div>
            <Swiper
                onSlideChange={(swiper) => {
                    setCurrentSlideItem(swiper.activeIndex);
                    if (user.stories) {
                        if (user.stories[swiper.activeIndex - 1].is_view === ActiveStatus.NO_ACTIVE) {
                            fetchViewStory(user.stories[swiper.activeIndex - 1].id)
                           
                            if (swiper.activeIndex === user.stories.length - 1) {
                                if (user.stories[swiper.activeIndex].is_view === ActiveStatus.NO_ACTIVE) {
                                    fetchViewStory(user.stories[swiper.activeIndex].id)
                                }
                            }
                        } 
                    }
                   
                    swiper.autoplay.start();
                }}
                onSwiper={(swiper) => {
                    handleSetChild(swiper);
                    setSwiper(swiper);
                }}
                onAfterInit={(swiper) => {
                    if (showInfo) {
                        swiper.autoplay.start();
                    } else {
                        swiper.autoplay.stop();
                    }
                }}
                onPlay={(e) => {
                    console.log(e);
                }}
                slidesPerView={1}
                effect="slide"
                // loop={true}

                navigation={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    stopOnLastSlide: true,
                }}
                onBeforeSlideChangeStart={(swiper) => {
                    swiper.autoplay.stop();
                }}
                allowTouchMove={false}
            >
                {user.stories &&
                    user.stories.map((story, index) => (
                        <SwiperSlide key={index} className="slider-user-item">
                            <StoryViewItem
                                key={index}
                                index={index}
                                user={user}
                                showInfo={showInfo}
                                currentSliderItem={currentSliderItem}
                                story={story}
                                // url={`https://swiperjs.com/demos/images/nature-${index + 1}.jpg`}
                            />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    .swiper {
        width: 100% !important;
        height: 100% !important;
    }

    .swiper-slide {
        width: 100% !important;
        height: 100% !important;
    }

    .slider-user-item {
        transform: scale(1) !important;
    }

    .swiper-button-next {
    }

    .list-time {
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        position: absolute;
        z-index: 999;
        left: 0;
        margin: 0 16px;
        top: 9px;
        left: 0;
        width: 93%;
        .time-item {
            flex-grow: 1;
            height: 2px;
            margin-right: 4px;
            position: relative;

            &:last-child {
                margin-right: 0;
            }
        }
    }
`;
