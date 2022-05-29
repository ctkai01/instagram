import { MediaType } from '@models/commom';
import LoadingSpecify from '@components/common/LoadingSpecify';

import * as React from 'react';
import styled from 'styled-components';
import { getThumbnails } from 'video-metadata-thumbnails';
import { FileUrl } from './ModalPost';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { useGesture } from '@use-gesture/react';
import { animated, useSpring } from 'react-spring';
import _, { debounce } from 'lodash';
import SwitchButton from './SwitchButton';
import { setInterval } from 'timers';
import ReactPlayer from 'react-player';
import { PositionDrag, StartEndTime } from './EditImage';

interface IVideoSettingProps {
    currentIndexSlider: number;
    durationVideo: number;
    fileGallery: FileUrl[];
    positionLeftRightDrag: PositionDrag;
    handlePlayVideo: () => void;
    handleChangePositionDrag: (position: Partial<PositionDrag>) => void;
    handleChangeStartEndTime: (stateChange: Partial<StartEndTime>) => void;
    // currentRefVideo: React.RefObject<HTMLVideoElement>;
    currentRefVideo: React.RefObject<ReactPlayer>;
    handleChangeDurationVideo: (nextSeconds: number) => void;
}

export interface ThumbnailsVideoFile {
    urlBlob: string;
    urlsThumb: string[];
}



