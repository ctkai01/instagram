import * as React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { Media } from '@models/Media';
import { MediaType } from '@models/commom';
import { Post } from '@models/Post';
import { MuteIcon, PlayIcon, TagShowIcon, UnMuteIcon } from '@components/Icons';
import VideoItem from './VideoItem';
import ImageItem from './ImageItem';
import TagPostItem from './TagPostItem';

export interface IPhotoListDetailProps {
    media: Media[];
    post: Post;
}
SwiperCore.use([Navigation, Pagination]);

interface StyledPhotosProps {
    urlReact?: string;
    showButton?: boolean;
}

interface ShowTag {
    show: boolean;
    indexSlider: number;
}

export default function PhotoListDetail(props: IPhotoListDetailProps) {
    const { media, post } = props;
    const refVideo = React.useRef<HTMLVideoElement[]>([]);
    const [swiper, setSwiper] = React.useState<SwiperCore>();

    const [isMute, setIsMute] = React.useState<boolean>(true);
    const [isPlay, setIsPlay] = React.useState<boolean>(false);

    const [showTags, setShowTags] = React.useState<ShowTag[]>(
        post.media[0].type === MediaType.video
            ? []
            : [
                  {
                      indexSlider: 0,
                      show: false,
                  },
              ]
    );
    // const [isPlay, setIsPlay] = React.useState<boolean>(false);
    const urlReact = process.env.REACT_APP_URL;
    const showButton = !(media.length === 1);

    const handleSwitchMute = () => {
        setIsMute((isMute) => !isMute);
    };

    const handleClickPhotoItem = (type: MediaType) => {
        if (type === MediaType.image) {
        } else {
            if (refVideo.current && swiper) {
                if (refVideo.current[swiper.activeIndex].paused) {
                    refVideo.current[swiper.activeIndex].play();
                    setIsPlay(false)
                } else {
                    refVideo.current[swiper.activeIndex].pause();
                    setIsPlay(true)
                }
            }
        }
    };

    React.useEffect(() => {
        if (post.media[0].type === MediaType.video && refVideo.current) {
            if (refVideo.current[0].paused) {
                refVideo.current[0].play();
                setIsPlay(false)
            }
        }
    }, [])
    // ref={(el) => {
    //     // @ts-ignore: Object is possibly 'null'.
    //     refVideoElement.current[index] = el;
    // }}
    // console.log('FUKC', videoRef.current);
    const handleAddShowTagImage = (index: number) => {
        setShowTags((showTags) => {
            const checkExist = showTags.find((showTag) => showTag.indexSlider === index);
            if (!checkExist) {
                return [
                    ...showTags,
                    {
                        indexSlider: index,
                        show: false,
                    },
                ];
            } else {
                return showTags;
            }
        });
    };

    const handleSwitchShowTagImage = (index: number) => {
        setShowTags((showTags) => {
            const checkExist = showTags.find((showTag) => showTag.indexSlider === index);
            // const checkExistClone = {...checkExist}
            const showTagClone = [...showTags];
            if (checkExist) {
                const cloneExist = { ...checkExist };
                cloneExist.show = !cloneExist.show;
                showTagClone[showTagClone.findIndex((showTag) => showTag.indexSlider === index)] =
                    cloneExist;
                return showTagClone;
            } else {
                return showTagClone;
            }
        });
    };

    console.log(showTags);
    return (
        <Container urlReact={urlReact} showButton={showButton}>
            <Swiper
                onSwiper={(swiper) => setSwiper(swiper)}
                onSlideChange={(swiper) => {
                    console.log(refVideo);
                    // setIsPlay(false)
                    if (media[swiper.activeIndex].type === MediaType.image) {
                        handleAddShowTagImage(swiper.activeIndex);
                    }

                    if (media[swiper.activeIndex].type === MediaType.video && refVideo.current) {
                        refVideo.current[swiper.activeIndex].play();
                        // swiper.history
                        if (media[swiper.previousIndex].type === MediaType.video) {
                            refVideo.current[swiper.previousIndex].pause();
                            refVideo.current[swiper.previousIndex].currentTime = 0;
                        }
                        console.log(refVideo, swiper);
                        // previousIndex
                    } else {
                        if (media[swiper.previousIndex].type === MediaType.video) {
                            refVideo.current[swiper.previousIndex].pause();
                            refVideo.current[swiper.previousIndex].currentTime = 0;
                        }
                    }
                }}
                pagination={true}
                slidesPerView={1}
                navigation={true}
                allowTouchMove={false}
            >
                {media.map((mediaItem, index) => (
                    <SwiperSlide key={index} className="slider-item">
                        {mediaItem.type === MediaType.image && (
                            <ImageItem
                                handleClickPhotoItem={handleClickPhotoItem}
                                mediaItem={mediaItem}
                            />
                        )}
                        {mediaItem.type === MediaType.video && index === 0 && (
                            <VideoItem
                                refVideo={refVideo}
                                index={index}
                                post={post}
                                isMute={isMute}
                                mediaItem={mediaItem}
                                handleClickPhotoItem={handleClickPhotoItem}
                            />
                        )}
                        {mediaItem.type === MediaType.video && index !== 0 && (
                            <VideoItem
                                refVideo={refVideo}
                                index={index}
                                post={post}
                                isMute={isMute}
                                mediaItem={mediaItem}
                                handleClickPhotoItem={handleClickPhotoItem}
                            />
                        )}
                        {mediaItem.type === MediaType.video && (
                            <div className="btn-mute-container" onClick={handleSwitchMute}>
                                <div className="btn-mute">
                                    {isMute ? <MuteIcon /> : <UnMuteIcon />}
                                </div>
                            </div>
                        )}
                        {mediaItem.type === MediaType.image && mediaItem.tags_user.length && (
                            <div
                                className="btn-show-tag-container"
                                onClick={() => {
                                    handleSwitchShowTagImage(index);
                                }}
                            >
                                <div className="btn-show">
                                    <TagShowIcon />
                                </div>
                            </div>
                        )}
                        {mediaItem.type === MediaType.image &&
                            showTags.find((showTag) => showTag.indexSlider === index)?.show &&
                            mediaItem.tags_user.map((tagUser) => <TagPostItem tagUser={tagUser} />)}

                        {mediaItem.type === MediaType.video && isPlay && (
                            <div
                                onClick={() => handleClickPhotoItem(mediaItem.type)}
                                className="btn-play"
                            >
                                <PlayIcon size="big" />
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    );
}

const Container = styled.div<StyledPhotosProps>`
    width: 100%;
    height: 100%;
    .slider-item {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 100%;
        img,
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            /* max-height: 673px; */
        }

        .btn-mute-container {
            position: absolute;
            bottom: 0;
            right: 0;
            cursor: pointer;
            /* padding: 20px; */
        }

        .btn-play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .btn-show-tag-container {
            position: absolute;
            cursor: pointer;
            bottom: 0;
            left: 0;
        }

        .btn-show-tag-container:active {
            opacity: 0.7;
        }

        .btn-mute {
            padding: 8px;
            margin: 0px 16px 16px 0;
            background-color: rgb(38, 38, 38);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .btn-show {
            padding: 8px;
            margin: 12px;
            background-color: rgb(38, 38, 38);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
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
        width: 100%;
        height: 100%;
    }
    .swiper-pagination {
        position: absolute;
        bottom: 0;
    }

    .swiper-pagination-bullet-active {
        background-color: #fff;
    }

    .swiper-pagination-bullet {
        background-color: #fff;
    }
`;  
