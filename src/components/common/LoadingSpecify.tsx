import * as React from 'react';
import styled from 'styled-components';

interface LoadingSpecifyProps {
    className?: string;
    size?: 'big' | 'normal' |'small'

}

const defaultProps: Partial<LoadingSpecifyProps> = {
    size: 'big'
}
export default function LoadingSpecify(props: LoadingSpecifyProps) {
    props = {...defaultProps, ...props}
    const {size, className} = props
    let sizeWidthHeight

    if (size === 'big') {
        sizeWidthHeight = 100
    } else if (size === 'small') {
        sizeWidthHeight = 40
    } else if (size === 'normal') {
        sizeWidthHeight = 60
    }
    return (
        <Container className={className}>
            <img width={sizeWidthHeight} height={sizeWidthHeight} src={`${process.env.REACT_APP_URL}/images/loading.gif`} alt='loading'/>
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
        /* width: 100px;
        height: 100px; */
    }
`;
