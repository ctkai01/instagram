import * as React from 'react';
import styled from 'styled-components';

interface ILogoInstagram {
    className?: string;
}

export function LogoInstagram(props: ILogoInstagram) {
    const { className } = props;
    return (
        <Container className={className}>
            <img src={`${process.env.REACT_APP_URL}/images/logo-insta.png`} alt='logo'/>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
`;
