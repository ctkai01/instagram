import * as React from 'react';

export interface ITickSmallIconProps {
  className?: string;
}


export function TickSmallIcon (props: ITickSmallIconProps) {
  const { className } = props
  return (
    <div 
    className={className}
    style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '-552px -534px',
        width: '12px',
        height: '12px',
        backgroundImage: `url('${window.location.origin}/images/bgIcon.png')`
    }}/>
      
  );
}
