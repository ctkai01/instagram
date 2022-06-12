import * as React from 'react';

export interface ICancelIconProps {
    className?: string;
    ariaLabel?: string;
}

export function CancelIcon (props: ICancelIconProps) {
    const { className, ariaLabel} = props;

    return (
        <svg aria-label={ariaLabel} className={className} color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
    );
}
