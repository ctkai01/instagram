import * as React from 'react';

export interface IArrowTopIconProps {
    className?: string;
    ariaLabel?: string;
    size?: number;
}

export function ArrowTopIcon (props: IArrowTopIconProps) {
    const { className, ariaLabel, size} = props;
    let sizeIcon = 0
    if (!size) {
        sizeIcon = 16;
    } else {
        sizeIcon = size
    }
    return (
        <svg  aria-label={ariaLabel} className={className} color="#262626" fill="#262626" height={sizeIcon} role="img" viewBox="0 0 24 24" width={sizeIcon}><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
        );
}
