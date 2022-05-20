import * as React from 'react';

export interface IArrowTopIconProps {
    className?: string;
    ariaLabel?: string;
}

export function ArrowTopIcon (props: IArrowTopIconProps) {
    const { className, ariaLabel} = props;

    return (
        <svg  aria-label={ariaLabel} className={className} color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21 17.502a.997.997 0 01-.707-.293L12 8.913l-8.293 8.296a1 1 0 11-1.414-1.414l9-9.004a1.03 1.03 0 011.414 0l9 9.004A1 1 0 0121 17.502z"></path></svg>
        );
}
