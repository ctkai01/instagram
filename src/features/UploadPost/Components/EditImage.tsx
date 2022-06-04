import { BackIcon, PlayIcon } from '@components/Icons';
import { FilterImage } from '@constants/filter-image';
import * as React from 'react';
import styled from 'styled-components';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import CanvasImage from './CanvasImage';
import FilterImageList from './FilterImageList';
import { FileUrl, StartEndTime } from './ModalPost';
import Konva from 'konva';
import { MediaType } from '@constants/media-type';
import VideoSetting from './VideoSetting';
import { getThumbnails } from 'video-metadata-thumbnails';
import ReactPlayer from 'react-player';

export interface IEditImageProps {
    fileGallery: FileUrl[];
    currentIndexBigSlider: number;
    startEndTime: StartEndTime[];
    handleChangeCurrentIndex: (index: number) => void;
    handleNextEditImage: (files: FileUrl[], indexSlideCurrent: number) => void;
    handleBackStep: () => void;
    setFiles: React.Dispatch<React.SetStateAction<FileUrl[]>>;
    setStartEndTime: React.Dispatch<React.SetStateAction<StartEndTime[]>>;
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
    indexSlider: number;
}

// export interface StartEndTime {
//     startTime: number;
//     endTime: number;
//     indexSlider: number;
// }

export interface ThumbnailsDragVideoFile {
    urlBlob: string;
    urlsThumb: string[];
    indexSlider: number;
}

export interface ThumbnailsCover {
    urlBlob: string;
    indexSlider: number;
}

export interface DurationVideo {
    duration: number;
    indexSlider: number;
}

