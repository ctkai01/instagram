import * as React from 'react';
import styled from 'styled-components';

interface LoadingWhiteProps {
    className?: string;
    size?: 'big' | 'normal' |'small' | 'vr-small'

}

const defaultProps: Partial<LoadingWhiteProps> = {
    size: 'normal'
}
export default function LoadingWhite(props: LoadingWhiteProps) {
    props = {...defaultProps, ...props}
    const {size, className} = props
    let sizeWidthHeight

    if (size === 'big') {
        sizeWidthHeight = 100
    } else if (size === 'small') {
        sizeWidthHeight = 40
    } else if (size === 'normal') {
        sizeWidthHeight = 20
    } else if (size === 'vr-small') {
        sizeWidthHeight = 15
    }
    return (
        <Container className={className}>
            <img width={sizeWidthHeight} height={sizeWidthHeight} src={`${process.env.REACT_APP_URL}/images/loading_2.gif`} alt='loading'/>
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
