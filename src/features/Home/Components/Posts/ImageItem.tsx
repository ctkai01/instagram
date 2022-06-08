import { MediaType } from '@models/commom';
import { Media } from '@models/Media';
import * as React from 'react';

export interface IImageItemProps {
    mediaItem: Media;
    handleClickPhotoItem: (type: MediaType) => void
}

export default function ImageItem(props: IImageItemProps) {
    const {mediaItem, handleClickPhotoItem } = props
    return (
        <img
            onClick={() => handleClickPhotoItem(mediaItem.type)}
            src={mediaItem.name}
            alt="photoPost"
        />
    );
}
