import * as React from 'react';

export interface IPlayIconProps {
    className?: string;
    ariaLabel?: string;
    size?: 'small' | 'big'
}

const defaultProps: Partial<IPlayIconProps> = {
    size: 'small'
}

export function PlayIcon (props: IPlayIconProps) {
    props = {...defaultProps, ...props};

    const { className, ariaLabel, size} = props;

    let sizeIcon 
   
    if (size === 'small') {
        sizeIcon = 16
    } else if (size === 'big') {
        sizeIcon = 64
    }
    return (
        <svg aria-label={ariaLabel} className={className} color="#dbdbdb" fill="#dbdbdb" height={sizeIcon} role="img" viewBox="0 0 24 24" width={sizeIcon}><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path></svg>
    );
}
