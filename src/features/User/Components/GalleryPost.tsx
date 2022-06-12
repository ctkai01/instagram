import PostContentModal from '@features/Home/Components/Posts/PostContentModal';
import { Post } from '@models/Post';
import * as React from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextBtn from './NextBtn';

export interface IGalleryPostProps {
    posts?: Post[];
    currentIndexShow: number;
    changeCurrentIndexShow: (index: number) => void;
}
SwiperCore.use([Navigation]);

interface StyledGalleryPostProps {
    urlReact?: string;
}
export default function GalleryPost(props: IGalleryPostProps) {
    const { posts, currentIndexShow, changeCurrentIndexShow } = props;
    const urlReact = process.env.REACT_APP_URL;
    // const [swiper, setSwiper] = React.useState<SwiperCore>();

    // React.useEffect(() => {
    //     console.log(currentIndexShow)

    //     if (swiper) {
    //         console.log(currentIndexShow)
    //         swiper.slideTo(currentIndexShow)
    //     }
    // }, [])

    return (
        <>
            <Container urlReact={urlReact}>
                <Swiper
                    // onSwiper={(swiper) => setSwiper(swiper)}
                    className="slider-gallery"
                    slidesPerView={1}
                    allowTouchMove={false}
                    navigation={true}
                    onSlideChange={(swiper) => {
                        changeCurrentIndexShow(swiper.activeIndex)
                    }}
                    effect={'fade'}
                    initialSlide={currentIndexShow}
                    // onClick={() => console.log('FUk you')}
                >
                    {posts?.map((post, index) => (
                        <SwiperSlide key={index}>
                            {currentIndexShow === index && <PostContentModal post={post} />}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </>
    );
}
const Container = styled.div<StyledGalleryPostProps>`
    width: 1248px;
    height: 931px;
    /* width: 100vw; */
    height: 100%;
    position: relative;

    .test {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    /* .slider-gallery { */
    .swiper-slide {
        display: flex;
        justify-content: center;
        transform-style: preserve-3d;
        position: relative;
        transform: translateZ(-1);
    }

    .swiper-wrapper {
        display: flex;
        align-items: center;
    }

    .slider-gallery > .swiper-button-next {
        background-image: ${(props) => `url(${props.urlReact}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -244px -107px;
        background-repeat: no-repeat;
        transform: scaleX(1);
        position: fixed;
    }
    /* -133px -101px; */
    .swiper-button-next::after {
        display: none;
    }

    .slider-gallery > .swiper-button-prev {
        background-image: ${(props) => `url(${props.urlReact}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -379px -128px;
        background-repeat: no-repeat;
        position: fixed;
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

    .swiper {
        /* padding-bottom: 20px; */
        width: 100%;
        height: 100%;
    }
`;
