import * as React from 'react';

interface ICameraIconProps {
  className?: string;
}


export function CameraIcon (props: ICameraIconProps) {
  const { className } = props
  return (
    <div 
    className={className}
    style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '-473px -401px',
        width: '24px',
        height: '24px',
        backgroundImage: `url('${window.location.origin}/images/bgIcon.png')`
    }}/>
      
  );
}
