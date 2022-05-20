import * as React from 'react';

export interface ISmileFaceIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'black' | 'gray';
    size?: 'normal' | 'small'
}

const defaultProps: Partial<ISmileFaceIconProps> = {
    color: 'black',
    size: 'small'
}
export function SmileFaceIcon (props: ISmileFaceIconProps) {
    props = {...defaultProps, ...props};
    const { className, ariaLabel, color, size} = props;
    let hexColor
    if (color === 'black') {
        hexColor = '#262626'
    } else if (color === 'gray') {
        hexColor = '#8e8e8e'
    }
    let sizeIcon;
    if (size === 'normal') {
        sizeIcon = 24
    } else if (size === 'small') {
        sizeIcon = 20
    }

    return (
        <svg aria-label={ariaLabel} className={className} color={hexColor} fill={hexColor} height={sizeIcon} role="img" viewBox="0 0 24 24" width={sizeIcon}><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
  );
}
