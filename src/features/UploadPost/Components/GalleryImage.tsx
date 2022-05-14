import { PlusIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';

export interface IGalleryImageProps {
    className?: string;
    imageGallery: string[];
}

SwiperCore.use([Navigation, Pagination]);

interface StyledPhotosProps {
    urlReact?: string;
    showButton?: boolean;
}
export default function GalleryImage(props: IGalleryImageProps) {
    const { className, imageGallery } = props;
    const urlReact = process.env.REACT_APP_URL;
    const showButton = !(imageGallery.length === 1);
    return (
        <Container className={className} urlReact={urlReact} showButton={showButton}>
            <div className="gallery-list">
                <Swiper
                    pagination={true}
                    slidesPerView={2}
                    navigation={true}
                    allowTouchMove={false}
                >
                    {imageGallery.map((image) => (
                        <>
                            <SwiperSlide className="slider-item">
                                <img className="img" src={image} />
                            </SwiperSlide>
                            <SwiperSlide className="slider-item">
                                <img className="img" src={image} />
                            </SwiperSlide>
                            <SwiperSlide className="slider-item">
                                <img className="img" src={image} />
                            </SwiperSlide>
                            <SwiperSlide className="slider-item">
                                <img className="img" src={image} />
                            </SwiperSlide>
                        </>
                    ))}
                </Swiper>
                {/* <div style={{ backgroundImage: `url(${imageGallery[0]})`}}></div>
        <div style={{ backgroundImage: `url(${imageGallery[0]})`}}></div>
        <div style={{ backgroundImage: `url(${imageGallery[0]})`}}></div> */}
            </div>
            <div className="button-add-img">
                <div className="icon-add-container">
                    <PlusIcon />
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div<StyledPhotosProps>`
    height: 118px;
    padding: 8px;

    .gallery-list {
        height: 94px;
        /* width: 94px; */
        width: 500px;
        display: flex;

        .slider-item {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px;
            .img {
                /* height: 94px; */
                /* width: 94px; */
                width: 100%;
                margin: 0 6px;
                object-fit: cover;
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
            /* display: ${(props) => (props.showButton ? 'block' : 'none')}; */
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
            /* padding-bottom: 20px; */
            width: 100%;
        }
        .swiper-pagination {
            bottom: -4px;
            /* border-left: 1px solid rgba(219, 219, 219, 1);
            border-right: 1px solid rgba(219, 219, 219, 1); */
            padding-top: 10px;
        }

        /* div {
            background-size: cover;
            width: 100%;
            height: 100%;
        } */
    }

    .button-add-img {
        margin: 0 4px 0 6px;

        .icon-add-container {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid rgb(219, 219, 219);
        }
    }
`;
