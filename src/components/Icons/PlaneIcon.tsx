import * as React from 'react';

export interface IPlaneIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'black' | 'gray' | 'white';
}

const defaultProps: Partial<IPlaneIconProps> = {
    color: 'white',
};

export function PlaneIcon(props: IPlaneIconProps) {
    props = { ...defaultProps, ...props };
    const { className, ariaLabel, color } = props;
    let hexColor;
    if (color === 'white') {
        hexColor = '#262626';
    } else if (color === 'gray') {
        hexColor = '#8e8e8e';
    }

    if (color === 'black') {
        return (
            <svg
                aria-label={ariaLabel}
                className={className}
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    d="M22.91 2.388a.69.69 0 00-.597-.347l-20.625.002a.687.687 0 00-.482 1.178L7.26 9.16a.686.686 0 00.778.128l7.612-3.657a.723.723 0 01.937.248.688.688 0 01-.225.932l-7.144 4.52a.69.69 0 00-.3.743l2.102 8.692a.687.687 0 00.566.518.655.655 0 00.103.008.686.686 0 00.59-.337L22.903 3.08a.688.688 0 00.007-.692"
                    fillRule="evenodd"
                ></path>
            </svg>
        );
    }

    return (
        <svg
            aria-label={ariaLabel}
            className={className}
            color={hexColor}
            fill={hexColor}
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="22"
                x2="9.218"
                y1="3"
                y2="10.083"
            ></line>
            <polygon
                fill="none"
                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            ></polygon>
        </svg>
    );
}
