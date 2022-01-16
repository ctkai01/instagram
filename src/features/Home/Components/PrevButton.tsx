import * as React from 'react';
import styled from 'styled-components';

export interface IPrevButtonProps {
    className?: string;
}

export default function PrevButton(props: IPrevButtonProps) {
    const { className } = props
    return (
        <Container className={className}>
            <div
                style={{ backgroundImage: `url('${process.env.REACT_APP_URL}/images/bgIcon.png')` }}
                className="next-icon"
            ></div>
        </Container>
    );
}
// ${process.env.REACT_APP_URL}/images/loading.gif

const Container = styled.button`
    background: 0 0;
    outline: none;
    border: none;
    height: 45px;
        width: 45px;
    .next-icon {
        height: 45px;
        width: 45px;
        background-position: -379px -128px;
        background-repeat: no-repeat;
    }
`;
