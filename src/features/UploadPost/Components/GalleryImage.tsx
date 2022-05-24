import { CloseIcon, PlusIcon } from '@components/Icons';
import * as React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { FileUrl } from './ModalPost';
import { MediaType } from '@models/commom';
import { ThumbnailVideoFile } from './CropImage';

export interface IGalleryImageProps {
    className?: string;
    fileGallery: FileUrl[];
    thumbnails: ThumbnailVideoFile[];
    activeSliderSmall: number;
    handleClickSelectImage: (e: React.MouseEvent<HTMLElement>) => void;
    handleCloseItemGallery: (e: number) => void;
    // setSwiperSmall: React.Dispatch<React.SetStateAction<SwiperCore | undefined>>;
    // handleClickChangeBigSlider: (swiper: SwiperCore) => void;
    // handleClickSliderGallery: (
    //     swiper: SwiperCore,
    //     event: MouseEvent | TouchEvent | PointerEvent
    // ) => void;
    handleClickSliderGallery: (
        index: number,
        file: FileUrl
    ) => void;
}

SwiperCore.use([Navigation, Pagination]);

interface StyledPhotosProps {
    urlReact?: string;
    showButton?: boolean;
}

export default function GalleryImage(props: IGalleryImageProps) {
    const {
        className,
        fileGallery,
        thumbnails,
        activeSliderSmall,
        handleClickSelectImage,
        handleCloseItemGallery,
        handleClickSliderGallery,
    } = props;
    const urlReact = process.env.REACT_APP_URL;
    const showButton = !(fileGallery.length === 1);
    


    const widthGalleryImg =
        fileGallery.length <= 6 ? fileGallery.length * 106 + 6 * 2 : 6 * 106 + 6 * 2;

    return (
        <Container className={className} urlReact={urlReact} showButton={showButton}>
            <div className="gallery-list" style={{ width: widthGalleryImg }}>
                <Swiper
                    pagination={true}
                    slidesPerView={fileGallery.length <= 6 ? fileGallery.length : 6}
                    navigation={true}
                    allowSlideNext={true}
                    allowSlidePrev={true}
                    allowTouchMove={false}
                    spaceBetween={8}
                    onSlideChange={(swiper) => {
                        console.log('Hello')
                    }}
                    // onClick={handleClickSliderGallery}
                >
                    {fileGallery.map((file, index) => (
                        <SwiperSlide onClick={() => handleClickSliderGallery(index, file)} key={index} className="slider-item">
                            {/* <div className='shadow-slider'> */}
                            <div className="slider-item-container">
                                {activeSliderSmall === index && file.type === MediaType.image && (
                                    <>
                                        <div
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${file.url}')`,
                                            }}
                                            className="img"
                                        />
                                        <div
                                            className="btn-delete"
                                            onClick={() => handleCloseItemGallery(index)}
                                        >
                                            <CloseIcon ariaLabel="Delete" />
                                        </div>
                                    </>
                                )}

                                {activeSliderSmall !== index && file.type === MediaType.image && (
                                    <div
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${file.url}')`,
                                        }}
                                        className="img"
                                    />
                                )}
                                {activeSliderSmall === index && file.type === MediaType.video && (
                                    <>
                                        <div
                                            style={{
                                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${
                                                   thumbnails.find(thumb => thumb.urlBlob === file.url)?.urlThumb

                                                }')`,
                                            }}
                                            className="img"
                                        />
                                          <div
                                            className="btn-delete"
                                            onClick={() => handleCloseItemGallery(index)}
                                        >
                                            <CloseIcon ariaLabel="Delete" />
                                        </div>
                                    </>
                                    
                                )}

                                {activeSliderSmall !== index && file.type === MediaType.video && (
                                     <div
                                     style={{
                                         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${
                                            thumbnails.find(thumb => thumb.urlBlob === file.url)?.urlThumb

                                         }')`,
                                     }}
                                     className="img"
                                 />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="button-add-img" onClick={handleClickSelectImage}>
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
        /* width: 500px; */
        display: flex;
        margin-right: 8px;

        .slider-item {
            display: flex;
            justify-content: center;
            align-items: center;
            /* margin: 0 8px; */
            /* width: 94px; */
            .slider-item-container {
                position: relative;
                height: 100%;
                width: 100%;
            }

            .btn-delete {
                position: absolute;
                top: 4px;
                right: 10px;
                padding: 4px;
                background: black;
                border-radius: 50%;
                line-height: 0;
            }

            .img {
                /* height: 94px; */
                /* width: 94px; */
                height: 100%;
                width: 100%;
                /* margin: 0 6px; */
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                /* object-fit: cover; */
                /* filter: brightness(0.7); */
            }

            .video {
                height: 100%;
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
            /* display: ${(props) => (props.showButton ? 'block' : 'none')}; */
        }

        .swiper-button-next::after {
            /* display: none; */
        }

        .swiper-button-prev {
            background-image: ${(props) => `url(${props.urlReact}/images/bgIcon.png)`};
            height: 45px;
            width: 45px;
            background-position: -379px -128px;
            background-repeat: no-repeat;
        }

        .swiper-button-prev::after {
            /* display: none; */
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
