import { BackIcon } from '@components/Icons';
import { useGesture } from '@use-gesture/react';
import * as React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { FileUrl } from '.';

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

export function CropImage(props: ICropImageProps) {
    const { imageGallery, handleShowModalDiscard, setIsClickBackFirst } = props;

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

    const handleBackChoseImage = () => {
        setIsClickBackFirst(true);
        handleShowModalDiscard();
    }


    return (
        <Container imageUrl={imageGallery[0]} isDragging={isDragging}>
            <div className="header">
                <div className="back-button" onClick={handleBackChoseImage}>
                    <BackIcon ariaLabel="Back" />
                </div>
                <div className="main-header">Crop</div>
                <div className="next-button">Next</div>
            </div>
            <div className="content-main">
                <animated.div style={style} ref={ref} className="image-container"></animated.div>
                {isDragging && (
                    <animated.div className="grid-container">
                        <div className="cell-y first"></div>
                        <div className="cell-y last"></div>
                        <div className="cell-x first"></div>
                        <div className="cell-x last"></div>
                    </animated.div>
                )}
            </div>
        </Container>
    );
}
// Open Media Gallery
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
        width: 550px;
        cursor: grab;
        position: relative;
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
