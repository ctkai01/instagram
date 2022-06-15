import * as React from 'react';

interface ITickIconProps {
  className?: string;
}


export function TickIcon (props: ITickIconProps) {
  const { className } = props
  return (
    <div 
    className={className}
    style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 -369px',
        width: '18px',
        height: '18px',
        backgroundImage: `url('${window.location.origin}/images/bgIcon2.png')`
    }}/>
      
  );
}
