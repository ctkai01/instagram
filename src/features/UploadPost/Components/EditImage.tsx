import { BackIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';
import { FileUrl } from './ModalPost';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, EffectFade } from 'swiper';
import 'swiper/css/pagination';
import { env } from 'process';
import FilterImageList from './FilterImageList';

export interface IEditImageProps {
    fileGallery: FileUrl[];
}
interface ContainerStyledProps {
    baseUrl: string;
}

export default function EditImage(props: IEditImageProps) {
    const { fileGallery } = props;
    return (
        <Container baseUrl={window.location.origin}>
        {/* <Container> */}
            <div className="header">
                {/* <div className="back-button" onClick={handleBackChoseImage}> */}
                <div className="back-button">
                    <BackIcon ariaLabel="Back" />
                </div>
                <div className="main-header">Edit</div>
                <div className="next-button">Next</div>
            </div>
            <div className="content-main" style={{flexDirection: 'row', height: '80vh'}}>
                <div className="img-list">
                    <Swiper
                        pagination={true}
                        slidesPerView={1}
                        navigation={true}
                        allowTouchMove={false}
                        effect={'fade'}
                    >
                        {fileGallery.map((file, index) => (
                            <SwiperSlide key={index} className="slider-item">
                                <div
                                    style={{
                                        backgroundImage: `url('${file.url}')`,
                                    }}
                                    className="img"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="filter-list">
                    <FilterImageList/>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div<ContainerStyledProps>`
    width: 1101px;
    max-width: 1195px;
    min-width: 688px;
    min-height: 391px;
    max-height: 898px;

    .header {
        display: flex;
        border-bottom: 1px solid rgb(219, 219, 219);
        border-top-left-radius: 10px;
        justify-content: center;
        align-items: center;
        height: 42px;

        .main-header {
            flex: 8;
            font-size: 16px;
            color: #262626;
            font-weight: 600;
            text-align: center;
        }

        .back-button {
            cursor: pointer;
            flex: 1;
            display: flex;
            justify-content: center;
        }

        .next-button {
            cursor: pointer;
            flex: 1;
            text-align: center;
            padding: 5px;
            color: #0095f6;
            font-weight: 600;
            font-size: 16px;
        }
    }

    .content-main {
        display: flex;
   
        .img-list {
            width: 65%;
            height: 100%;
        }

        .filter-list {
            width: 35%;
            height: 100%;
        }
    }

    .slider-item {
            display: flex;
            justify-content: center;
            align-items: center;

            .img {
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            
            }

        }

    .swiper {
        height: 100%;
    }

    .swiper-wrapper {
        display: flex;
        align-items: center;
    }

    .swiper-button-next {
        background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -244px -107px;
        background-repeat: no-repeat;
    }

    .swiper-button-next::after {
        display: none;
    }

    .swiper-button-prev {
        background-image: ${(props) => `url(${props.baseUrl}/images/bgIcon.png)`};
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
    }
    .swiper-pagination {
        bottom: 30px;
        left: 50%;
        padding-top: 10px;
        width: 20%;
        text-align: start;
    }
`;