export default function EditImage(props: IEditImageProps) {
    const {
        fileGallery,
        currentIndexBigSlider,
        handleChangeCurrentIndex,
        handleNextEditImage,
        handleBackStep,
        setFiles,
        startEndTime,
        setStartEndTime,
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
    const [showSettingVideo, setShowSettingVideo] = React.useState<boolean>(fileGallery[currentIndexBigSlider].type === MediaType.video);
    const currentRefVideo = React.useRef<ReactPlayer>(null);
    // const currentRefVideo = React.useRef<BaseReactPlayerProps>(null);
    const [isSubmitEdit, setIsSubmitEdit] = React.useState<boolean>(false);
    const [isPlayVideo, setIsPlayVideo] = React.useState<boolean>(false);
    // const [thumbnailsCover, setThumbnailsCover] = React.useState<ThumbnailsCover[]>([]);
    const [durationVideo, setDurationVideo] = React.useState<DurationVideo[]>([]);

    const [thumbnailsDrag, setThumbnailsDrag] = React.useState<ThumbnailsDragVideoFile[]>([]);

    const [filesCanvas, setFilesCanvas] = React.useState<FileUrl[]>([]);
    // const [startEndTime, setStartEndTime] = React.useState<StartEndTime[]>([]);
    const [swiper, setSwiper] = React.useState<SwiperCore>();

    console.log('FIle', fileGallery)
    const handleAddFileCanvas = (file: FileUrl) => {
        console.log('ADD Canvas', file);
        setFilesCanvas((filesCanvasPre) => [...filesCanvasPre, file]);
    };

    const initialPositionLeftRight = fileGallery.map((file, index) => ({
        posLeft: 0,
        posRight: 0,
        indexSlider: index,
        file: file
    })).filter(element => element.file.type === MediaType.video).map(element => ({
        posLeft: element.posLeft,
        posRight: element.posRight,
        indexSlider: element.indexSlider
    }))
    // console.log('INITIAL',initialPositionLeftRight)


    const [positionLeftRightDrag, setPositionLeftRightDrag] = React.useState<PositionDrag[]>(initialPositionLeftRight);
    console.log('POSTION', positionLeftRightDrag)
    const [adjustments, setAdjustments] =
        React.useState<AdjustmentValueImage[]>(initialAdjustments);

    const [activeFilter, setActiveFilter] = React.useState(0);
    // @ts-ignore: Object is possibly 'null'.
    const swiperIndex = swiper?.activeIndex | 0;
    const currentFilter = filters.find((filter) => filter.indexImage === swiperIndex) || filters[0];

    const handleSetThumbnails = (payload: ThumbnailsDragVideoFile) => {
        console.log(payload);
        setThumbnailsDrag((thumbnails: ThumbnailsDragVideoFile[]) => {
            const checkExist = thumbnails.find(
                (thumb) => thumb.indexSlider === payload.indexSlider
            );
            if (checkExist) {
                return thumbnails;
            } else {
                return [...thumbnails, payload];
            }
        });
    };
    // console.log('WHATWAR', thumbnailsDrag)

    const handleChangePositionDrag = (position: Partial<PositionDrag>) => {
        setPositionLeftRightDrag((positionPre) => {
            const positionClone = [...positionPre]
            let positionUpdate = positionClone.find(element => element.indexSlider === currentIndexBigSlider)
            if (positionUpdate) {
                positionUpdate = {...positionUpdate, ...position}
                positionClone[positionClone.findIndex(element => element.indexSlider === currentIndexBigSlider)] = positionUpdate
                return positionClone
            } else {
                return positionClone
            }

        });
    };

    const handleChangeStartEndTime = (stateChange: Partial<StartEndTime>) => {
        // setStartEndTime((prev) => ({ ...prev, ...stateChange }));

        setStartEndTime(startEndTime => {
            const startEndTimeClone = [...startEndTime]
            let startEndTimeUpdate = startEndTime.find(element => element.indexSlider === currentIndexBigSlider)
            if (startEndTimeUpdate) {
                startEndTimeUpdate = {...startEndTimeUpdate, ...stateChange}
                startEndTimeClone[startEndTimeClone.findIndex(element => element.indexSlider === currentIndexBigSlider)] = startEndTimeUpdate
                return startEndTimeClone
            } else {
                return startEndTimeClone
            }
        })

    };

    React.useEffect(() => {
        const generateThumbnail = async (file: FileUrl, index: number) => {

            if (
                !file.coverUrl
             ) {
                 let thumbnail = await getThumbnails(file.url, {
                     start: 0,
                     end: 0,
                     scale: 0.7,
                 });
                
                 setFiles(files => {
                     const filesClone = [...files]
                     let fileUpdate = file
 
                     if (fileUpdate) {
                         // @ts-ignore: Object is possibly 'null'.
                         fileUpdate = {...fileUpdate, coverUrl: URL.createObjectURL(thumbnail[0].blob)}
 
                         filesClone[index] = fileUpdate
 
                         return filesClone
                     } else {
                         return filesClone
                     }
                 })
             }

        };

        fileGallery.forEach((file, index) => {
            if (file.type === MediaType.video) {
                generateThumbnail(file, index);
            }
        })
    }, []);


    const handleChangeThumbCover = (url: string) => {
        setFiles(files => {
            const filesClone = [...files]
            let fileUpdate = fileGallery[currentIndexBigSlider]

            if (fileUpdate) {
                // @ts-ignore: Object is possibly 'null'.
                fileUpdate = {...fileUpdate, coverUrl: url}

                filesClone[currentIndexBigSlider] = fileUpdate

                return filesClone
            } else {
                return filesClone
            }
        })
    }

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
    //     handleNextEditImage(filesCanvas.slice(-fileGallery.length), currentIndexBigSlider);
    //     setIsSubmitEdit(false)
    // }
    const getFile = async (ref: any, namePath: string) => {
        if (ref.current) {
        console.log(ref)
        //@ts-ignore: Object is possibly 'null'.
        const base64 = await ref.current.toDataURL();

        const file = await dataUrlToFile(base64, namePath);
        handleAddFileCanvas({
            file,
            url: URL.createObjectURL(file),
            type: MediaType.image,
        });
        }
    };
    async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
        const res: Response = await fetch(dataUrl);
        const blob: Blob = await res.blob();
        return new File([blob], fileName, { type: 'image/png' });
    }
    React.useEffect(() => {
        if (isSubmitEdit && filesCanvas.length === 0) {
            console.log('Hey', refs)
            refs.forEach(async (ref, index) => {
                await getFile(ref.ref, fileGallery[index].file.name);
            });
        }
        console.log('A', filesCanvas.length)
        console.log('B', fileGallery.length)

        if (filesCanvas.length === fileGallery.filter(file => file.type === MediaType.image).length && isSubmitEdit) {
            handleNextEditImage(filesCanvas, currentIndexBigSlider);
        }
    }, [isSubmitEdit, filesCanvas]);
    const refs = React.useMemo(() => fileGallery.map((item) => ({ ref: React.createRef() })), []); // create refs only once

    console.log('CURRENT', isSubmitEdit);

    const handleChangeDurationVideo = async (nextSeconds: number) => {
        if (currentRefVideo.current) {
            let thumbnailsCoverImage = await getThumbnails(fileGallery[currentIndexBigSlider].url, {
                start: nextSeconds,
                end: nextSeconds,
                scale: 0.7,
            });

            setFiles(files => {
                const filesClone = [...files]
                let fileUpdate = fileGallery[currentIndexBigSlider]
    
                if (fileUpdate) {
                    // @ts-ignore: Object is possibly 'null'.
                    fileUpdate = {...fileUpdate, coverUrl: URL.createObjectURL(thumbnailsCoverImage[0].blob)}
    
                    filesClone[currentIndexBigSlider] = fileUpdate
    
                    return filesClone
                } else {
                    return filesClone
                }
            })
            
        }
    };

    const handleClickVideo = () => {
        if (showSettingVideo) {
            setIsPlayVideo((isPlay) => !isPlay);
        }
    };

    const handlePlayVideo = () => {
        setIsPlayVideo(true);
    };
    const handlePauseVideo = () => {
        setIsPlayVideo(false);
    };

    // React.useEffect(() => {
    //     if (currentRefVideo.current) {
    //         console.log('DurationXXX', currentRefVideo.current.getDuration())
    //         setDurationVideo(currentRefVideo.current.getDuration())
    //     }
    // }, [])

    console.log('REAK', fileGallery[currentIndexBigSlider].type);
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
                                setIsPlayVideo(false)
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
                                {file.type === MediaType.image  && (
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
                                        <ReactPlayer
                                            width="100%"
                                            height="100%"
                                            loop={true}
                                            playing={isPlayVideo}
                                            url={file.url}
                                            muted={fileGallery[currentIndexBigSlider].isMute}
                                            ref={currentRefVideo}
                                            onDuration={(duration: number) => {
                                                console.log('SETTTTTTT');
                                                setStartEndTime(startEndTime => {
                                                    const checkExist = startEndTime.find(element => element.indexSlider === currentIndexBigSlider)
                                                    if (!checkExist) {
                                                        return [...startEndTime, {
                                                            startTime: 0,
                                                            endTime: duration,
                                                            indexSlider: currentIndexBigSlider, 
                                                        }]
                                                    } else {
                                                        return startEndTime
                                                    }
                                                })

                                                setDurationVideo(durationVideo => {
                                                    const checkExist = durationVideo.find(element => element.indexSlider === currentIndexBigSlider)
                                                    if (!checkExist) {
                                                        return [...durationVideo, {
                                                            duration,
                                                            indexSlider: currentIndexBigSlider, 
                                                        }]
                                                    } else {
                                                        return durationVideo
                                                    }
                                                    // const startEndTimeClone = setStartEndTime
                                                })
                                                // setDurationVideo((durationVideo) => )

                                                // setDurationVideo(duration);
                                            }}
                                            onProgress={(state) => {
                                                // console.log(currentRefVideo.current?.seekTo(startTime));
                                                if (
                                                    state.playedSeconds + 0.3 >=
                                                    // @ts-ignore: Object is possibly 'null'.
                                                    startEndTime.find(el => el.indexSlider === currentIndexBigSlider).endTime
                                                ) {
                                                    console.log('READYY');
                                                    currentRefVideo.current?.seekTo(
                                                        // @ts-ignore: Object is possibly 'null'.
                                                        startEndTime.find(el => el.indexSlider === currentIndexBigSlider).startTime
                                                    );
                                                }
                                                console.log('Current', state.playedSeconds);
                                                 // @ts-ignore: Object is possibly 'null'.
                                                console.log('End time',  startEndTime.find(el => el.indexSlider === currentIndexBigSlider).endTime);
                                                // setDurationVideo(state.loadedSeconds);
                                            }}
                                        />

                                        {/* </div> */}
                                        {!isPlayVideo && (
                                            <div className="cover-photo-container">
                                                <div
                                                    className="img-cover"
                                                    style={{
                                                        backgroundImage: `url(${
                                                            fileGallery[currentIndexBigSlider].coverUrl
                                                        })`,
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
                    {fileGallery.map((file, index) => (
                        <>
                            {file.type === MediaType.video && index === currentIndexBigSlider && (
                                <VideoSetting
                                    positionLeftRightDrag={positionLeftRightDrag}
                                    handleChangePositionDrag={handleChangePositionDrag}
                                    durationVideo={durationVideo}
                                    handlePauseVideo={handlePauseVideo}
                                    handlePlayVideo={handlePlayVideo}
                                    handleChangeStartEndTime={handleChangeStartEndTime}
                                    handleChangeDurationVideo={handleChangeDurationVideo}
                                    handleSetThumbnails={handleSetThumbnails}
                                    setFiles={setFiles}
                                    handleChangeThumbCover={handleChangeThumbCover}
                                    fileGallery={fileGallery}
                                    thumbnailsDrag={thumbnailsDrag}
                                    currentRefVideo={currentRefVideo}
                                    currentIndexSlider={currentIndexBigSlider}
                                />
                            )}
                            {file.type === MediaType.image && index === currentIndexBigSlider && (
                                <FilterImageList
                                    handleChangeAdjustmentSaturation={
                                        handleChangeAdjustmentSaturation
                                    }
                                    handleChangeAdjustmentBrightness={
                                        handleChangeAdjustmentBrightness
                                    }
                                    handleChangeAdjustmentContrast={handleChangeAdjustmentContrast}
                                    handleChangeAdjustmentThreshold={
                                        handleChangeAdjustmentThreshold
                                    }
                                    handleChangeAdjustmentHue={handleChangeAdjustmentHue}
                                    handleChangeAdjustmentNoise={handleChangeAdjustmentNoise}
                                    handleResetAdjustmentSaturation={
                                        handleResetAdjustmentSaturation
                                    }
                                    handleResetAdjustmentBrightness={
                                        handleResetAdjustmentBrightness
                                    }
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
                        </>
                    ))}
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
