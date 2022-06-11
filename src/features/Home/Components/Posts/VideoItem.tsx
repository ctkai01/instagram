import { MediaType } from '@models/commom';
import { Media } from '@models/Media';
import { Post } from '@models/Post';
import * as React from 'react';

export interface IVideoItemProps {
    refVideo: React.MutableRefObject<HTMLVideoElement[]>;
    index: number;
    post: Post;
    isMute: boolean;
    mediaItem: Media;
    getVideoRef?: (ref: HTMLVideoElement | null, post: Post) => void;
    handleClickPhotoItem: (type: MediaType) => void
}

export default function VideoItem(props: IVideoItemProps) {
    const {index, post, isMute, mediaItem, refVideo, handleClickPhotoItem, getVideoRef} = props
    return (
        <video
            draggable={false}
            ref={(ref) => {
                if (ref) {
                    refVideo.current[index] = ref;
                }

                if (getVideoRef) {
                    getVideoRef(ref, post);
                }
            }}
            onClick={() => handleClickPhotoItem(mediaItem.type)}
            loop={true}
            muted={isMute}
            src={mediaItem.name}
        ></video>
    );
}
