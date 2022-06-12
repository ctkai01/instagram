import * as React from 'react';

export interface IArrowTopIconProps {
    className?: string;
    ariaLabel?: string;
    size?: number;
    color?: 'back' | 'white';
}

const defaultProps: Partial<IArrowTopIconProps> = {
    color: 'back'
}

export function ArrowTopIcon (props: IArrowTopIconProps) {
    props = {...defaultProps, ...props}
    const { className, ariaLabel, size, color} = props;
    let sizeIcon = 0
    let colorHex
    if (!size) {
        sizeIcon = 16;
    } else {
        sizeIcon = size
    }

    if (color === 'white') {
        colorHex = '#fff'
    } else if (color === 'back') {
        colorHex = '262626'
    }

    return (
        <svg  aria-label={ariaLabel} className={className} color={colorHex} fill={colorHex} height={sizeIcon} role="img" viewBox="0 0 24 24" width={sizeIcon}><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
        );
}
