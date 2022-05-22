import * as React from 'react';
import styled from 'styled-components';

export interface IAvatarProps {
    url: string;
    border?: 'none' | 'watch' | 'watched' | 'normal';
    className?: string;
    size?: 'large' | 'large-medium' | 'medium' | 'medium_center' | 'small-medium' | 'small';
    thicknessBorder?: number
}

const defaultAvatarProps: Partial<IAvatarProps> = {
    border: 'watch',
    size: 'medium',
};

export function Avatar(props: IAvatarProps) {
    props = { ...defaultAvatarProps, ...props };
    const { url, className, border, size, thicknessBorder } = props;
    return (
        <Container className={className} border={border} size={size} thicknessBorder={thicknessBorder}>
            <img src={url} alt="avatar" />
        </Container>
    );
}

const Container = styled.div<Partial<IAvatarProps>>`
    position: relative;
    height: ${(props) => {
        if (props.size === 'large') {
            return props.theme.sizeAvatar.large + 4 + 'px';
        } else if (props.size === 'large-medium') {
            return props.theme.sizeAvatar.large_medium + 4 + 'px';
        } else if (props.size === 'medium') {
            return props.theme.sizeAvatar.medium + 4 + 'px';
        } else if (props.size === 'small-medium') {
            return props.theme.sizeAvatar.small_medium + 4 + 'px';
        } else if (props.size === 'small') {
            return props.theme.sizeAvatar.small + 4 + 'px';
        } else if (props.size === 'medium_center') {
            return props.theme.sizeAvatar.medium_center + 4 + 'px';
        }
    }};
    width: ${(props) => {
        if (props.size === 'large') {
            return props.theme.sizeAvatar + 4 + 'px';
        } else if (props.size === 'large-medium') {
            return props.theme.sizeAvatar.large_medium + 4 + 'px';
        } else if (props.size === 'medium') {
            return props.theme.sizeAvatar.medium + 4 + 'px';
        } else if (props.size === 'small-medium') {
            return props.theme.sizeAvatar.small_medium + 4 + 'px';
        } else if (props.size === 'small') {
            return props.theme.sizeAvatar.small + 4 + 'px';
        } else if (props.size === 'medium_center') {
            return props.theme.sizeAvatar.medium_center + 4 + 'px';
        }
    }};
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
        background: ${(props) => {
            if (props.border === 'watch') {
                return `linear-gradient(${props.theme.colors.main_gradient})`;
            } else if (props.border === 'watched') {
                return props.theme.colors.gray;
            } else if (props.border === 'none') {
                return 'none';
            } else if (props.border === 'normal') {
                return `rgba(${props.theme.colors.black}, 1)`;
            }
        }};
        content: '';
        position: absolute;
        top: ${(props) => {
            return props.thicknessBorder ? `-${props.thicknessBorder}px` : '-2px'
        }};
        bottom: ${(props) => {
            return props.thicknessBorder ? `-${props.thicknessBorder}px` : '-2px'
        }};
        right: ${(props) => {
            return props.thicknessBorder ? `-${props.thicknessBorder}px` : '-2px'
        }};
        left: ${(props) => {
            return props.thicknessBorder ? `-${props.thicknessBorder}px` : '-2px'
        }};
        z-index: -1;
        border-radius: inherit;
    }

    img {
        height: ${(props) => {
            if (props.size === 'large') {
                return props.theme.sizeAvatar.large + 'px';
            } else if (props.size === 'large-medium') {
                return props.theme.sizeAvatar.large_medium + 'px';
            } else if (props.size === 'medium') {
                return props.theme.sizeAvatar.medium + 'px';
            } else if (props.size === 'small-medium') {
                return props.theme.sizeAvatar.small_medium + 'px';
            } else if (props.size === 'small') {
                return props.theme.sizeAvatar.small + 'px';
            } else if (props.size === 'medium_center') {
                return props.theme.sizeAvatar.medium_center + 'px';
            }
        }};
        width: ${(props) => {
            if (props.size === 'large') {
                return props.theme.sizeAvatar.large + 'px';
            } else if (props.size === 'large-medium') {
                return props.theme.sizeAvatar.large_medium + 'px';
            } else if (props.size === 'medium') {
                return props.theme.sizeAvatar.medium + 'px';
            } else if (props.size === 'small-medium') {
                return props.theme.sizeAvatar.small_medium + 'px';
            } else if (props.size === 'small') {
                return props.theme.sizeAvatar.small + 'px';
            } else if (props.size === 'medium_center') {
                return props.theme.sizeAvatar.medium_center + 'px';
            }
        }};
        border-radius: 50%;
    }
`;
