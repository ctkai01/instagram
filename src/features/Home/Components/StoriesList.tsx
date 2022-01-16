import * as React from 'react';
import styled from 'styled-components';
import StoriesItem from './StoriesItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import NextButton from './NextButton';
import SwiperCore, { Navigation } from 'swiper';
import PrevButton from './PrevButton';
// import img from './images/bgIcon.png';
export interface IStoriesListProps {}
SwiperCore.use([Navigation]);

interface StyledStoriesProps {
    urlReact?: string;
    showButton?: boolean;
}
export default function StoriesList(props: IStoriesListProps) {
    const listStories = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
    // const listStories = ['1', '2', '3'];

    let add;
    if (listStories.length <= 7) {
        add = 8 - listStories.length;
    } else {
        add = 0;
    }

    const arrayAddFake = Array.from(Array(add).keys());
    const urlReact = process.env.REACT_APP_URL;
    const showButton = arrayAddFake.length === 0
    return (
        <>
            <Container urlReact={urlReact} showButton={showButton}>
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
                    {listStories.map((story, index) => (
                        <SwiperSlide>
                            <StoriesItem
                                key={index}
                                username={story}
                                urlImage={`https://picsum.photos/200/300?random=${story}`}
                            />
                        </SwiperSlide>
                    ))}
                    {arrayAddFake.map((item) => {
                        console.log('RE');
                        return <SwiperSlide />;
                    })}
                </Swiper>
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
        display: ${(props) => props.showButton ? 'block' : 'none'};
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
