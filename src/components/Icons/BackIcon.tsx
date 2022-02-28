import * as React from 'react';

export interface IBackIconProps {
    className?: string;
    ariaLabel?: string;
}

export function BackIcon (props: IBackIconProps) {
    const { className, ariaLabel} = props;

    return (
        <svg aria-label={ariaLabel} className={className} color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
    );
}
