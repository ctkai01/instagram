import { BackIcon } from '@components/Icons';
import { FilterImage } from '@constants/filter-image';
import * as React from 'react';
import styled from 'styled-components';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import CanvasImage from './CanvasImage';
import FilterImageList from './FilterImageList';
import { FileUrl } from './ModalPost';
import Konva from 'konva';
import { MediaType } from '@constants/media-type';

export interface IEditPostProps {
    fileGallery: FileUrl[];
    indexSlideCurrentEditPost: number;
    // handleNextEditImage: (files: FileUrl[]) => void;
    // setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
}

interface ContainerStyledProps {
    baseUrl: string;
}

export default function EditPost(props: IEditPostProps) {
    const { fileGallery, indexSlideCurrentEditPost } = props;
    const [swiper, setSwiper] = React.useState<SwiperCore>();
    console.log(fileGallery)
    
    return (
        <Container baseUrl={window.location.origin}>
            {/* <Container> */}
            <div className="header">
                {/* <div className="back-button" onClick={handleBackChoseImage}> */}
                <div className="back-button">
                    <BackIcon ariaLabel="Back" />
                </div>
                <div className="main-header">Edit</div>
                <div
                    className="next-button"
                    // onClick={() => {
                    //     setIsSubmitEdit((isSubmit) => !isSubmit);
                    // }}
                >
                    Next
                </div>
            </div>
            
            <div className="content-main" style={{ flexDirection: 'row', height: '80vh' }}>
                <div className="img-list">
                    <Swiper
                        initialSlide={indexSlideCurrentEditPost}                  
                        pagination={true}
                        slidesPerView={1}
                        navigation={true}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        allowTouchMove={false}
                        effect={'fade'}
                        onSlideChange={(swiper) => {
                            // setCurrentIndexSlider(swiper.activeIndex);
                        }}
                    >
                        {fileGallery.map((file, index) => (
                            <SwiperSlide key={index} className="slider-item">
                                <img src={file.url}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="filter-list">
                    
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
            width: 68%;
            height: 100%;
            cursor: pointer;
        }

        .filter-list {
            width: 32%;
            height: 100%;
        }
    }

    .slider-item {
        display: flex;
        justify-content: center;
        align-items: center;

        /* .img {
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
            
            } */
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
