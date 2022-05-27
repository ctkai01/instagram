import * as React from 'react';
import styled from 'styled-components';

interface LoadingSpecifyProps {
    className?: string;
}
export default function LoadingSpecify(props: LoadingSpecifyProps) {
    const {className} = props
    return (
        <Container className={className}>
            <img src={`${process.env.REACT_APP_URL}/images/loading.gif`} alt='loading'/>
        </Container>
    );
}

const Container = styled.div`
    /* position: fixed; */
    /* width: 100vw; */
    /* height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    img {
        width: 100px;
        height: 100px;
    }
`;