export default function VideoSetting(props: IVideoSettingProps) {
    const {
        fileGallery,
        durationVideo,
        currentIndexSlider,
        currentRefVideo,
        positionLeftRightDrag,
        handlePlayVideo,
        handleChangeStartEndTime,
        handleChangePositionDrag,
        handleChangeDurationVideo,
    } = props;
    let videoSliderRef = React.useRef<HTMLVideoElement>(null);
    const [thumbnails, setThumbnails] = React.useState<ThumbnailsVideoFile>();
    const [logoPos, setLogoPos] = useSpring(() => ({ x: 0, y: 0 }));

    const [dragLef, setDragLef] = useSpring(() => ({ x: 0, y: 0 }));
    const [dragRight, setDragRight] = useSpring(() => ({ x: 0, y: 0 }));
    // const [positionLeftRightDrag, setPositionLeftRightDrag] = React.useState<PositionDrag>({
    //     posLeft: 0,
    //     posRight: 0
    // })
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMuteVideo, setIsMuteVideo] = React.useState(false);

    const ref = React.useRef(null);
    const refDragLeft = React.useRef(null);
    const refDragRight = React.useRef(null);
    const refContentTrimVideo = React.useRef<HTMLDivElement>(null);
   
    React.useEffect(() => {
        if (currentRefVideo.current && refContentTrimVideo.current) {
            // console.log(durationVideo)
            const startTime = positionLeftRightDrag.posLeft === 0 ? 0 : ( positionLeftRightDrag.posLeft/refContentTrimVideo.current.clientWidth ) * durationVideo
            const endTime = positionLeftRightDrag.posRight === 0 ? durationVideo : ( (refContentTrimVideo.current.clientWidth + positionLeftRightDrag.posRight)/refContentTrimVideo.current.clientWidth ) * durationVideo
            // const durationTime = (endTime - startTime) * 1000
            console.log('First', refContentTrimVideo.current.clientWidth)
            console.log('Second', refContentTrimVideo.current.clientWidth)
            console.log('So chia', -positionLeftRightDrag.posRight/refContentTrimVideo.current.clientWidth)
            console.log('Right', positionLeftRightDrag.posRight)
            handlePlayVideo()
            currentRefVideo.current?.seekTo(startTime)
            handleChangeStartEndTime({
                startTime,
                endTime
            })
      
        }
    }, [positionLeftRightDrag])

    // React.useEffect(() => {
    //     if (currentRefVideo.current && refContentTrimVideo.current) {
    //         // console.log(durationVideo)
    //         const startTime = positionLeftRightDrag.posLeft === 0 ? 0 : ( positionLeftRightDrag.posLeft/refContentTrimVideo.current.clientWidth ) * durationVideo
    //         const endTime = positionLeftRightDrag.posRight === 0 ? durationVideo: ( positionLeftRightDrag.posRight/refContentTrimVideo.current.clientWidth ) * durationVideo
    //         // const durationTime = (endTime - startTime) * 1000
    //         console.log('Start time AAA', startTime)
    //         console.log('End time AA', endTime)
    //         handleChangeStartEndTime({
    //             startTime,
    //             endTime
    //         })
      
    //     }
    // }, [])

    React.useEffect(() => {
        const getThumbnailVideos = async () => {
            // console.log(currentRefVideo);
            if (currentRefVideo.current) {
                const fileThumb = fileGallery[currentIndexSlider];
                // console.log(fileThumb);
                console.log('DURATION', durationVideo);
                let thumbnails = await getThumbnails(fileThumb.url, {
                    start: 0,
                    interval: durationVideo / 5,
                    scale: 0.7,
                });
                setIsLoading(false);
                thumbnails = thumbnails.slice(0, thumbnails.length - 1);
                // @ts-ignore: Object is possibly 'null'.
                const blobThumbs = thumbnails.map((thumb) => URL.createObjectURL(thumb.blob));
                setThumbnails({
                    urlBlob: fileThumb.url,
                    urlsThumb: blobThumbs,
                });
            }

            if (currentRefVideo.current && refContentTrimVideo.current) {
                // console.log(durationVideo)
                const startTime = positionLeftRightDrag.posLeft === 0 ? 0 : ( positionLeftRightDrag.posLeft/refContentTrimVideo.current.clientWidth ) * durationVideo
                const endTime = positionLeftRightDrag.posRight === 0 ? durationVideo: ( positionLeftRightDrag.posRight/refContentTrimVideo.current.clientWidth ) * durationVideo
                // const durationTime = (endTime - startTime) * 1000
                console.log('Start time AAA', startTime)
                console.log('End time AA', endTime)
                handleChangeStartEndTime({
                    startTime,
                    endTime
                })
          
            }
        };
        getThumbnailVideos();
    }, []);
    const debounceDropDown = React.useCallback(
        debounce((nextValue) => handleChangeDurationVideo(nextValue), 500),
        []
    );

    useGesture(
        {
            onDrag: ({ down, movement: [mx, my], pinching, cancel, offset: [x, y], ...rest }) => {
                if (pinching) return cancel();
                if (x >= 0 && x <= 255) {
                    if (videoSliderRef.current) {
                        const nextSeconds = videoSliderRef.current.duration * (x / 252);
                        debounceDropDown(nextSeconds);
                        videoSliderRef.current.currentTime = nextSeconds;
                    }
                }
                let xApply = x >= 252 ? 252 : x;
                if (x <= 0) {
                    xApply = 0;
                }

                setLogoPos.start({ x: xApply, y: 0 });
            },
        },
        {
            target: ref,
            //  @ts-ignore: Object is possibly 'null'.
            drag: { from: () => [logoPos.x.get(), logoPos.y.get()] },
            pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
        }
    );

    useGesture(
        {
            onDrag: ({ down, movement: [mx, my], pinching, cancel, offset: [x, y], ...rest }) => {
                if (pinching) return cancel();
        
                let xApply = 0;
                

                if (refContentTrimVideo.current) {
                    const limit = refContentTrimVideo.current.clientWidth + dragRight.x.get() - 12
                    xApply = x >= limit ? limit : x;
                }

                if (x <= 0) {
                    xApply = 0;
                }
                setDragLef.start({ x: xApply, y: 0 });
                setTimeout(() =>  handleChangePositionDrag({posLeft: xApply}), 100)
             

            },
        },
        {
            target: refDragLeft,
            //  @ts-ignore: Object is possibly 'null'.
            drag: { from: () => [dragLef.x.get(), dragLef.y.get()] },
            pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
        }
    );

    useGesture(
        {
            onDrag: ({ down, movement: [mx, my], pinching, cancel, offset: [x, y], ...rest }) => {
                if (pinching) return cancel();
               
                let xApply = 0;
                
                if (refContentTrimVideo.current) {
                    const limit = refContentTrimVideo.current.clientWidth - dragLef.x.get() - 12
                    const xTransform = x < 0 ? x : -Math.abs(x) 
                    xApply = xTransform >= -Math.abs(limit) ? xTransform : -Math.abs(limit);
                    // console.log('Limit', limit)
                    // console.log('Lef', dragLef.x.get())
                }

                if (x >= 0) {
                    xApply = 0;
                }
                setDragRight.start({ x: xApply, y: 0 });
                setTimeout(() =>  handleChangePositionDrag({posRight: xApply}), 100)
            },
        },
        {
            target: refDragRight,
            //  @ts-ignore: Object is possibly 'null'.
            drag: { from: () => [dragRight.x.get(), dragRight.y.get()] },
            pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
        }
    );

    // console.log(thumbnails);
    const handleClickSwitch = (e: any) => {
        setIsMuteVideo((isMute) => !isMute);
    };
    return (
        <Container>
            {isLoading ? (
                <div className="container-loading">
                    <LoadingSpecify />
                </div>
            ) : (
                <>
                    <div className="option-item cover-photo-container">
                        <div className="option-header">
                            <div className="text-tittle">Cover photo</div>
                            <div className="select-input-cover">
                                <button className="btn-select-cover-photo">
                                    Select from computer
                                </button>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    className="input-cover-photo"
                                />
                            </div>
                        </div>
                        <div className="option-content">
                            <div className="list-thumbnails">
                                <div className="thumbnails" style={{ display: 'flex' }}>
                                    {thumbnails?.urlsThumb.map((thumbnail, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                backgroundImage: `url(${thumbnail})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                height: '100px',
                                                flex: 1,
                                            }}
                                        ></div>
                                    ))}
                                    <animated.div
                                        style={logoPos}
                                        // style={{ transform: `translateX(${sliderPosition}px)` }}
                                        className="container-drag-video"
                                        ref={ref}
                                        // onMouseUp={handleMouseUpCover}
                                        // onMouseDown={handleMouseDownCover}
                                    >       
                                        <video
                                            ref={videoSliderRef}
                                            className="video-img"
                                            src={`${fileGallery[currentIndexSlider].url}`}
                                        >
                                        </video>
                                    </animated.div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="option-item">
                        <div className="option-header">
                            <div className="text-tittle">Trim</div>
                        </div>
                        <div className="option-content">
                            <div className="thumbnails-trim-container" ref={refContentTrimVideo}>
                                <div className="thumbnails-trim">
                                    {thumbnails?.urlsThumb.map((thumbnail, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                backgroundImage: `url(${thumbnail})`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                // flex: ,
                                                width: '19%',
                                            }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="thumbnails-ignore">
                                    <div style={{width: `${positionLeftRightDrag.posLeft}px`}} className="thumbnails-ignore-left"></div>
                                    <div style={{width: `${-positionLeftRightDrag.posRight}px`}} className="thumbnails-ignore-right"></div>
                                </div>
                                <div className="thumbnails-selected"></div>
                                <animated.div style={dragLef} ref={refDragLeft} className="line-vertical-container left">
                                    <div className="line-vertical"></div>
                                </animated.div>
                                <animated.div style={dragRight} ref={refDragRight} className="line-vertical-container right">
                                    <div className="line-vertical"></div>
                                </animated.div>
                                {/* <div className="line-vertical right"></div> */}
                                {/* <div className="thumbnails-trim-modal">
                                    
                                </div> */}
                                {/* <div className="modal-thumbnails"></div> */}
                            </div>
                            <div className="time-line-seconds">
                                <div className="time-line-item">
                                    <div className="circle-item active"></div>
                                    <div>0s</div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item "></div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item "></div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item "></div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item active"></div>
                                    <div>11s</div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item "></div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item "></div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item "></div>
                                </div>
                                <div className="time-line-item">
                                    <div className="circle-item active"></div>
                                    <div>22s</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="option-item setting-sound">
                        <div className="option-header">
                            <div className="text-tittle">Turn video sound off</div>
                        </div>
                        <div className="option-content">
                            <div className="video-sound-container">
                                <div className="text">Video Sound {isMuteVideo ? 'Off' : 'On'}</div>
                                <SwitchButton handleClick={handleClickSwitch} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 16px;
    .container-loading {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .option-item {
        margin-bottom: 20px;
    }

    .option-header {
        display: flex;
        margin: 14px 0;
        justify-content: space-between;
        .text-tittle {
            font-size: 16px;
            color: #262626;
            font-weight: 600;
        }

        .select-input-cover {
            button {
                border: 0;
                color: #0095f6;
                padding: 0;
                position: relative;
                appearance: none;
                background: 0 0;
                font-weight: 600;
                user-select: none;
                font-size: 14px;
            }
            input {
                display: none;
            }
        }
    }

    .option-content {
        margin: 8px 0;
        .video-sound-container {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                font-size: 16px;
                color: #262626;
            }
        }

        .thumbnails-trim-container {
            height: 64px;
            position: relative;
            box-shadow: 0 10px 4px -4px rgb(0 0 0 / 15%);
        }

        .time-line-seconds {
            margin-top: 16px;
            display: flex;
            justify-content: space-between;

            .time-line-item {
                width: 10%;
                color: #8e8e8e;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
            }

            .circle-item {
                background-color: rgba(var(--edc, 199, 199, 199), 1);
                border-radius: 50%;
                height: 4px;
                margin-bottom: 4px;
                width: 4px;

                &.active {
                    background-color: #8e8e8e;
                }
            }
        }

        .thumbnails-trim {
            display: flex;
            height: 100%;
        }

        .thumbnails-ignore {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;

            .thumbnails-ignore-left {
                background: rgba(0, 0, 0, 0.5);
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
            }

            .thumbnails-ignore-right {
                position: absolute;
                height: 100%;
                right: 0;
                top: 0;
                background: rgba(0, 0, 0, 0.5);
            }
        }

        .thumbnails-selected {
            position: absolute;
            /* width: 77px; */
            height: 100%;
            top: 0;
            left: 0;
            z-index: 999;
            left: 52px;
        }
        /* .thumbnails-trim-container {
            position: relative;
        } */

        .modal-thumbnails {
            position: absolute;
        }

        .line-vertical-container {
            position: absolute;
            height: 100%;
            width: 10px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            cursor: ew-resize;
            box-shadow: -1px 4px 4px -4px rgb(0 0 0 / 30%);
            &.left {
                top: 0;
                left: 0;
                border-bottom-left-radius: 5px;
                border-top-left-radius: 5px;
            }

            &.right {
                right: 0;
                top: 0;
                border-bottom-right-radius: 5px;
                border-top-right-radius: 5px;
            }
        }
        .line-vertical {
            height: 100%;
            width: 10px;
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            position: absolute;

            display: flex;
            align-items: center;

            &::after {
                width: 100%;
                color: #000;
                color: #000;
                content: '|';
                font-weight: 700;
                line-height: 44px;
                text-align: center;
                transform: scaleY(1.5);
            }
        }
    }

    .list-thumbnails {
        position: relative;

        .thumbnails {
            overflow: hidden;
            border-radius: 6px;
            .video-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .container-drag-video {
            position: absolute;
            opacity: 1;
            height: 102px;
            width: 70px;
            box-shadow: 0 0 4px rgb(0 0 0 / 15%), 0 0 10px rgb(0 0 0 / 30%);
            border: 2px solid #fff;
            border-radius: 6px;
        }
    }
`;
