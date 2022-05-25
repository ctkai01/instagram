import { MediaType } from '@models/commom';
import * as React from 'react';
import styled from 'styled-components';
import { getThumbnails } from 'video-metadata-thumbnails';
import { FileUrl } from './ModalPost';
import { getVideoDurationInSeconds } from 'get-video-duration';

interface IVideoSettingProps {
    currentIndexSlider: number;
    fileGallery: FileUrl[];
    currentRefVideo: React.RefObject<HTMLVideoElement>;
}

export interface ThumbnailsVideoFile {
    urlBlob: string;
    urlsThumb: string[];
}

export default function VideoSetting(props: IVideoSettingProps) {
    const { fileGallery, currentIndexSlider, currentRefVideo } = props;

    const [thumbnails, setThumbnails] = React.useState<ThumbnailsVideoFile>();

    React.useEffect(() => {
        const getThumbnailVideos = async () => {
            console.log(currentRefVideo);
            if (currentRefVideo.current) {
                const fileThumb = fileGallery[currentIndexSlider];
                console.log(fileThumb);
                console.log(currentRefVideo.current.duration / 5);
                let thumbnails = await getThumbnails(fileThumb.url, {
                    start: 0,
                    interval: currentRefVideo.current.duration / 5,
                    scale: 0.7,
                });

                thumbnails = thumbnails.slice(0, thumbnails.length - 1);
                // @ts-ignore: Object is possibly 'null'.
                const blobThumbs = thumbnails.map((thumb) => URL.createObjectURL(thumb.blob));
                setThumbnails({
                    urlBlob: fileThumb.url,
                    urlsThumb: blobThumbs,
                });
            }
            // const fileThumbNails = fileGallery.filter((file) => file.type === MediaType.video);
            // const thumbNailsListPromise: Promise<ThumbnailsVideoFile> = 1;
            //  Promise.all(
            //     fileThumbNails.map(async (fileThumb) => {

            //             const thumbnails = await getThumbnails(fileThumb.url, {
            //             start: 0,
            //             // end: 0,
            //             interval: 1,
            //             scale: 0.7,
            //         });
            //         // @ts-ignore: Object is possibly 'null'.
            //         const blobThumbs = thumbnails.map(thumb =>  URL.createObjectURL(thumb.blob))
            //         // const blobThumb = URL.createObjectURL(thumbnails[0].blob);
            //         return {
            //             urlBlob: fileThumb.url,
            //             urlsThumb: blobThumbs,
            //         };
            //     })
            // );
            // console.log('Render Thumb');
            // const thumbNailsList = await thumbNailsListPromise;
            // setThumbnails((thumbnails) => [...thumbnails, ...thumbNailsList]);
        };
        getThumbnailVideos();
    }, []);
    console.log(thumbnails);

    return (
        <Container>
            <div className="option-item cover-photo-container">
                <div className="option-header">
                    <div className="text-tittle">Cover photo</div>
                    <div className="select-input-cover">
                        <button className="btn-select-cover-photo">Select from computer</button>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            className="input-cover-photo"
                        />
                    </div>
                </div>
                <div className="option-content">
                    <div className="list-thumbnails">
                        <div className="thumbnails" style={{display: 'flex'}}>
                            {thumbnails?.urlsThumb.map((thumbnail) => (
                                <div
                                    style={{
                                        backgroundImage: `url(${thumbnail})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        height: '100px',
                                        flex: 1
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="option-item cover-photo-container">
                <div className="option-header">
                    <div className="text-tittle">Cover photo</div>
                </div>
                <div className="option-content"></div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    padding: 0 16px;
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
    }
`;
