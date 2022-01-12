import * as React from 'react';
import styled from 'styled-components';

export interface IArrowProps {}

export function Arrow(props: IArrowProps) {
    return <Container></Container>;
}

const Container = styled.div`
    width: 14px;
    height: 14px;
    background-color: #fff;
    position: absolute;
    top: -6px;
    left: 50%;
    z-index: -1;
    transform: translateZ(-1px) rotate(45deg);
    box-shadow: 0 0 5px 1px rgba(var(--jb7,0,0,0),.0975);
`;
