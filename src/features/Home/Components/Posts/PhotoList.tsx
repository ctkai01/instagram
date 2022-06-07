import * as React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css/pagination';
import { Media } from '@models/Media';
import { MediaType } from '@models/commom';
import { Post } from '@models/Post';
import { MuteIcon, UnMuteIcon } from '@components/Icons';

export interface IPhotoListProps {
    media: Media[];
    checkFirstVideo: boolean;
    post: Post;
    getVideoRef: (ref: HTMLVideoElement | null, post: Post) => void;
}
SwiperCore.use([Navigation, Pagination]);

interface StyledPhotosProps {
    urlReact?: string;
    showButton?: boolean;
}
export default function PhotoList(props: IPhotoListProps) {
    const { media, checkFirstVideo, post, getVideoRef } = props;
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [isMute, setIsMute] = React.useState<boolean>(true)
    const urlReact = process.env.REACT_APP_URL;
    const showButton = !(media.length === 1);


    const handleSwitchMute = () => {
        setIsMute(isMute => !isMute)
    }
    return (
        <Container urlReact={urlReact} showButton={showButton}>
            <Swiper pagination={true} slidesPerView={1} navigation={true} allowTouchMove={false}>
                {media.map((mediaItem, index) => (
                    <SwiperSlide key={index} className="slider-item">
                        {mediaItem.type === MediaType.image && (
                            <img src={mediaItem.name} alt="photoPost" />
                        )}
                        {mediaItem.type === MediaType.video && index === 0 && (
                            <video
                                ref={(ref) => {
                                    videoRef.current = ref;
                                    getVideoRef(ref, post);
                                }}
                                loop={true}
                                muted={isMute}
                                src={mediaItem.name}
                            ></video>
                        )}
                        {mediaItem.type === MediaType.video && index !== 0 && (
                            <video
                                loop={true}
                                muted={isMute}
                                src={mediaItem.name}
                            ></video>
                        )}
                        {mediaItem.type === MediaType.video && (
                            <div className="btn-mute-container" onClick={handleSwitchMute}>
                                <div className="btn-mute">
                                    {isMute ? (
                                        <MuteIcon />
                                    ): (
                                        <UnMuteIcon/>
                                    )}
                                    
                                </div>
                            </div>
                        )}
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
        position: relative;
        img,
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            max-height: 673px;
        }

        .btn-mute-container {
            position: absolute;
            bottom: 0;
            right: 0;
            cursor: pointer;
            /* padding: 20px; */
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
