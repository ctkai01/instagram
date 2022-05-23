import * as React from 'react';

export interface ITagShowIconProps {
    className?: string;
    ariaLabel?: string;
}

export function TagShowIcon (props: ITagShowIconProps) {
    const { className, ariaLabel} = props;
    return (
        <svg className={className} aria-label={ariaLabel} color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M21.334 23H2.666a1 1 0 01-1-1v-1.354a6.279 6.279 0 016.272-6.272h8.124a6.279 6.279 0 016.271 6.271V22a1 1 0 01-1 1zM12 13.269a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path></svg>
  );
}
