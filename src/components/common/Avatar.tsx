import * as React from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import styled from 'styled-components';

export interface IAvatarProps {
    url: string;
    border?: 'none' | 'watch' | 'watched' | 'normal';
    className?: string;
    size?: 'large' | 'large-medium' | 'medium' | 'medium_center' | 'small-medium' | 'small';
    thicknessBorder?: number;
}

const defaultAvatarProps: Partial<IAvatarProps> = {
    border: 'watch',
    size: 'medium',
    thicknessBorder: 5,
};

enum SizeAvatar {
    SMALL = 24,
    MEDIUM = 56,
    MEDIUM_CENTER = 46,
    LARGE_MEDIUM = 77,
    SMALL_MEDIUM = 32,
    LARGE = 150,
}

interface StyledContainerProps {
    height: number;
    width: number;
}

export function Avatar(props: IAvatarProps) {
    props = { ...defaultAvatarProps, ...props };
    const { url, className, border, size, thicknessBorder } = props;
    let height = 1;
    let width = 1;
    let sizeContainer = 1;

    if (size === 'large') {
        width = SizeAvatar.LARGE;
        height = SizeAvatar.LARGE;
        sizeContainer = width + 18;
    } else if (size === 'large-medium') {
        width = SizeAvatar.LARGE_MEDIUM;
        height = SizeAvatar.LARGE_MEDIUM;
        sizeContainer = width + 10;
    } else if (size === 'medium') {
        width = SizeAvatar.MEDIUM;
        height = SizeAvatar.MEDIUM;
        sizeContainer = width + 10;
    } else if (size === 'small-medium') {
        width = SizeAvatar.SMALL_MEDIUM;
        height = SizeAvatar.SMALL_MEDIUM;
        sizeContainer = width + 10;
    } else if (size === 'small') {
        width = SizeAvatar.SMALL;
        height = SizeAvatar.SMALL;
        sizeContainer = width + 4;
    } else if (size === 'medium_center') {
        width = SizeAvatar.MEDIUM_CENTER;
        height = SizeAvatar.MEDIUM_CENTER;
        sizeContainer = width + 10;
    }

    const widthBorder = sizeContainer / 2.0 
    const heightBorder = sizeContainer / 2.0 

    // @ts-ignore: Object is possibly 'null'.

    const widthCircle = sizeContainer - thicknessBorder;
    // @ts-ignore: Object is possibly 'null'.

    const heightCircle = sizeContainer - thicknessBorder;

    const angleInDeg = 45;
    const angle = ((180 - angleInDeg) / 180) * Math.PI;

    const length = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));

    const halfx = (Math.sin(angle) * length) / 2.0;
    const halfy = (Math.cos(angle) * length) / 2.0;
    const cx = sizeContainer / 2.0;
    const cy = sizeContainer / 2.0;
    const x1 = cx - halfx;
    const y1 = cy - halfy;
    const x2 = cx + halfx;
    const y2 = cy + halfy;

    return (
        <Container className={className} width={sizeContainer} height={sizeContainer}>
            <img alt="avatar" height={height} width={width} src={url} />
            <div className="circle-border">
                <Stage
                    width={sizeContainer}
                    height={sizeContainer}
                    x={widthBorder}
                    y={heightBorder}
                >
                    <Layer>
                        {border === 'watch' && (
                            <Circle
                                width={sizeContainer}
                                height={sizeContainer}
                                // fill="#fff"
                                strokeWidth={1} // border width
                                fillPriority="linear-gradien"
                                fillLinearGradientStartPoint={{ x: x1, y: y1 }}
                                fillLinearGradientEndPoint={{ x: x2, y: y2 }}
                                // fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                // fillLinearGradientEndPoint={{ x: sizeContainer, y: sizeContainer }}
                                fillLinearGradientColorStops={[
                                    0,
                                    '#f09433',
                                    1,
                                    '#e6683c',
                                    0.5,
                                    '#dc2743',
                                    0.75,
                                    '#cc2366',
                                    1,
                                    '#bc1888',
                                ]}
                            />
                        )}
                        {border === 'watched' && (
                            <Circle
                                width={sizeContainer}
                                height={sizeContainer}
                                strokeWidth={1} 
                                stroke="#DCDCDC"
                            />
                        )}
                        {border === 'normal' && (
                            <Circle
                                width={sizeContainer}
                                height={sizeContainer}
                                strokeWidth={1} 
                                stroke="#000"
                            />
                        )}
                        {(border === 'watch' || border === 'watched' || border === 'normal') && (
                            <Circle width={widthCircle} height={heightCircle} fill="#fff" />
                        )}
                    </Layer>
                </Stage>
            </div>
        </Container>
    );
}

const Container = styled.div<Partial<StyledContainerProps>>`
    height: ${(props) => {
        return props.height + 'px';
    }};

    width: ${(props) => {
        return props.width + 'px';
    }};

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .circle-border {
        position: absolute;
    }

    img {
        display: block;
        border-radius: 50%;
        position: relative;
        z-index: 1;
    }
`;
