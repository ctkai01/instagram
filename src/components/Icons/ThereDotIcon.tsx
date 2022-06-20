import * as React from 'react';

export interface IThereDotIconProps {
    className?: string;
    ariaLabel?: string;
    size?: number;
    onClick?: () => void;
}

export function ThereDotIcon (props: IThereDotIconProps) {
    const { className, ariaLabel, size, onClick} = props;

    let sizeIcon = 0
    if (!size) {
        sizeIcon = 24;
    } else {
        sizeIcon = size
    }
    return (
        <svg onClick={onClick} aria-label={ariaLabel} className={className} color="#262626" fill="#262626" height={sizeIcon} role="img" viewBox="0 0 24 24" width={sizeIcon}><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
  );
}
