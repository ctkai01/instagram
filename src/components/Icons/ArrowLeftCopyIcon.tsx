import * as React from 'react';

export interface IArrowLeftCopyIconProps {
    className?: string;
}

export default function ArrowLeftCopyIcon(props: IArrowLeftCopyIconProps) {
    const { className } = props;
    return (
        <svg viewBox="0 0 12.32 9.33">
            <g>
                <line className={className} x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line>
                <rect width="1.9" height="1.9"></rect>
                <rect x="1.9" y="1.9" width="1.9" height="1.9"></rect>
                <rect x="3.7" y="3.7" width="1.9" height="1.9"></rect>
                <rect x="1.9" y="5.6" width="1.9" height="1.9"></rect>
                <rect y="7.5" width="1.9" height="1.9"></rect>
            </g>
        </svg>
    );
}
