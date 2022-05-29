import { BackIcon, PlayIcon } from '@components/Icons';
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
import VideoSetting from './VideoSetting';
import { getThumbnails } from 'video-metadata-thumbnails';
import ReactPlayer from 'react-player';

export interface IEditImageProps {
    fileGallery: FileUrl[];
    currentIndexBigSlider: number;
    handleChangeCurrentIndex: (index: number) => void;
    handleNextEditImage: (files: FileUrl[], indexSlideCurrent: number) => void;
    handleBackStep: () => void;
    // setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
}
interface ContainerStyledProps {
    baseUrl: string;
}

export interface AdjustmentValueImage {
    saturation: number;
    brightness: number;
    contrast: number;
    threshold: number;
    hue: number;
    noise: number;
    indexImage?: number;
}

export interface FiltersImage {
    indexActive: number;
    value?: number;
    indexImage?: number;
}

export interface PositionDrag {
    posLeft: number;
    posRight: number;
}

export interface StartEndTime {
    startTime: number;
    endTime: number;
}

export default function EditImage(props: IEditImageProps) {
    const {
        fileGallery,
        currentIndexBigSlider,
        handleChangeCurrentIndex,
        handleNextEditImage,
        handleBackStep,
    } = props;
    // const refStage = React.useRef([]);
    // const [stageRef, setStageRef] = React.useState([])
    // refStage.current = [];
    const initialFilters: FiltersImage[] = fileGallery.map((file, index) => ({
        indexActive: FilterImage.ORIGINAL,
        indexImage: index,
    }));

    const initialAdjustments: AdjustmentValueImage[] = fileGallery.map((file, index) => ({
        saturation: 0,
        brightness: 0,
        contrast: 0,
        threshold: 0,
        hue: 0,
        noise: 0,
        indexImage: index,
    }));

    const [filters, setFilters] = React.useState<FiltersImage[]>(initialFilters);
    const [showSettingVideo, setShowSettingVideo] = React.useState<boolean>(false);
    const currentRefVideo = React.useRef<ReactPlayer>(null);
    // const currentRefVideo = React.useRef<BaseReactPlayerProps>(null);
    const [isSubmitEdit, setIsSubmitEdit] = React.useState<boolean>(false);
    const [isPlayVideo, setIsPlayVideo] = React.useState<boolean>(false);
    const [thumbnailsCover, setThumbnailsCover] = React.useState<string>('');
    const [durationVideo, setDurationVideo] = React.useState<number>(1);

    const [filesCanvas, setFilesCanvas] = React.useState<FileUrl[]>([]);
    const [startEndTime, setStartEndTime] = React.useState<StartEndTime>({
        startTime: 0,
        endTime: durationVideo
    });
    const [swiper, setSwiper] = React.useState<SwiperCore>();

    const handleAddFileCanvas = (file: FileUrl) => {
        console.log(file);
        setFilesCanvas((filesCanvasPre) => [...filesCanvasPre, file]);
    };

    const [positionLeftRightDrag, setPositionLeftRightDrag] = React.useState<PositionDrag>({
        posLeft: 0,
        posRight: 0
    })

    const [adjustments, setAdjustments] =
        React.useState<AdjustmentValueImage[]>(initialAdjustments);

    const [activeFilter, setActiveFilter] = React.useState(0);
    // @ts-ignore: Object is possibly 'null'.
    const swiperIndex = swiper?.activeIndex | 0;
    const currentFilter = filters.find((filter) => filter.indexImage === swiperIndex) || filters[0];


    const handleChangePositionDrag = (position: Partial<PositionDrag>) => {
        setPositionLeftRightDrag((positionPre) => ({...positionPre, ...position}))
    }

    const handleChangeStartEndTime = (stateChange: Partial<StartEndTime>) => {
        setStartEndTime((prev) => ({...prev, ...stateChange}))
    }
    // React.useEffect(() => {
    //     if (
    //         currentRefVideo.current &&
    //         fileGallery[currentIndexBigSlider].type === MediaType.video
    //     ) {
    //         // currentRefVideo.current.onloadedmetadata = function() {
    //         //       // @ts-ignore: Object is possibly 'null'.
    //         console.log('DUR', currentRefVideo.current.getDuration())
    //             setDurationVideo(currentRefVideo.current.getDuration());
    //         // }
    //         // console.log(currentRefVideo.current.duration);

    //     }
    // }, [currentIndexBigSlider]);

    React.useEffect(() => {
        const generateThumbnail = async () => {
            let thumbnail = await getThumbnails(fileGallery[currentIndexBigSlider].url, {
                start: 0,
                end: 0,
                scale: 0.7,
            });
            // @ts-ignore: Object is possibly 'null'.
            setThumbnailsCover(URL.createObjectURL(thumbnail[0].blob));
        };

        if (fileGallery[currentIndexBigSlider].type === MediaType.video) {
            generateThumbnail();
        }
    }, [currentIndexBigSlider]);

    const handleClickFilter = (index: number) => {
        // @ts-ignore: Object is possibly 'null'.
        const swiperIndex = swiper?.activeIndex | 0;

        if (
            index === FilterImage.ORIGINAL ||
            index === FilterImage.SOLARIZE ||
            index === FilterImage.SEPIA ||
            index === FilterImage.INVERT ||
            index === FilterImage.GRAY_SCALE
        ) {
            setFilters((filterPre) => {
                const newFilter = filterPre.map((filter) => {
                    if (filter.indexImage === swiperIndex) {
                        return {
                            ...filter,
                            indexActive: index,
                        };
                    } else {
                        return filter;
                    }
                });
                return newFilter;
            });
        } else if (
            index === FilterImage.GREEN_RGB ||
            index === FilterImage.BLUE_RGB ||
            index === FilterImage.RED_RGB
        ) {
            setFilters((filterPre) => {
                const newFilter = filterPre.map((filter) => {
                    if (filter.indexImage === swiperIndex) {
                        return {
                            ...filter,
                            indexActive: index,
                            value: 140,
                        };
                    } else {
                        return filter;
                    }
                });
                return newFilter;
            });
        } else {
            setFilters((filterPre) => {
                const newFilter = filterPre.map((filter) => {
                    if (filter.indexImage === swiperIndex) {
                        return {
                            ...filter,
                            indexActive: index,
                            value: 0,
                        };
                    } else {
                        return filter;
                    }
                });
                return newFilter;
            });
        }

        setActiveFilter(index);
    };

    const handleChangeAdjustmentSaturation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;

        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        saturation: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentSaturation = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        saturation: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentBrightness = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;

        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        brightness: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentBrightness = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        brightness: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentContrast = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        contrast: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentContrast = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        contrast: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentThreshold = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        threshold: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentThreshold = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        threshold: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentHue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;

        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        hue: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentHue = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        hue: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeAdjustmentNoise = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        noise: value,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleResetAdjustmentNoise = () => {
        setAdjustments((adjustmentsPre) => {
            const newFilter = adjustmentsPre.map((adjustment) => {
                if (adjustment.indexImage === swiperIndex) {
                    return {
                        ...adjustment,
                        noise: 0,
                    };
                } else {
                    return adjustment;
                }
            });
            return newFilter;
        });
    };

    const handleChangeRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore: Object is possibly 'null'.
        const swiperIndex = swiper?.activeIndex | 0;
        const value = +e.target.value;
        setFilters((filterPre) => {
            const newFilter = filterPre.map((filter) => {
                if (filter.indexImage === swiperIndex) {
                    return {
                        ...filter,
                        value: value,
                    };
                } else {
                    return filter;
                }
            });
            return newFilter;
        });
    };

    const currentAdjustment =
        adjustments.find((adjustment) => adjustment.indexImage === swiperIndex) || adjustments[0];
    console.log(showSettingVideo);
    // if (isSubmitEdit) {
    //     console.log(filesCanvas)
    //     handleNextEditImage(filesCanvas.slice(-fileGallery.length));
    //     setIsSubmitEdit(false)
    // }
    const getFile = async (ref: any, namePath: string) => {
        // if (ref) {
        //@ts-ignore: Object is possibly 'null'.
        const base64 = await ref.current.toDataURL();

        const file = await dataUrlToFile(base64, namePath);
        handleAddFileCanvas({
            file,
            url: URL.createObjectURL(file),
            type: MediaType.image,
        });
        // }
    };
    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        return new File([blob], fileName, { type: 'image/png' });
    }
    React.useEffect(() => {
        if (isSubmitEdit && filesCanvas.length === 0) {
            refs.forEach(async (ref, index) => {
                await getFile(ref.ref, fileGallery[index].file.name);
            });
        }
        if (filesCanvas.length === fileGallery.length) {
            handleNextEditImage(filesCanvas, currentIndexBigSlider);
        }
    }, [isSubmitEdit, filesCanvas]);
    const refs = React.useMemo(() => fileGallery.map((item) => ({ ref: React.createRef() })), []); // create refs only once

    const handleChangeDurationVideo = async (nextSeconds: number) => {
        console.log('debounce');
        if (currentRefVideo.current) {
            let thumbnails = await getThumbnails(fileGallery[currentIndexBigSlider].url, {
                start: nextSeconds,
                end: nextSeconds,
                scale: 0.7,
            });
            // @ts-ignore: Object is possibly 'null'.
            setThumbnailsCover(URL.createObjectURL(thumbnails[0].blob));
        }
    };

    const handleClickVideo = () => {
        if (showSettingVideo) {
            setIsPlayVideo((isPlay) => !isPlay);
        }
    };

    const handlePlayVideo = () => {
        setIsPlayVideo(true);
    }
    
    return (
        <Container baseUrl={window.location.origin}>
            {/* <Container> */}
            <div className="header">
                {/* <div className="back-button" onClick={handleBackChoseImage}> */}
                <div className="back-button" onClick={handleBackStep}>
                    <BackIcon ariaLabel="Back" />
                </div>
                <div className="main-header">Edit</div>
                <div
                    className="next-button"
                    onClick={() => {
                        setIsSubmitEdit((isSubmit) => !isSubmit);
                    }}
                >
                    Next
                </div>
            </div>
            <div className="content-main" style={{ flexDirection: 'row', height: '80vh' }}>
                <div className="img-list">
                    <Swiper
                        initialSlide={currentIndexBigSlider}
                        pagination={true}
                        slidesPerView={1}
                        navigation={true}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        allowTouchMove={false}
                        effect={'fade'}
                        onSlideChange={(swiper) => {
                            handleChangeCurrentIndex(swiper.activeIndex);
                            console.log(swiper.activeIndex);
                            if (fileGallery[swiper.activeIndex].type === MediaType.video) {
                                setShowSettingVideo(true);
                            } else {
                                setShowSettingVideo(false);
                            }
                        }}
                    >
                        {fileGallery.map((file, index) => (
                            <SwiperSlide
                                onClick={handleClickVideo}
                                key={index}
                                className="slider-item"
                            >
                                {file.type === MediaType.image && index === currentIndexBigSlider && (
                                    <CanvasImage
                                        // ref={refStage[index]}
                                        showCanvas={currentIndexBigSlider === index}
                                        ref={refs[index].ref}
                                        filters={filters}
                                        indexCanvas={index}
                                        currentAdjustment={currentAdjustment}
                                        fileUpload={file}
                                        currentFilter={currentFilter}
                                    />
                                )}

                                {file.type === MediaType.video && index === currentIndexBigSlider && (
                                    <div
                                        className="video-container"
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        {/* <video
                                            loop
                                            ref={currentRefVideo}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                            src={file.url}
                                        ></video> */}
                                        {/* <div  className="video-img"> */}
                                        <ReactPlayer
                                            width='100%'
                                            height='100%'
                                            loop={true}
                                            playing={isPlayVideo}
                                            url={file.url}
                                            ref={currentRefVideo}
                                            
                                            onDuration={(duration: number) => setDurationVideo(duration)}
                                            onProgress={(state) => {
                                                // console.log(currentRefVideo.current?.seekTo(startTime));
                                                if (state.playedSeconds + 0.3 >= startEndTime.endTime) {
                                                    console.log('READYY')
                                                    currentRefVideo.current?.seekTo(startEndTime.startTime)
                                                }
                                                console.log('Current', state.playedSeconds)
                                                console.log('End time', startEndTime.endTime)
                                                setDurationVideo(state.loadedSeconds);
                                                

                                            }}
                                        />

                                        {/* </div> */}
                                        {!isPlayVideo && (
                                            <div className="cover-photo-container">
                                                <div
                                                    className="img-cover"
                                                    style={{
                                                        backgroundImage: `url(${thumbnailsCover})`,
                                                    }}
                                                ></div>
                                                <div className="btn-play-video">
                                                    <PlayIcon size="big" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="filter-list">
                    {fileGallery[currentIndexBigSlider].type === MediaType.video ? (
                        <VideoSetting
                            positionLeftRightDrag={positionLeftRightDrag}
                            handleChangePositionDrag={handleChangePositionDrag}
                            durationVideo={durationVideo}
                            handlePlayVideo={handlePlayVideo}
                            handleChangeStartEndTime={handleChangeStartEndTime}
                            handleChangeDurationVideo={handleChangeDurationVideo}
                            fileGallery={fileGallery}
                            currentRefVideo={currentRefVideo}
                            currentIndexSlider={currentIndexBigSlider}
                        />
                    ) : (
                        <FilterImageList
                            handleChangeAdjustmentSaturation={handleChangeAdjustmentSaturation}
                            handleChangeAdjustmentBrightness={handleChangeAdjustmentBrightness}
                            handleChangeAdjustmentContrast={handleChangeAdjustmentContrast}
                            handleChangeAdjustmentThreshold={handleChangeAdjustmentThreshold}
                            handleChangeAdjustmentHue={handleChangeAdjustmentHue}
                            handleChangeAdjustmentNoise={handleChangeAdjustmentNoise}
                            handleResetAdjustmentSaturation={handleResetAdjustmentSaturation}
                            handleResetAdjustmentBrightness={handleResetAdjustmentBrightness}
                            handleResetAdjustmentContrast={handleResetAdjustmentContrast}
                            handleResetAdjustmentThreshold={handleResetAdjustmentThreshold}
                            handleResetAdjustmentHue={handleResetAdjustmentHue}
                            handleResetAdjustmentNoise={handleResetAdjustmentNoise}
                            currentAdjustment={currentAdjustment}
                            handleChangeRangeValue={handleChangeRangeValue}
                            activeFilter={activeFilter}
                            currentFilter={currentFilter}
                            handleClickFilter={handleClickFilter}
                        />
                    )}
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

    video {
        object-fit: cover;
    }

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
        .video-container {
            position: relative;

            z-index: 9999;
            .cover-photo-container {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }

            .img-cover {
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center center;
                /* background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgep9UrtTmyClOM4e45sGoOMSTCHDEp_mfQ&usqp=CAU'); */
            }

            .btn-play-video {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
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
