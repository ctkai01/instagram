import * as React from 'react';

export interface IZoomIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'white' | 'black';
}

const defaultProps: Partial<IZoomIconProps> = {
    color: 'white'
}

export function ZoomIcon (props: IZoomIconProps) {
    props = {...defaultProps, ...props};
    
    const { className, ariaLabel, color} = props;
    let hexColor
   
    if (color === 'black') {
        hexColor = '#000000'
    } else if (color === 'white') {
        hexColor = '#ffffff'
    }

    return (
        <svg aria-label={ariaLabel} className={className} color={hexColor} fill={hexColor} height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M22.707 21.293l-4.825-4.825a9.519 9.519 0 10-1.414 1.414l4.825 4.825a1 1 0 001.414-1.414zM10.5 18.001a7.5 7.5 0 117.5-7.5 7.509 7.509 0 01-7.5 7.5zm3.5-8.5h-2.5v-2.5a1 1 0 10-2 0v2.5H7a1 1 0 100 2h2.5v2.5a1 1 0 002 0v-2.5H14a1 1 0 000-2z"></path></svg>
    );
}
