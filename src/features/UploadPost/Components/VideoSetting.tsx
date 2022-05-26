import { MediaType } from '@models/commom';
import * as React from 'react';
import styled from 'styled-components';
import { getThumbnails } from 'video-metadata-thumbnails';
import { FileUrl } from './ModalPost';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { useGesture } from '@use-gesture/react';
import { animated, useSpring } from 'react-spring';


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
    const isDragActive = React.useRef(false);
    const sliderStartPosition = React.useRef(0);
    let videoSliderRef = React.useRef<HTMLVideoElement>(null);
    const [thumbnails, setThumbnails] = React.useState<ThumbnailsVideoFile>();
    const [sliderPosition, setSliderPosition] = React.useState<number>(0);
    const [positionDefault, setPositionDefault] = React.useState<number>(0);
    const [logoPos, setLogoPos] = useSpring(() => ({ x: 0, y: 0 }));

    const ref = React.useRef(null);

    // console.log(sliderPosition);
    React.useEffect(() => {
        const getThumbnailVideos = async () => {
            // console.log(currentRefVideo);
            if (currentRefVideo.current) {
                const fileThumb = fileGallery[currentIndexSlider];
                // console.log(fileThumb);
                // console.log(currentRefVideo.current.duration / 5);
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
    useGesture(
      {
          onDrag: ({ down, movement: [mx, my], pinching, cancel, offset: [x, y], ...rest }) => {
              console.log(x)
              if (pinching) return cancel();
              if (x >=0 && x <= 255) {

                if (videoSliderRef.current) {
                    const nextSeconds = videoSliderRef.current.duration * (x / 252);
                    videoSliderRef.current.currentTime = nextSeconds;
                }
              }
              let xApply = x >= 252 ? 252 : x;
              if (x <= 0) {
                xApply = 0
              }

              setLogoPos.start({x: xApply, y: 0});
          },
      },
      {
          target: ref,
          //  @ts-ignore: Object is possibly 'null'.
          drag: { from: () => [logoPos.x.get(), logoPos.y.get()] },
          pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
      }
  );


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
                        <div className="thumbnails" style={{ display: 'flex' }}>
                            {thumbnails?.urlsThumb.map((thumbnail) => (
                                <div
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
                                    src={fileGallery[currentIndexSlider].url}
                                ></video>
                            </animated.div>
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
