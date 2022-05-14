import { BackIcon, ZoomIcon } from '@components/Icons';
import { GalleryIcon } from '@components/Icons/GalleryIcon';
import { useGesture } from '@use-gesture/react';
import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { FileUrl } from '.';
import GalleryImage from './GalleryImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';

export interface ICropImageProps {
    imageGallery: string[];
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
    setIsClickBackFirst: React.Dispatch<React.SetStateAction<boolean>>;
    handleShowModalDiscard: () => void;
}

interface ContainerStyledProps {
    imageUrl: string;
    isDragging: boolean;
}
SwiperCore.use([Navigation, Pagination]);

export function CropImage(props: ICropImageProps) {
    const { imageGallery, handleShowModalDiscard, setIsClickBackFirst } = props;
    const [isZoom, setIsZoom] = React.useState<boolean>(false);
    const [isGallery, setIsGallery] = React.useState<boolean>(false);
    const [scaleA, setScale] = React.useState<number>(1);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [style, api] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        rotateZ: 0,
    }));

    const ref = React.useRef(null);
    useGesture(
        {
            onDrag: ({ down, movement: [mx, my], pinching, cancel, offset: [x, y], ...rest }) => {
                setIsZoom(false);
                setScale(1);
                if (!isDragging) {
                    setIsDragging(true);
                }
                if (pinching) return cancel();
                api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down });
            },
            onPinch: ({ origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
                if (first) {
                    // @ts-ignore: Object is possibly 'null'.
                    const { width, height, x, y } = ref.current.getBoundingClientRect();
                    const tx = ox - (x + width / 2);
                    const ty = oy - (y + height / 2);
                    memo = [style.x.get(), style.y.get(), tx, ty];
                }

                const x = memo[0] - ms * memo[2];
                const y = memo[1] - ms * memo[3];
                api.start({ scale: s, rotateZ: a, x, y });
                return memo;
            },
            onDragEnd: (state: any) => {
                setIsDragging(false);
            },
        },
        {
            target: ref,
            drag: { from: () => [style.x.get(), style.y.get()] },
            pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
        }
    );
    const styleBgImage = { ...style, transform: `scale(${scaleA})` };
    const handleBackChoseImage = () => {
        setIsClickBackFirst(true);
        handleShowModalDiscard();
    };

    const handleClickZoomButton = () => {
        setIsZoom((stateZoom) => !stateZoom);
    };

    const handleClickGalleryButton = () => {
        setIsGallery((stateGallery) => !stateGallery);
    };

    const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScale(+e.target.value);
    };

    return (
        <Test >
        <Swiper pagination={true} slidesPerView={1} navigation={true} allowTouchMove={false}>
            {imageGallery.map((mediaItem) => (
                <>
                <SwiperSlide className="slider-item">
                    <Container imageUrl={mediaItem} isDragging={isDragging}>
                        <div className="header">
                            <div className="back-button" onClick={handleBackChoseImage}>
                                <BackIcon ariaLabel="Back" />
                            </div>
                            <div className="main-header">Crop</div>
                            <div className="next-button">Next</div>
                        </div>
                        <div className="content-main">
                            <animated.div
                                style={styleBgImage}
                                ref={ref}
                                // style={{ transform: `scale(${scaleA})` }}
                                className="image-container"
                            ></animated.div>
                            {isDragging && (
                                <animated.div className="grid-container">
                                    <div className="cell-y first"></div>
                                    <div className="cell-y last"></div>
                                    <div className="cell-x first"></div>
                                    <div className="cell-x last"></div>
                                </animated.div>
                            )}
                            <div className="tools-bar">
                                <div
                                    style={{
                                        opacity: `${isZoom ? '0.7' : '1'}`,
                                        background: `${isZoom ? '#fff' : 'rgba(26, 26, 26, 0.8)'}`,
                                    }}
                                    className="btn-zoom"
                                    onClick={handleClickZoomButton}
                                >
                                    {isZoom ? (
                                        <>
                                            <ZoomIcon ariaLabel="Zoom" color="black" />
                                            <input
                                                onChange={handleChangeRange}
                                                type="range"
                                                value={scaleA}
                                                min="1"
                                                max="2"
                                                step="0.01"
                                            />
                                        </>
                                    ) : (
                                        <ZoomIcon ariaLabel="Zoom" />
                                    )}
                                </div>
                                <div
                                    className="btn-gallery"
                                    style={{
                                        opacity: `${isGallery ? '0.7' : '1'}`,
                                        background: `${
                                            isGallery ? '#fff' : 'rgba(26, 26, 26, 0.8)'
                                        }`,
                                    }}
                                >
                                    <div
                                        onClick={handleClickGalleryButton}
                                        style={{ lineHeight: `0` }}
                                    >
                                        {isGallery ? (
                                            <GalleryIcon ariaLabel="Zoom" color="black" />
                                        ) : (
                                            <GalleryIcon ariaLabel="Zoom" />
                                        )}
                                    </div>

                                    {isGallery && (
                                        <GalleryImage
                                            className="gallery-container"
                                            imageGallery={imageGallery}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </SwiperSlide>
                <SwiperSlide>

                    <Container imageUrl={mediaItem} isDragging={isDragging}>
                        <div className="header">
                            <div className="back-button" onClick={handleBackChoseImage}>
                                <BackIcon ariaLabel="Back" />
                            </div>
                            <div className="main-header">Crop</div>
                            <div className="next-button">Next</div>
                        </div>
                        <div className="content-main">
                            <animated.div
                                style={styleBgImage}
                                ref={ref}
                                // style={{ transform: `scale(${scaleA})` }}
                                className="image-container"
                            ></animated.div>
                            {isDragging && (
                                <animated.div className="grid-container">
                                    <div className="cell-y first"></div>
                                    <div className="cell-y last"></div>
                                    <div className="cell-x first"></div>
                                    <div className="cell-x last"></div>
                                </animated.div>
                            )}
                            <div className="tools-bar">
                                <div
                                    style={{
                                        opacity: `${isZoom ? '0.7' : '1'}`,
                                        background: `${isZoom ? '#fff' : 'rgba(26, 26, 26, 0.8)'}`,
                                    }}
                                    className="btn-zoom"
                                    onClick={handleClickZoomButton}
                                >
                                    {isZoom ? (
                                        <>
                                            <ZoomIcon ariaLabel="Zoom" color="black" />
                                            <input
                                                onChange={handleChangeRange}
                                                type="range"
                                                value={scaleA}
                                                min="1"
                                                max="2"
                                                step="0.01"
                                            />
                                        </>
                                    ) : (
                                        <ZoomIcon ariaLabel="Zoom" />
                                    )}
                                </div>
                                <div
                                    className="btn-gallery"
                                    style={{
                                        opacity: `${isGallery ? '0.7' : '1'}`,
                                        background: `${
                                            isGallery ? '#fff' : 'rgba(26, 26, 26, 0.8)'
                                        }`,
                                    }}
                                >
                                    <div
                                        onClick={handleClickGalleryButton}
                                        style={{ lineHeight: `0` }}
                                    >
                                        {isGallery ? (
                                            <GalleryIcon ariaLabel="Zoom" color="black" />
                                        ) : (
                                            <GalleryIcon ariaLabel="Zoom" />
                                        )}
                                    </div>

                                    {isGallery && (
                                        <GalleryImage
                                            className="gallery-container"
                                            imageGallery={imageGallery}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </SwiperSlide>
                </>
            ))}
        </Swiper>
        </Test>
    );
}
// Open Media Gallery
const Test = styled.div`
    .swiper-wrapper {
        display: flex;
        align-items: center;
    }

    .swiper-button-next {
        background-image: ${(props) => `url(http://localhost:3000/images/bgIcon.png)`};
        height: 45px;
        width: 45px;
        background-position: -244px -107px;
        background-repeat: no-repeat;
    }

    .swiper-button-next::after {
        display: none;
    }

    .swiper-button-prev {
        background-image: ${(props) => `url(http://localhost:3000/images/bgIcon.png)`};
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
        /* border-left: 1px solid rgba(219, 219, 219, 1); */
        /* border-right: 1px solid rgba(219, 219, 219, 1); */
        padding-top: 10px;
    }

`
const Container = styled.div<ContainerStyledProps>`

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

    .grid-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        position: absolute;
        border: 1px solid rgba(255, 255, 255, 1);

        .cell-y {
            position: absolute;
            top: 0%;
            width: 1px;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 25%);
            box-shadow: 0 0 4px 0 rgb(0 0 0 / 25%);
            -webkit-box-shadow: 0 0 4px 0 rgba(var(--jb7, 0, 0, 0), 0.25);
            box-shadow: 0 0 4px 0 rgba(var(--jb7, 0, 0, 0), 0.25);

            &.first {
                left: 33%;
            }

            &.last {
                right: 33%;
            }
        }

        .cell-x {
            position: absolute;
            left: 0%;
            width: 100%;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.3);
            -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 25%);
            box-shadow: 0 0 4px 0 rgb(0 0 0 / 25%);
            -webkit-box-shadow: 0 0 4px 0 rgba(var(--jb7, 0, 0, 0), 0.25);
            box-shadow: 0 0 4px 0 rgba(var(--jb7, 0, 0, 0), 0.25);

            &.first {
                top: 33%;
            }

            &.last {
                bottom: 33%;
            }
        }
    }

    .content-main {
        overflow: hidden;
        width: 100%;
        cursor: grab;
        position: relative;

        .image-container {
            width: 100%;
        }
        .tools-bar {
            /* padding: 0 20px; */
            position: absolute;
            bottom: 20px;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        .btn-zoom {
            padding: 8px;
            margin-right: 20px;
            background: rgba(26, 26, 26, 0.8);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
            cursor: pointer;
            display: flex;
            justify-content: center;
            position: relative;

            input {
                position: absolute;
                top: -26px;
                left: 0;
            }
        }

        .btn-zoom:hover {
            opacity: 0.7;
        }

        .btn-gallery {
            margin-right: 20px;
            padding: 8px;
            background: rgba(26, 26, 26, 0.8);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
            cursor: pointer;
            display: flex;
            justify-content: center;
            position: relative;

            .gallery-container {
                position: absolute;
                /* left: -38px; */
                right: 0;
                top: -150px;
                display: flex;
                align-items: center;
                background-color: rgba(26, 26, 26, 0.8);
                border-radius: 8px;
            }
        }
    }

    .image-container {
        background-image: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : '')};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        overflow: hidden;
        width: 550px;
        height: 64vh;
        touch-action: none;
        cursor: ${(props) => (props.isDragging ? `grabbing` : 'grab')};
    }
`;
