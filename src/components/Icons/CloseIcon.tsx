import * as React from 'react';

export interface ICloseIconProps {
    className?: string;
    ariaLabel?: string;
}

export function CloseIcon (props: ICloseIconProps) {
    const { className, ariaLabel} = props;

    return (
        <svg aria-label={ariaLabel}  className={className} color="#ffffff" fill="#ffffff" height="12" role="img" viewBox="0 0 24 24" width="12"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
    );
}
