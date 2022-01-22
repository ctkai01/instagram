import * as React from 'react';

export interface IPlaneIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'black' | 'gray'
}

const defaultProps: Partial<IPlaneIconProps> = {
    color: 'black'
}

export function PlaneIcon (props: IPlaneIconProps) {
    props = {...defaultProps, ...props};
    const { className, ariaLabel, color} = props;
    let hexColor
    if (color === 'black') {
        hexColor = '#262626'
    } else if (color === 'gray') {
        hexColor = '#8e8e8e'
    }
    return (
        <svg aria-label={ariaLabel} className={className} color={hexColor} fill={hexColor} height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
  );
}
