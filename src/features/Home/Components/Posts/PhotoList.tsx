import * as React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { Media } from '@models/Media';

export interface IPhotoListProps {
    media: Media[];
}
SwiperCore.use([Navigation, Pagination]);

interface StyledPhotosProps {
    urlReact?: string;
    showButton?: boolean;
}
export default function PhotoList(props: IPhotoListProps) {
    const { media } = props;
    // const listPhoto = [
    //     {
    //         url: 'https://picsum.photos/700/700?random=1',
    //         tag: [
    //             {
    //                 userName: 'ctkaino1',
    //                 location: '1',
    //             },
    //         ],
    //     },
    //     {
    //         url: 'https://picsum.photos/700/700?random=2',
    //         tag: [
    //             {
    //                 userName: 'king.a',
    //                 location: '1',
    //             },
    //         ],
    //     },
    //     {
    //         url: 'https://picsum.photos/700/700?random=3',
    //         tag: [
    //             {
    //                 userName: 'nope.ke',
    //                 location: '1',
    //             },
    //         ],
    //     },
    // ];

    const urlReact = process.env.REACT_APP_URL;
    const showButton = !(media.length === 1);

    return (
        <Container urlReact={urlReact} showButton={showButton}>
            <Swiper pagination={true} slidesPerView={1} navigation={true} allowTouchMove={false}>
                {media.map((mediaItem) => (
                    <SwiperSlide className="slider-item">
                        <img src={mediaItem.name} alt="photoPost" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

const Container = styled.div<StyledPhotosProps>`
    .slider-item {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
        }
    }

    .swiper-wrapper {
        display: flex;
        align-items: center;
    }

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

    .swiper {
        padding-bottom: 20px;
    }
    .swiper-pagination {
        bottom: -4px;
        border-left: 1px solid rgba(219, 219, 219, 1);
        border-right: 1px solid rgba(219, 219, 219, 1);
        padding-top: 10px;
    }
`;
