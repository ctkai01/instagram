import * as React from 'react';

export interface ISaveIconIconProps {
    className?: string;
}

export function SaveIconIcon (props: ISaveIconIconProps) {
    const { className} = props;
    return (
        <svg aria-label="Saved" className={className} color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
  );
}
