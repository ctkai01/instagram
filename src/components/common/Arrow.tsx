import * as React from 'react';
import styled from 'styled-components';

export interface IArrowProps {
    position: 'top' | 'left-top' | 'right-top' | 'bottom' | 'center-top';
}

export function Arrow(props: IArrowProps) {
    const { position } = props;
    let style;

    switch(position) {
        case 'center-top': {
            style = {
                transform: 'translateZ(-1px) rotate(45deg)',
                left: '50%',
                top: '-6px',
            }
            break
        }
        case 'right-top': {
            style = {
                transform: 'translateZ(-1px) rotate(45deg)',
                right: '15%',
                top: '-6px',
            }
        }
    }
        
    return <Container style={style}></Container>;
}

const Container = styled.div`
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: absolute;
    
    z-index: -1;
    box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
`;
