import * as React from 'react';

export interface ISavePostIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'black' | 'gray'
}

const defaultProps: Partial<ISavePostIconProps> = {
    color: 'black'
}

export function SavePostIcon (props: ISavePostIconProps) {
    props = {...defaultProps, ...props};
    const { className, ariaLabel, color} = props;
    
    let hexColor
    if (color === 'black') {
        hexColor = '#262626'
    } else if (color === 'gray') {
        hexColor = '#8e8e8e'
    }
    return (
        <svg aria-label={ariaLabel} className={className} color={hexColor} fill={hexColor} height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
  );
}
