import * as React from 'react';

export interface ICloseIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'black' | 'white';
    handleClickClose?: () => void;
}

const defaultProps: Partial<ICloseIconProps> = {
    color: 'white',
}

export function CloseIcon (props: ICloseIconProps) {
    props = {...defaultProps, ...props};

    const { className, ariaLabel, color, handleClickClose } = props;

    let hexColor
    if (color === 'black') {
        hexColor = '#000000'
    } else if (color === 'white') {
        hexColor = '#ffffff'
    }
    return (
        <svg aria-label={ariaLabel} onClick={handleClickClose}  className={className} color={hexColor} fill={hexColor} height="12" role="img" viewBox="0 0 24 24" width="12"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="21" y2="3"></line></svg>
    );
}
