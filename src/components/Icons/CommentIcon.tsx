import * as React from 'react';

export interface ICommentIconProps {
    className?: string;
    ariaLabel?: string;
    color?: 'black' | 'gray' | 'white'
}

const defaultProps: Partial<ICommentIconProps> = {
    color: 'black'
}
export function CommentIcon (props: ICommentIconProps) {
    props = {...defaultProps, ...props};
    const { className, ariaLabel, color} = props;
    let hexColor
    if (color === 'black') {
        hexColor = '#262626'
    } else if (color === 'gray') {
        hexColor = '#8e8e8e'
    } else {
        hexColor = '#fff'
    }
    return (
        <svg aria-label={ariaLabel} className={className} color={hexColor} fill={hexColor} height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
  );
}
